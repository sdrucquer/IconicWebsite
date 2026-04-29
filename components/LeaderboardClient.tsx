"use client";

import { useState } from "react";
import type { PlayerStats } from "@/app/leaderboard/page";

// ---------------------------------------------------------------------------
// Podium
// ---------------------------------------------------------------------------
function Podium({ stats }: { stats: PlayerStats[] }) {
  const top = stats.filter((s) => s.points > 0).slice(0, 3);
  const [gold, silver, bronze] = top;

  if (!gold) return null;

  // Layout: silver | gold | bronze
  const slots = [
    { player: silver, rank: 2, height: "h-24", emoji: "🥈", nameSize: "text-sm", numSize: "text-2xl", bg: "bg-white/10" },
    { player: gold,   rank: 1, height: "h-32", emoji: "🥇", nameSize: "text-base", numSize: "text-4xl", bg: "bg-brand-gold/25", glow: true },
    { player: bronze, rank: 3, height: "h-16", emoji: "🥉", nameSize: "text-sm", numSize: "text-2xl", bg: "bg-white/10" },
  ];

  return (
    <div className="flex items-end justify-center gap-2 pt-2 pb-1">
      {slots.map(({ player, rank, height, emoji, nameSize, numSize, bg, glow }) => {
        if (!player) {
          return (
            <div key={rank} className="flex-1 max-w-[110px]">
              <div className={`${height} rounded-t-xl bg-white/5`} />
            </div>
          );
        }
        const firstName = player.name.split(" ")[0];
        const lastName = player.name.split(" ").slice(1).join(" ");

        return (
          <div key={player.slug} className="flex flex-col items-center flex-1 max-w-[110px]">
            {/* Avatar bubble */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 text-lg font-bold
              ${glow ? "bg-brand-gold text-white shadow-[0_0_20px_rgba(184,146,61,0.5)]" : "bg-white/20 text-white"}`}>
              {firstName[0]}{lastName?.[0] ?? ""}
            </div>

            {/* Name */}
            <p className={`${nameSize} font-semibold text-white text-center leading-tight`}>{firstName}</p>
            <p className="text-[10px] text-white/50 text-center">{lastName}</p>

            {/* Points */}
            <p className={`${numSize} font-display font-medium text-white mt-1 leading-none`}>{player.points}</p>
            <p className="text-[10px] text-white/50 uppercase tracking-widest mb-2">pts</p>

            {/* Podium block */}
            <div className={`w-full ${height} ${bg} rounded-t-xl flex items-start justify-center pt-2.5
              ${glow ? "ring-1 ring-brand-gold/40" : ""}`}>
              <span className="text-lg">{emoji}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ranked list — 4th place and below
// ---------------------------------------------------------------------------
function RankedList({ stats }: { stats: PlayerStats[] }) {
  const leader = stats[0]?.points ?? 1;
  const rest = stats.slice(3);
  const hasAny = rest.some((s) => s.points > 0 || s.submissions > 0);

  if (!hasAny) return null;

  return (
    <div className="rounded-2xl bg-white overflow-hidden shadow-[0_4px_24px_rgba(20,44,32,0.08)]">
      {rest.map((player, i) => {
        const pct = leader > 0 ? Math.round((player.points / leader) * 100) : 0;
        const isActive = player.points > 0 || player.submissions > 0;

        return (
          <div
            key={player.slug}
            className={`px-5 py-4 ${i !== rest.length - 1 ? "border-b border-brand-sage/10" : ""} ${!isActive ? "opacity-40" : ""}`}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 text-sm font-bold text-brand-ink/25 tabular-nums shrink-0">{i + 4}</span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-semibold text-brand-ink truncate">{player.name}</p>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-xs text-brand-ink/40">{player.conversions} converted</span>
                    <span className="text-sm font-bold text-brand-forest">{player.points} pts</span>
                  </div>
                </div>
                {/* Progress bar toward leader */}
                <div className="h-1 w-full rounded-full bg-brand-sage/15">
                  <div
                    className="h-1 rounded-full bg-brand-forest/50 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Prize cards
// ---------------------------------------------------------------------------
function PrizeCards() {
  return (
    <div className="grid grid-cols-3 gap-2 mt-6">
      <div className="rounded-xl bg-white/10 px-3 py-3 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">Per Job</p>
        <p className="font-display text-xl font-medium text-white">$10–$25</p>
        <p className="text-[10px] text-white/40 mt-0.5">in paycheck</p>
      </div>
      <div className="rounded-xl bg-brand-gold/20 px-3 py-3 text-center ring-1 ring-brand-gold/40">
        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/80 mb-1">Monthly 🏅</p>
        <p className="font-display text-xl font-medium text-white">$50</p>
        <p className="text-[10px] text-white/40 mt-0.5">most pts wins</p>
      </div>
      <div className="rounded-xl bg-brand-gold/20 px-3 py-3 text-center ring-1 ring-brand-gold/40">
        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/80 mb-1">Season 🏆</p>
        <p className="font-display text-xl font-medium text-white">🏈 NFL Tix</p>
        <p className="text-[10px] text-white/40 mt-0.5">up to $250 total</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main
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
  const monthName = currentMonth.split(" ")[0];
  const year = currentMonth.split(" ")[1];

  return (
    <div className="min-h-screen bg-brand-cream">

      {/* ── Hero header ── */}
      <div className="bg-brand-forest px-6 pt-10 pb-0 md:px-8">
        <div className="mx-auto max-w-lg">

          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-sage/50">Iconic Landscaping</p>
              <h1 className="mt-1 font-display text-2xl font-medium text-white md:text-3xl">
                Referral Leaderboard
              </h1>
            </div>
            <div className="text-right">
              <p className="font-display text-3xl font-medium text-white">{daysLeft}</p>
              <p className="text-[10px] text-brand-sage/50 uppercase tracking-wide">days left</p>
            </div>
          </div>

          <PrizeCards />

          {/* Tab switcher — sits on the green, bleeds into cream */}
          <div className="mt-6 flex gap-1 bg-brand-forest/60 rounded-2xl p-1">
            {(["month", "season"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${
                  tab === t
                    ? "bg-white text-brand-forest shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {t === "month" ? `${monthName} ${year}` : "Full Season"}
              </button>
            ))}
          </div>

          {/* Podium — overlaps the cream section below */}
          {!error && hasData && (
            <div className="mt-2">
              <Podium stats={activeStats} />
            </div>
          )}
        </div>
      </div>

      {/* ── Rankings ── */}
      <div className="mx-auto max-w-lg px-6 pb-16 md:px-8">
        {error ? (
          <div className="mt-8 rounded-2xl bg-red-50 border border-red-200 px-6 py-5 text-sm text-red-700">
            Could not load data right now — check back in a moment.
          </div>
        ) : hasData ? (
          <div className="mt-4">
            <RankedList stats={activeStats} />
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-white shadow-[0_4px_24px_rgba(20,44,32,0.07)] px-6 py-12 text-center">
            <p className="text-4xl mb-3">🌱</p>
            <p className="font-display text-xl font-medium text-brand-ink">No converted referrals yet</p>
            <p className="mt-2 text-sm text-brand-ink/50">
              First conversion of {tab === "month" ? monthName : "the season"} takes the lead!
            </p>
          </div>
        )}

        {/* How it works */}
        <div className="mt-8 rounded-2xl bg-white shadow-[0_4px_24px_rgba(20,44,32,0.07)] px-5 py-5">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-3">How it works</p>
          <div className="space-y-2 text-sm text-brand-ink/70">
            <div className="flex items-start gap-2">
              <span className="text-brand-forest font-bold shrink-0">1 pt</span>
              <span>Every converted referral earns 1 point toward the leaderboard</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-brand-forest font-bold shrink-0">$10</span>
              <span>Paid to you when referred job is under $500</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-brand-forest font-bold shrink-0">$25</span>
              <span>Paid to you when referred job is $500 or more</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-brand-forest font-bold shrink-0">$50</span>
              <span>Bonus to whoever leads the monthly points race</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-brand-forest font-bold shrink-0">🏈</span>
              <span>NFL tickets (up to $250 total) to the season points leader on Oct 31</span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-brand-ink/25">
          Points update live · season runs Apr 1 – Oct 31
        </p>
      </div>
    </div>
  );
}
