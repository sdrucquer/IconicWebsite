import type { Metadata } from "next";
import { CREW } from "@/data/crew";
import { jobberGraphQL } from "@/lib/jobber";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Referral Dashboard | Iconic Landscaping",
  robots: { index: false, follow: false },
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type JobberRequest = {
  id: string;
  title: string;
  createdAt: string;
  requestStatus: string;
  quotes: { nodes: { quoteStatus: string; jobs: { nodes: { id: string }[] } }[] };
};

type CrewStats = {
  slug: string;
  name: string;
  total: number;
  thisMonth: number;
  converted: number;
  lastDate: string | null;
};

// ---------------------------------------------------------------------------
// Jobber helpers — token management is handled by lib/jobber.ts
// ---------------------------------------------------------------------------
async function fetchAllFlyerRequests(): Promise<JobberRequest[]> {
  const all: JobberRequest[] = [];
  let cursor: string | null = null;

  while (true) {
    const json = await jobberGraphQL(
      `query Requests($after: String) {
        requests(first: 100, after: $after) {
          nodes { id title createdAt requestStatus quotes { nodes { quoteStatus jobs { nodes { id } } } } }
          pageInfo { hasNextPage endCursor }
        }
      }`,
      { after: cursor }
    ) as Record<string, unknown>;

    const data = json.data as Record<string, unknown> | undefined;
    const nodes: JobberRequest[] = (data?.requests as Record<string, unknown> | undefined)?.nodes as JobberRequest[] ?? [];
    const pageInfo = (data?.requests as Record<string, unknown> | undefined)?.pageInfo as Record<string, unknown> | undefined;

    all.push(...nodes.filter((n) => /\[Flyer:/i.test(n.title)));

    if (!pageInfo?.hasNextPage) break;
    cursor = pageInfo.endCursor as string;
  }

  return all;
}

function parseFlyer(title: string): string | null {
  const match = title.match(/\[Flyer:\s*([^\]]+)\]/i);
  return match ? match[1].trim().toLowerCase() : null;
}

function buildStats(requests: JobberRequest[]): CrewStats[] {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const map = new Map<string, CrewStats>();

  // Seed with all known crew so they show even with 0 requests
  for (const c of CREW) {
    map.set(c.slug, { slug: c.slug, name: c.name, total: 0, thisMonth: 0, converted: 0, lastDate: null });
  }

  for (const req of requests) {
    const slug = parseFlyer(req.title);
    if (!slug || slug === "unknown") continue;

    if (!map.has(slug)) {
      // Future crew members not yet in config
      map.set(slug, { slug, name: slug, total: 0, thisMonth: 0, converted: 0, lastDate: null });
    }

    const s = map.get(slug)!;
    s.total++;
    if (req.createdAt >= monthStart) s.thisMonth++;
    const firstQuote = req.quotes?.nodes?.[0];
    const quoteStatus = firstQuote?.quoteStatus ?? "";
    const hasJob = (firstQuote?.jobs?.nodes?.length ?? 0) > 0;
    const isEarned =
      quoteStatus === "approved" ||
      quoteStatus === "converted_to_job" ||
      hasJob;
    if (isEarned) s.converted++;
    if (!s.lastDate || req.createdAt > s.lastDate) s.lastDate = req.createdAt;
  }

  return [...map.values()].sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatMonth(): string {
  return new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function ReferralDashboard() {
  let stats: CrewStats[] = [];
  let error: string | null = null;

  try {
    const requests = await fetchAllFlyerRequests();
    stats = buildStats(requests);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load data";
  }

  const totalRequests = stats.reduce((sum, s) => sum + s.total, 0);
  const totalConverted = stats.reduce((sum, s) => sum + s.converted, 0);
  const totalThisMonth = stats.reduce((sum, s) => sum + s.thisMonth, 0);
  const overallRate = totalRequests > 0 ? Math.round((totalConverted / totalRequests) * 100) : 0;

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-forest px-6 py-10 md:px-12 md:py-14">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-sage/70">Iconic Landscaping</p>
          <h1 className="mt-2 font-display text-3xl font-medium text-brand-cream md:text-4xl">
            Flyer Referral Dashboard
          </h1>
          <p className="mt-1 text-sm text-brand-sage/80">{formatMonth()}</p>

          {/* Overall stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 md:gap-8">
            {[
              { label: "Total requests", value: totalRequests },
              { label: "This month", value: totalThisMonth },
              { label: "Converted", value: `${totalConverted} (${overallRate}%)` },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-semibold text-brand-cream md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-brand-sage/70 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="mx-auto max-w-5xl px-6 py-10 md:px-12 md:py-12">
        {error ? (
          <div className="rounded-2xl bg-red-50 border border-red-200 px-6 py-5 text-sm text-red-700">
            Failed to load Jobber data: {error}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((s, i) => {
              const rate = s.total > 0 ? Math.round((s.converted / s.total) * 100) : 0;
              const isTopPerformer = i === 0 && s.total > 0;

              return (
                <div
                  key={s.slug}
                  className="relative rounded-2xl bg-white px-6 py-5 shadow-[0_4px_20px_rgba(20,44,32,0.07)]"
                >
                  {isTopPerformer && (
                    <span className="absolute right-4 top-4 rounded-full bg-brand-gold/20 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-brand-gold">
                      Top this month
                    </span>
                  )}

                  {/* Name */}
                  <p className="font-display text-xl font-medium text-brand-ink">{s.name}</p>
                  <p className="mt-0.5 text-xs text-brand-ink/40">/{s.slug}</p>

                  {/* Big number */}
                  <p className="mt-5 font-display text-5xl font-normal text-brand-forest leading-none">
                    {s.total}
                  </p>
                  <p className="mt-1 text-xs text-brand-ink/50 uppercase tracking-wide">
                    total {s.total === 1 ? "request" : "requests"}
                  </p>

                  {/* Stats row */}
                  <div className="mt-4 flex items-center gap-4 text-sm text-brand-ink/70">
                    <span>
                      <strong className="text-brand-ink">{s.thisMonth}</strong> this month
                    </span>
                    <span className="text-brand-ink/20">·</span>
                    <span>
                      <strong className="text-brand-ink">{s.converted}</strong> converted
                    </span>
                  </div>

                  {/* Conversion bar */}
                  {s.total > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-brand-ink/50">Conversion rate</span>
                        <span className="text-xs font-semibold text-brand-forest">{rate}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-brand-sage/20">
                        <div
                          className="h-1.5 rounded-full bg-brand-forest transition-all"
                          style={{ width: `${rate}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Last active */}
                  <p className="mt-4 text-xs text-brand-ink/35">
                    Last submission: {formatDate(s.lastDate)}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Referral Links */}
        <div className="mt-12">
          <h2 className="font-display text-xl font-medium text-brand-ink mb-1">Referral Links</h2>
          <p className="text-sm text-brand-ink/50 mb-5">Share or print each person&apos;s unique flyer URL.</p>
          <div className="rounded-2xl bg-white shadow-[0_4px_20px_rgba(20,44,32,0.07)] overflow-hidden">
            {CREW.map((c, i) => {
              const url = `https://iconic.land/quote?ref=${c.slug}`;
              return (
                <div
                  key={c.slug}
                  className={`flex items-center gap-3 px-5 py-3.5 ${i !== CREW.length - 1 ? "border-b border-brand-sage/15" : ""}`}
                >
                  <p className="w-40 shrink-0 text-sm font-medium text-brand-ink">{c.name}</p>
                  <p className="flex-1 truncate text-sm text-brand-ink/40 font-mono">{url}</p>
                  <CopyButton text={url} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
