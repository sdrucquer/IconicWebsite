"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition
        bg-brand-forest/10 text-brand-forest hover:bg-brand-forest/20
        active:scale-95"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
