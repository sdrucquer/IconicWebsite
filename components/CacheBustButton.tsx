"use client";

import { useState } from "react";

export function CacheBustButton() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleClick() {
    setState("loading");
    try {
      const res = await fetch("/api/admin/cache-bust", { method: "POST" });
      if (!res.ok) throw new Error();
      setState("done");
      setTimeout(() => window.location.reload(), 600);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  }

  const label =
    state === "loading" ? "Clearing…" :
    state === "done"    ? "Refreshing…" :
    state === "error"   ? "Failed — try again" :
    "↺ Refresh Data";

  return (
    <button
      onClick={handleClick}
      disabled={state === "loading" || state === "done"}
      className="rounded-xl bg-brand-sage/20 px-4 py-2 text-xs font-semibold text-brand-cream/80 transition hover:bg-brand-sage/30 disabled:opacity-50"
    >
      {label}
    </button>
  );
}
