"use client";

import { useState } from "react";
import type { PlayerStats } from "@/app/leaderboard/page";
import type { CrewMember } from "@/data/crew";

// ---------------------------------------------------------------------------
// Podium
// ---------------------------------------------------------------------------
function Podium({ stats }: { stats: PlayerStats[] }) {
  const top = stats.filter((s) => s.points > 0).slice(0, 3);
  const [gold, silver, bronze] = top;

  if (!gold) return null;

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
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 text-lg font-bold
              ${glow ? "bg-brand-gold text-white shadow-[0_0_20px_rgba(184,146,61,0.5)]" : "bg-white/20 text-white"}`}>
              {firstName[0]}{lastName?.[0] ?? ""}
            </div>
            <p className={`${nameSize} font-semibold text-white text-center leading-tight`}>{firstName}</p>
            <p className="text-[10px] text-white/50 text-center">{lastName}</p>
            <p className={`${numSize} font-display font-medium text-white mt-1 leading-none`}>{player.points}</p>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">pts</p>
            {/* Submitted / converted mini-stats */}
            <p className="text-[10px] text-white/40 mb-2 mt-0.5">
              {player.submissions} sent · {player.conversions} converted
            </p>
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
// Full ranked list — everyone, sorted by points
// ---------------------------------------------------------------------------
function RankedList({ stats, topCount }: { stats: PlayerStats[]; topCount: number }) {
  const leader = stats[0]?.points ?? 1;
  const rows = stats.slice(topCount); // everyone not on the podium

  if (rows.length === 0) return null;

  return (
    <div className="rounded-2xl bg-white overflow-hidden shadow-[0_4px_24px_rgba(20,44,32,0.08)]">
      {rows.map((player, i) => {
        const pct = leader > 0 ? Math.round((player.points / leader) * 100) : 0;
        const hasActivity = player.submissions > 0;

        return (
          <div
            key={player.slug}
            className={`px-5 py-3.5 ${i !== rows.length - 1 ? "border-b border-brand-sage/10" : ""} ${!hasActivity ? "opacity-35" : ""}`}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 text-sm font-bold text-brand-ink/25 tabular-nums shrink-0">{i + topCount + 1}</span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-brand-ink truncate">{player.name}</p>
                  <div className="flex items-center gap-3 shrink-0 ml-2">
                    <span className="text-xs text-brand-ink/40 tabular-nums">{player.submissions} sent</span>
                    <span className="text-xs text-brand-ink/40 tabular-nums">{player.conversions} converted</span>
                    <span className="text-sm font-bold text-brand-forest tabular-nums">{player.points} pts</span>
                  </div>
                </div>
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
      {/* Per job */}
      <div className="rounded-2xl bg-white/15 px-3 py-4 text-center">
        <p className="text-lg font-display font-medium text-white">$10–$25</p>
        <p className="text-xs font-semibold text-white/90 mt-0.5">Per Job</p>
        <p className="text-[10px] text-white/50 mt-1 leading-tight">paid in your paycheck</p>
      </div>
      {/* Monthly */}
      <div className="rounded-2xl bg-brand-gold px-3 py-4 text-center shadow-[0_4px_16px_rgba(184,146,61,0.4)]">
        <p className="text-lg font-display font-medium text-white">$50</p>
        <p className="text-xs font-semibold text-white/90 mt-0.5">Monthly 🏅</p>
        <p className="text-[10px] text-white/70 mt-1 leading-tight">most points wins</p>
      </div>
      {/* Season */}
      <div className="rounded-2xl bg-brand-gold px-3 py-4 text-center shadow-[0_4px_16px_rgba(184,146,61,0.4)]">
        <p className="text-lg font-display font-medium text-white">🏈 Tix</p>
        <p className="text-xs font-semibold text-white/90 mt-0.5">Season 🏆</p>
        <p className="text-[10px] text-white/70 mt-1 leading-tight">NFL, up to $250</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// My Link section
// ---------------------------------------------------------------------------
function MyLink({ crew }: { crew: CrewMember[] }) {
  const [selected, setSelected] = useState("");
  const [copied, setCopied] = useState(false);

  const url = selected ? `https://iconic.land/quote?ref=${selected}` : "";

  async function handleCopy() {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(20,44,32,0.08)] px-5 py-5">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-3">🔗 My Referral Link</p>
      <select
        value={selected}
        onChange={(e) => { setSelected(e.target.value); setCopied(false); }}
        className="w-full h-11 rounded-xl border border-brand-sage/30 bg-white px-3 text-sm text-brand-ink outline-none focus:border-brand-forest focus:ring-4 focus:ring-brand-forest/10"
      >
        <option value="">Select your name…</option>
        {crew.map((c) => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>

      {url && (
        <div className="mt-3 flex items-center gap-2">
          <p className="flex-1 truncate rounded-xl bg-brand-cream px-3 py-2.5 text-xs font-mono text-brand-ink/60">
            {url}
          </p>
          <button
            onClick={handleCopy}
            className="shrink-0 rounded-xl px-4 py-2.5 text-xs font-semibold bg-brand-forest text-brand-cream transition hover:bg-brand-forest/90 active:scale-95"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

type Props = {
  monthlyStats: PlayerStats[];
  seasonStats: PlayerStats[];
  daysLeft: number;
  error: string | null;
  currentMonth: string;
  crew: CrewMember[];
};

export function LeaderboardClient({ monthlyStats, seasonStats, daysLeft, error, currentMonth, crew }: Props) {
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
              <p className="text-sm font-semibold text-brand-sage/70">Iconic Landscaping</p>
              <h1 className="mt-0.5 font-display text-3xl font-medium text-white md:text-4xl">
                Leaderboard 🏆
              </h1>
            </div>
            <div className="text-right shrink-0">
              <p className="font-display text-4xl font-medium text-white">{daysLeft}</p>
              <p className="text-xs text-brand-sage/60 uppercase tracking-wide">days left</p>
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
        ) : (
          <>
            {!hasData && (
              <div className="mt-6 rounded-2xl bg-white shadow-[0_4px_24px_rgba(20,44,32,0.07)] px-6 py-8 text-center">
                <p className="text-3xl mb-2">🌱</p>
                <p className="font-display text-lg font-medium text-brand-ink">No converted referrals yet</p>
                <p className="mt-1 text-sm text-brand-ink/50">
                  First conversion of {tab === "month" ? monthName : "the season"} takes the lead!
                </p>
              </div>
            )}
            {/* Always show full crew ranked list */}
            <div className="mt-4">
              <RankedList stats={activeStats} topCount={hasData ? 3 : 0} />
            </div>
          </>
        )}

        {/* My referral link */}
        <div className="mt-6">
          <MyLink crew={crew} />
        </div>

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
