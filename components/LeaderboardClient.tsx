"use client";

import { useState } from "react";
import type { PlayerStats } from "@/app/leaderboard/page";

// ---------------------------------------------------------------------------
// Medal colours for top 3
// ---------------------------------------------------------------------------
const MEDALS = [
  { bg: "bg-brand-gold",       text: "text-white",          label: "🥇", ring: "ring-brand-gold/40"   },
  { bg: "bg-brand-ink/20",     text: "text-brand-ink",      label: "🥈", ring: "ring-brand-ink/20"    },
  { bg: "bg-[#cd7f32]/30",     text: "text-[#7a4b1a]",      label: "🥉", ring: "ring-[#cd7f32]/30"    },
];

// ---------------------------------------------------------------------------
// Prize banner
// ---------------------------------------------------------------------------
function PrizeBanner() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="rounded-2xl bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-sage/70">Per Conversion</p>
        <p className="mt-1 font-display text-2xl font-medium text-brand-cream">$10–$25</p>
        <p className="mt-0.5 text-xs text-brand-sage/60">in your paycheck</p>
      </div>
      <div className="rounded-2xl bg-brand-gold/20 px-4 py-3 text-center ring-1 ring-brand-gold/30">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gold/80">Monthly Winner</p>
        <p className="mt-1 font-display text-2xl font-medium text-brand-cream">$50 Cash</p>
        <p className="mt-0.5 text-xs text-brand-sage/60">most points that month</p>
      </div>
      <div className="rounded-2xl bg-brand-gold/20 px-4 py-3 text-center ring-1 ring-brand-gold/30">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gold/80">Season Winner</p>
        <p className="mt-1 font-display text-2xl font-medium text-brand-cream">🏈 NFL Tickets</p>
        <p className="mt-0.5 text-xs text-brand-sage/60">2 tickets, up to $250 · ends Oct 31</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Podium — top 3
// ---------------------------------------------------------------------------
function Podium({ stats }: { stats: PlayerStats[] }) {
  const [first, second, third] = stats;

  if (!first) {
    return (
      <div className="py-12 text-center text-brand-ink/30 text-sm">
        No referrals yet — be the first! 🚀
      </div>
    );
  }

  // Render order: 2nd, 1st, 3rd (classic podium layout)
  const podiumOrder = [second, first, third].filter(Boolean);
  const heightClass = ["h-20", "h-28", "h-16"];
  const orderIndex = [1, 0, 2]; // which medal index each slot gets

  return (
    <div className="flex items-end justify-center gap-3 mt-8 px-4">
      {podiumOrder.map((player, slotIdx) => {
        const medalIdx = orderIndex[slotIdx];
        const medal = MEDALS[medalIdx];
        const isFirst = medalIdx === 0;

        return (
          <div key={player.slug} className="flex flex-col items-center gap-2 flex-1 max-w-[120px]">
            {/* Name + points */}
            <div className="text-center">
              <p className={`font-semibold leading-tight text-brand-ink ${isFirst ? "text-base" : "text-sm"}`}>
                {player.name.split(" ")[0]}
              </p>
              <p className="text-xs text-brand-ink/50">{player.name.split(" ").slice(1).join(" ")}</p>
              <p className={`font-display font-medium text-brand-forest mt-1 ${isFirst ? "text-3xl" : "text-2xl"}`}>
                {player.points}
              </p>
              <p className="text-[10px] text-brand-ink/40 uppercase tracking-wide">pts</p>
            </div>

            {/* Podium block */}
            <div className={`w-full ${heightClass[slotIdx]} rounded-t-xl ${medal.bg} flex items-start justify-center pt-2`}>
              <span className="text-xl">{medal.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ranked list — everyone below top 3
// ---------------------------------------------------------------------------
function RankedList({ stats }: { stats: PlayerStats[] }) {
  const rest = stats.slice(3).filter((s) => s.submissions > 0 || s.points > 0);

  if (rest.length === 0) return null;

  return (
    <div className="mt-4 rounded-2xl bg-white shadow-[0_4px_20px_rgba(20,44,32,0.07)] overflow-hidden">
      {rest.map((player, i) => (
        <div
          key={player.slug}
          className={`flex items-center gap-4 px-5 py-3.5 ${i !== rest.length - 1 ? "border-b border-brand-sage/15" : ""}`}
        >
          <p className="w-6 text-sm font-bold text-brand-ink/30 tabular-nums">{i + 4}</p>
          <p className="flex-1 text-sm font-medium text-brand-ink">{player.name}</p>
          <div className="text-right">
            <p className="text-sm font-bold text-brand-forest">{player.points} pts</p>
            <p className="text-[10px] text-brand-ink/40">{player.conversions} converted</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Zero-state for when nobody has points yet
// ---------------------------------------------------------------------------
function ZeroState({ label }: { label: string }) {
  return (
    <div className="mt-8 rounded-2xl bg-white shadow-[0_4px_20px_rgba(20,44,32,0.07)] px-6 py-12 text-center">
      <p className="text-4xl mb-3">🌱</p>
      <p className="font-display text-xl font-medium text-brand-ink">Season hasn&apos;t started yet</p>
      <p className="mt-2 text-sm text-brand-ink/50">First referral of {label} takes the lead!</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main client component
// ---------------------------------------------------------------------------
type Props = {
  monthlyStats: PlayerStats[];
  seasonStats: PlayerStats[];
  daysLeft: number;
  error: string | null;
  currentMonth: string;
};

export function LeaderboardClient({ monthlyStats, seasonStats, daysLeft, error, currentMonth }: Props) {
  const [tab, setTab] = useState<"month" | "season">("month");

  const activeStats = tab === "month" ? monthlyStats : seasonStats;
  const hasData = activeStats.some((s) => s.points > 0);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-forest px-6 pt-10 pb-8 md:px-12">
        <div className="mx-auto max-w-lg">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-sage/60">Iconic Landscaping</p>
          <h1 className="mt-2 font-display text-3xl font-medium text-brand-cream md:text-4xl">
            Referral Leaderboard 🏆
          </h1>
          <p className="mt-1 text-sm text-brand-sage/70">
            {daysLeft > 0 ? `${daysLeft} days left in the season` : "Season ended — final standings"}
          </p>

          <PrizeBanner />
        </div>
      </div>

      {/* Tab switcher */}
      <div className="sticky top-0 z-10 bg-brand-cream border-b border-brand-sage/20 px-6 md:px-12">
        <div className="mx-auto max-w-lg flex gap-1 py-3">
          {(["month", "season"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${
                tab === t
                  ? "bg-brand-forest text-brand-cream"
                  : "text-brand-ink/50 hover:text-brand-ink"
              }`}
            >
              {t === "month" ? `📅 ${currentMonth.split(" ")[0]}` : "🌿 Full Season"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-lg px-6 pb-16 md:px-12">
        {error ? (
          <div className="mt-8 rounded-2xl bg-red-50 border border-red-200 px-6 py-5 text-sm text-red-700">
            Could not load data: {error}
          </div>
        ) : hasData ? (
          <>
            <Podium stats={activeStats} />
            <RankedList stats={activeStats} />
          </>
        ) : (
          <ZeroState label={tab === "month" ? currentMonth : "the season"} />
        )}

        {/* Points note */}
        <p className="mt-8 text-center text-xs text-brand-ink/30">
          1 point per converted referral · points update live
        </p>
      </div>
    </div>
  );
}
