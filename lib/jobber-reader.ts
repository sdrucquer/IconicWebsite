/**
 * Jobber token management for the READER app (leaderboard + admin).
 *
 * This is a separate Jobber OAuth app from lib/jobber.ts (the writer app
 * used by submit-quote). Keeping them split gives each its own rate limit
 * quota so heavy leaderboard reads never throttle form submissions.
 *
 * Uses JOBBER2_* env vars and jobber2:* KV keys — never collides with the
 * writer app's tokens.
 */
import "server-only";
import { Redis } from "@upstash/redis";

const KEY_ACCESS_TOKEN  = "jobber2:access_token";
const KEY_ACCESS_EXPIRES = "jobber2:access_token_expires_at";
const KEY_REFRESH_TOKEN = "jobber2:refresh_token";
const KEY_LOCK          = "jobber2:token_refresh_lock";
const LOCK_TTL_SECONDS  = 15;

let _redis: Redis | null | undefined = undefined;

function getRedis(): Redis | null {
  if (_redis !== undefined) return _redis;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  _redis = url && token ? new Redis({ url, token }) : null;
  return _redis;
}

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
      client_id: process.env.JOBBER2_CLIENT_ID ?? "",
      client_secret: process.env.JOBBER2_CLIENT_SECRET ?? "",
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Jobber reader auth failed (${res.status}): ${body}`);
  }

  const json = await res.json();
  return {
    accessToken: json.access_token as string,
    expiresAt: Date.now() + (json.expires_in as number) * 1_000,
    newRefreshToken: (json.refresh_token as string | undefined) ?? null,
  };
}

export async function getJobberReaderAccessToken(): Promise<string> {
  const redis = getRedis();

  if (redis) {
    const [cachedToken, cachedExpiry] = await redis.mget<[string | null, string | null]>(
      KEY_ACCESS_TOKEN,
      KEY_ACCESS_EXPIRES
    );

    if (cachedToken && cachedExpiry && Date.now() < Number(cachedExpiry) - 60_000) {
      return cachedToken;
    }

    const lockAcquired = await redis.set(KEY_LOCK, "1", { nx: true, ex: LOCK_TTL_SECONDS });

    if (!lockAcquired) {
      await new Promise((r) => setTimeout(r, 2_000));
      const freshToken = await redis.get<string>(KEY_ACCESS_TOKEN);
      if (freshToken) return freshToken;
    }

    try {
      const [token2, expiry2] = await redis.mget<[string | null, string | null]>(
        KEY_ACCESS_TOKEN,
        KEY_ACCESS_EXPIRES
      );
      if (token2 && expiry2 && Date.now() < Number(expiry2) - 60_000) {
        return token2;
      }

      const refreshToken =
        (await redis.get<string>(KEY_REFRESH_TOKEN)) ??
        process.env.JOBBER2_REFRESH_TOKEN ??
        "";

      if (!refreshToken) throw new Error("No Jobber reader refresh token available — run scripts/jobber-auth-reader.mjs");

      const { accessToken, expiresAt, newRefreshToken } = await exchangeRefreshToken(refreshToken);

      await redis.set(KEY_ACCESS_TOKEN, accessToken, { ex: 3_600 });
      await redis.set(KEY_ACCESS_EXPIRES, String(expiresAt), { ex: 3_600 });

      if (newRefreshToken && newRefreshToken !== refreshToken) {
        await redis.set(KEY_REFRESH_TOKEN, newRefreshToken);
      }

      return accessToken;
    } finally {
      await redis.del(KEY_LOCK).catch(() => {});
    }
  }

  // Local dev fallback
  const refreshToken = process.env.JOBBER2_REFRESH_TOKEN ?? "";
  if (!refreshToken) throw new Error("JOBBER2_REFRESH_TOKEN is not set");
  const { accessToken } = await exchangeRefreshToken(refreshToken);
  return accessToken;
}

export async function jobberReaderGraphQL(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<unknown> {
  const token = await getJobberReaderAccessToken();

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

  if (!res.ok) throw new Error(`Jobber reader GraphQL HTTP error: ${res.status}`);
  return res.json();
}
