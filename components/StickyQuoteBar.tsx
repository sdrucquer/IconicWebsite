"use client";

import { SMS_LINK } from "@/lib/constants";

export function StickyQuoteBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-primary/15 bg-white p-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] lg:hidden">
      <div className="mx-auto flex max-w-2xl items-center gap-2">
        <a
          href="/contact#quote"
          aria-label="Open full quote form"
          className="inline-flex flex-1 items-center justify-center rounded-full bg-brand-accent px-4 py-3 text-sm font-bold text-white"
        >
          Get Free Quote
        </a>
        <a
          href={SMS_LINK}
          aria-label="Text us"
          className="inline-flex flex-1 items-center justify-center rounded-full border border-brand-primary/25 px-4 py-3 text-sm font-bold text-brand-primary"
        >
          Text Us
        </a>
      </div>
    </div>
  );
}
