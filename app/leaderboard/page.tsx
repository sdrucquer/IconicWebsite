import { unstable_cache } from "next/cache";
import { CREW } from "@/data/crew";
import { jobberGraphQL } from "@/lib/jobber";
import { LeaderboardClient } from "@/components/LeaderboardClient";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type JobberRequest = {
  id: string;
  title: string;
  createdAt: string;
  requestStatus: string;
  quotes: {
    nodes: { quoteStatus: string; jobs: { nodes: { id: string }[] } }[];
  };
};

export type PlayerStats = {
  slug: string;
  name: string;
  points: number;       // 1 per conversion (upgradeable to revenue-based later)
  conversions: number;
  submissions: number;  // total referrals submitted (converted or not)
};

// ---------------------------------------------------------------------------
// Season window — April 1 to Oct 31 of current year
// ---------------------------------------------------------------------------
function getSeasonWindow() {
  const year = new Date().getFullYear();
  return {
    start: new Date(`${year}-04-01T00:00:00`).toISOString(),
    end: new Date(`${year}-10-31T23:59:59`).toISOString(),
  };
}

function getMonthStart() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
}

// ---------------------------------------------------------------------------
// Fetch all flyer requests from Jobber
// ---------------------------------------------------------------------------
async function _fetchFlyerRequests(): Promise<JobberRequest[]> {
  const all: JobberRequest[] = [];
  let cursor: string | null = null;

  try {
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

      const data = json.data as Record<string, unknown> | undefined;
      const errors = (json as Record<string, unknown>).errors;
      if (errors) {
        console.error("[leaderboard] Jobber GraphQL errors:", JSON.stringify(errors));
        break; // return whatever we have so far
      }

      const nodes = ((data?.requests as Record<string, unknown>)?.nodes ?? []) as JobberRequest[];
      const pageInfo = (data?.requests as Record<string, unknown>)?.pageInfo as Record<string, unknown> | undefined;

      all.push(...nodes.filter((n) => /\[Flyer:/i.test(n.title)));

      if (!pageInfo?.hasNextPage) break;
      cursor = pageInfo.endCursor as string;
    }
  } catch (err) {
    // Throttle or network error — return whatever we fetched so far
    console.error("[leaderboard] fetchFlyerRequests error:", err);
  }

  return all;
}

// Cache results for 5 minutes — prevents hammering Jobber on every page load
const fetchFlyerRequests = unstable_cache(
  _fetchFlyerRequests,
  ["flyer-requests"],
  { revalidate: 300 }
);

function parseSlug(title: string): string | null {
  const match = title.match(/\[Flyer:\s*([^\]]+)\]/i);
  return match ? match[1].trim().toLowerCase() : null;
}

// ---------------------------------------------------------------------------
// Build stats for a given time window
// ---------------------------------------------------------------------------
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

    // Count as earned only when the client actually said yes:
    // quote approved, quote converted to job, or request converted to active work
    // Earned when the client actually said yes:
    // - quote was approved by client
    // - quote was converted to an active job
    // - a job exists on the quote (belt-and-suspenders check)
    const firstQuote = req.quotes?.nodes?.[0];
    const quoteStatus = firstQuote?.quoteStatus ?? "";
    const hasJob = (firstQuote?.jobs?.nodes?.length ?? 0) > 0;
    const isEarned =
      quoteStatus === "approved" ||
      quoteStatus === "converted_to_job" ||
      hasJob;

    if (isEarned) {
      s.conversions++;
      s.points += 1;
    }
  }

  return [...map.values()].sort((a, b) => b.points - a.points || b.submissions - a.submissions || a.name.localeCompare(b.name));
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function LeaderboardPage() {
  let monthlyStats: PlayerStats[] = [];
  let seasonStats: PlayerStats[] = [];
  let error: string | null = null;

  const season = getSeasonWindow();
  const monthStart = getMonthStart();

  try {
    const requests = await fetchFlyerRequests();
    monthlyStats = buildStats(requests, monthStart);
    seasonStats = buildStats(requests, season.start, season.end);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load data";
  }

  const now = new Date();
  const seasonEndDate = new Date(`${now.getFullYear()}-10-31`);
  const daysLeft = Math.max(0, Math.ceil((seasonEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <LeaderboardClient
      monthlyStats={monthlyStats}
      seasonStats={seasonStats}
      daysLeft={daysLeft}
      error={error}
      currentMonth={now.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      crew={CREW}
    />
  );
}
