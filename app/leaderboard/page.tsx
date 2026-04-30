import { CREW } from "@/data/crew";
import { getLeaderboardStats } from "@/lib/leaderboard-cache";
import { LeaderboardClient } from "@/components/LeaderboardClient";
export type { PlayerStats } from "@/lib/leaderboard-cache";

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function LeaderboardPage() {
  const { monthly, season, stale, updatedAt } = await getLeaderboardStats();

  const now = new Date();
  const seasonEndDate = new Date(`${now.getFullYear()}-10-31`);
  const daysLeft = Math.max(0, Math.ceil((seasonEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <LeaderboardClient
      monthlyStats={monthly}
      seasonStats={season}
      daysLeft={daysLeft}
      error={stale && monthly.length === 0 ? "Could not load data right now — check back in a moment." : null}
      currentMonth={now.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      crew={CREW}
      updatedAt={updatedAt}
    />
  );
}
