/**
 * Leaderboard stats cache — stores computed stats in Upstash KV.
 *
 * On each leaderboard page load:
 *  1. Read KV — if data is < 5 min old, return it instantly (no Jobber call)
 *  2. If stale or missing — fetch from Jobber, write to KV, return fresh data
 *  3. If Jobber fails — return stale KV data so the page always has something
 *
 * This means Jobber is called at most once every 5 minutes regardless of
 * how many crew members are checking the leaderboard simultaneously.
 */
import "server-only";
import { Redis } from "@upstash/redis";
import { jobberGraphQL } from "@/lib/jobber";
import { CREW } from "@/data/crew";

const CACHE_KEY = "leaderboard:stats";
const CACHE_TTL_SECONDS = 300; // 5 minutes
const LOCK_KEY = "leaderboard:refresh_lock";
const LOCK_TTL_SECONDS = 15;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type PlayerStats = {
  slug: string;
  name: string;
  points: number;
  conversions: number;
  submissions: number;
};

type CachedStats = {
  monthly: PlayerStats[];
  season: PlayerStats[];
  updatedAt: number;
};

type JobberRequest = {
  id: string;
  title: string;
  createdAt: string;
  requestStatus: string;
  quotes: { nodes: { quoteStatus: string; jobs: { nodes: { id: string }[] } }[] };
};

// ---------------------------------------------------------------------------
// Redis client
// ---------------------------------------------------------------------------
function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// ---------------------------------------------------------------------------
// Fetch from Jobber
// ---------------------------------------------------------------------------
async function fetchFromJobber(): Promise<JobberRequest[]> {
  const all: JobberRequest[] = [];
  let cursor: string | null = null;

  while (true) {
    const json = await jobberGraphQL(
      `query Requests($after: String) {
        requests(first: 100, after: $after) {
          nodes {
            id title createdAt requestStatus
            quotes { nodes { quoteStatus jobs { nodes { id } } } }
          }
          pageInfo { hasNextPage endCursor }
        }
      }`,
      { after: cursor }
    ) as Record<string, unknown>;

    const errors = (json as Record<string, unknown>).errors;
    if (errors) {
      console.error("[leaderboard-cache] Jobber errors:", JSON.stringify(errors));
      break;
    }

    const data = json.data as Record<string, unknown> | undefined;
    const nodes = ((data?.requests as Record<string, unknown>)?.nodes ?? []) as JobberRequest[];
    const pageInfo = (data?.requests as Record<string, unknown>)?.pageInfo as Record<string, unknown> | undefined;

    all.push(...nodes.filter((n) => /\[Flyer:/i.test(n.title)));

    if (!pageInfo?.hasNextPage) break;
    cursor = pageInfo.endCursor as string;
  }

  return all;
}

// ---------------------------------------------------------------------------
// Build stats from requests
// ---------------------------------------------------------------------------
function parseSlug(title: string): string | null {
  const match = title.match(/\[Flyer:\s*([^\]]+)\]/i);
  return match ? match[1].trim().toLowerCase() : null;
}

function buildStats(requests: JobberRequest[], from: string, to?: string): PlayerStats[] {
  const map = new Map<string, PlayerStats>();
  for (const c of CREW) {
    map.set(c.slug, { slug: c.slug, name: c.name, points: 0, conversions: 0, submissions: 0 });
  }

  for (const req of requests) {
    if (req.createdAt < from) continue;
    if (to && req.createdAt > to) continue;

    const slug = parseSlug(req.title);
    if (!slug) continue;
    if (!map.has(slug)) {
      map.set(slug, { slug, name: slug, points: 0, conversions: 0, submissions: 0 });
    }

    const s = map.get(slug)!;
    s.submissions++;

    const firstQuote = req.quotes?.nodes?.[0];
    const quoteStatus = firstQuote?.quoteStatus ?? "";
    const hasJob = (firstQuote?.jobs?.nodes?.length ?? 0) > 0;
    const isEarned = quoteStatus === "approved" || quoteStatus === "converted_to_job" || hasJob;

    if (isEarned) {
      s.conversions++;
      s.points += 1;
    }
  }

  return [...map.values()].sort((a, b) => b.points - a.points || b.submissions - a.submissions || a.name.localeCompare(b.name));
}

function getWindows() {
  const now = new Date();
  const year = now.getFullYear();
  return {
    monthStart: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
    seasonStart: new Date(`${year}-04-01T00:00:00`).toISOString(),
    seasonEnd: new Date(`${year}-10-31T23:59:59`).toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------
export async function getLeaderboardStats(): Promise<{
  monthly: PlayerStats[];
  season: PlayerStats[];
  updatedAt: number | null;
  stale: boolean;
}> {
  const redis = getRedis();
  const now = Date.now();

  // 1. Try KV first
  if (redis) {
    const cached = await redis.get<CachedStats>(CACHE_KEY);

    if (cached) {
      const age = now - cached.updatedAt;
      const isFresh = age < CACHE_TTL_SECONDS * 1000;

      if (isFresh) {
        console.log(`[leaderboard-cache] Serving from KV (${Math.round(age / 1000)}s old)`);
        return { monthly: cached.monthly, season: cached.season, updatedAt: cached.updatedAt, stale: false };
      }

      // Stale — acquire a lock so only one concurrent request hits Jobber
      console.log(`[leaderboard-cache] KV stale (${Math.round(age / 1000)}s old), refreshing from Jobber`);
      const lockAcquired = await redis.set(LOCK_KEY, "1", { nx: true, ex: LOCK_TTL_SECONDS });

      if (!lockAcquired) {
        // Another request is already refreshing — wait briefly and serve whatever is in cache
        console.log("[leaderboard-cache] Lock held by another request, waiting 2s then serving stale");
        await new Promise((r) => setTimeout(r, 2_000));
        const rechecked = await redis.get<CachedStats>(CACHE_KEY);
        const source = rechecked ?? cached;
        return { monthly: source.monthly, season: source.season, updatedAt: source.updatedAt, stale: !rechecked };
      }

      try {
        const requests = await fetchFromJobber();
        const { monthStart, seasonStart, seasonEnd } = getWindows();
        const fresh: CachedStats = {
          monthly: buildStats(requests, monthStart),
          season: buildStats(requests, seasonStart, seasonEnd),
          updatedAt: now,
        };
        await redis.set(CACHE_KEY, fresh, { ex: CACHE_TTL_SECONDS * 2 }); // store for 10 min as safety net
        console.log("[leaderboard-cache] KV updated");
        return { ...fresh, stale: false };
      } catch (err) {
        console.error("[leaderboard-cache] Jobber refresh failed, serving stale:", err);
        return { monthly: cached.monthly, season: cached.season, updatedAt: cached.updatedAt, stale: true };
      } finally {
        await redis.del(LOCK_KEY).catch(() => {});
      }
    }
  }

  // 2. No KV or no cached data — fetch live
  console.log("[leaderboard-cache] No cache, fetching from Jobber");
  try {
    const requests = await fetchFromJobber();
    const { monthStart, seasonStart, seasonEnd } = getWindows();
    const fresh: CachedStats = {
      monthly: buildStats(requests, monthStart),
      season: buildStats(requests, seasonStart, seasonEnd),
      updatedAt: now,
    };
    if (redis) {
      await redis.set(CACHE_KEY, fresh, { ex: CACHE_TTL_SECONDS * 2 });
    }
    return { ...fresh, stale: false };
  } catch (err) {
    console.error("[leaderboard-cache] Jobber fetch failed:", err);
    return { monthly: [], season: [], updatedAt: null, stale: true };
  }
}
