/**
 * Centralised Jobber token management.
 *
 * All Jobber integrations (submit-quote, referral dashboard, future routes)
 * import getJobberAccessToken() from here. Token rotation, caching, and the
 * distributed lock that prevents simultaneous cold-starts from racing are all
 * handled in one place.
 *
 * Security notes:
 *  - "server-only" prevents this module from being bundled into client code.
 *  - Tokens are stored in Upstash KV, never logged or returned to clients.
 *  - The refresh token lives in KV; the env var is only the bootstrap seed.
 *  - A Redis SETNX lock prevents two concurrent cold-starts from both
 *    exchanging the same refresh token (which would invalidate one of them).
 */
import "server-only";
import { Redis } from "@upstash/redis";

// ---------------------------------------------------------------------------
// KV keys
// ---------------------------------------------------------------------------
const KEY_ACCESS_TOKEN = "jobber:access_token";
const KEY_ACCESS_EXPIRES = "jobber:access_token_expires_at";
const KEY_REFRESH_TOKEN = "jobber:refresh_token";
const KEY_LOCK = "jobber:token_refresh_lock";
const LOCK_TTL_SECONDS = 15; // max time to hold the lock

// ---------------------------------------------------------------------------
// Redis client (lazily created, null when KV vars not present)
// ---------------------------------------------------------------------------
let _redis: Redis | null | undefined = undefined; // undefined = not yet initialised

function getRedis(): Redis | null {
  if (_redis !== undefined) return _redis;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  _redis = url && token ? new Redis({ url, token }) : null;
  return _redis;
}

// ---------------------------------------------------------------------------
// Core OAuth exchange
// ---------------------------------------------------------------------------
async function exchangeRefreshToken(refreshToken: string): Promise<{
  accessToken: string;
  expiresAt: number;
  newRefreshToken: string | null;
}> {
  const res = await fetch("https://api.getjobber.com/api/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.JOBBER_CLIENT_ID ?? "",
      client_secret: process.env.JOBBER_CLIENT_SECRET ?? "",
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Jobber auth failed (${res.status}): ${body}`);
  }

  const json = await res.json();
  return {
    accessToken: json.access_token as string,
    expiresAt: Date.now() + (json.expires_in as number) * 1_000,
    newRefreshToken: (json.refresh_token as string | undefined) ?? null,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------
/**
 * Returns a valid Jobber access token.
 *
 * With KV configured (production / preview):
 *   1. Returns the cached access token if it has > 60 s left.
 *   2. Acquires a distributed lock, re-checks the cache (another instance
 *      may have refreshed while we waited), then exchanges the refresh token.
 *   3. Stores the new access token and rotated refresh token in KV.
 *
 * Without KV (local dev fallback):
 *   Exchanges JOBBER_REFRESH_TOKEN from env directly, no caching.
 *   Note: this will rotate the token without persisting it — run
 *   `node scripts/jobber-auth.mjs` locally to get a fresh seed token.
 */
export async function getJobberAccessToken(): Promise<string> {
  const redis = getRedis();

  // ── KV path ──────────────────────────────────────────────────────────────
  if (redis) {
    // 1. Check cached access token
    const [cachedToken, cachedExpiry] = await redis.mget<[string | null, string | null]>(
      KEY_ACCESS_TOKEN,
      KEY_ACCESS_EXPIRES
    );

    if (cachedToken && cachedExpiry && Date.now() < Number(cachedExpiry) - 60_000) {
      return cachedToken;
    }

    // 2. Acquire distributed lock (SETNX)
    const lockAcquired = await redis.set(KEY_LOCK, "1", {
      nx: true,
      ex: LOCK_TTL_SECONDS,
    });

    if (!lockAcquired) {
      // Another instance is refreshing — wait briefly then re-read the cache
      await new Promise((r) => setTimeout(r, 2_000));
      const freshToken = await redis.get<string>(KEY_ACCESS_TOKEN);
      if (freshToken) return freshToken;
      // If still nothing, fall through and try to exchange anyway
    }

    try {
      // 3. Re-check cache now that we hold the lock
      const [token2, expiry2] = await redis.mget<[string | null, string | null]>(
        KEY_ACCESS_TOKEN,
        KEY_ACCESS_EXPIRES
      );
      if (token2 && expiry2 && Date.now() < Number(expiry2) - 60_000) {
        return token2;
      }

      // 4. Get current refresh token — KV wins over env var
      const refreshToken =
        (await redis.get<string>(KEY_REFRESH_TOKEN)) ??
        process.env.JOBBER_REFRESH_TOKEN ??
        "";

      if (!refreshToken) throw new Error("No Jobber refresh token available");

      // 5. Exchange
      const { accessToken, expiresAt, newRefreshToken } =
        await exchangeRefreshToken(refreshToken);

      // 6. Persist new access token (TTL = 1 h as safety net)
      await redis.set(KEY_ACCESS_TOKEN, accessToken, { ex: 3_600 });
      await redis.set(KEY_ACCESS_EXPIRES, String(expiresAt), { ex: 3_600 });

      // 7. Persist rotated refresh token
      if (newRefreshToken && newRefreshToken !== refreshToken) {
        await redis.set(KEY_REFRESH_TOKEN, newRefreshToken);
      }

      return accessToken;
    } finally {
      // Always release the lock
      await redis.del(KEY_LOCK).catch(() => {});
    }
  }

  // ── Local dev fallback (no KV) ────────────────────────────────────────────
  const refreshToken = process.env.JOBBER_REFRESH_TOKEN ?? "";
  if (!refreshToken) throw new Error("JOBBER_REFRESH_TOKEN is not set");
  const { accessToken } = await exchangeRefreshToken(refreshToken);
  return accessToken;
}

/**
 * Convenience wrapper — runs a Jobber GraphQL query/mutation.
 * Automatically injects the current access token and the required API version header.
 */
export async function jobberGraphQL(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<unknown> {
  const token = await getJobberAccessToken();

  const res = await fetch("https://api.getjobber.com/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-JOBBER-GRAPHQL-VERSION": "2026-04-16",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Jobber GraphQL HTTP error: ${res.status}`);
  return res.json();
}
