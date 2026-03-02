"use client";

import { PHONE_DISPLAY, SMS_LINK } from "@/lib/constants";

export function StickyQuoteBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-primary/15 bg-white p-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] lg:hidden">
      <div className="mx-auto grid max-w-2xl grid-cols-2 items-center gap-2">
        <a
          href="#quote"
          aria-label="Jump to quote form"
          data-track-event="cta_quote_click"
          data-track-params='{"source":"sticky_bar"}'
          className="inline-flex h-12 items-center justify-center rounded-full bg-brand-accent px-3 text-sm font-bold text-white"
        >
          Get Free Quote
        </a>
        <a
          href={SMS_LINK}
          aria-label={`Text us at ${PHONE_DISPLAY}`}
          data-track-event="click_to_text"
          data-track-params='{"source":"sticky_bar"}'
          className="inline-flex h-12 items-center justify-center rounded-full border border-brand-primary/30 px-3 text-center text-[13px] font-bold leading-tight text-brand-primary"
        >
          Text {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}
