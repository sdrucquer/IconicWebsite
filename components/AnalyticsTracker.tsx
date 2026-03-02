"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

function parseParams(raw: string | null): Record<string, string | number | boolean> {
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, string | number | boolean>;
    return parsed ?? {};
  } catch {
    return {};
  }
}

export function AnalyticsTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const trackedNode = target.closest<HTMLElement>("[data-track-event]");
      if (trackedNode) {
        trackEvent(trackedNode.dataset.trackEvent || "cta_click", parseParams(trackedNode.dataset.trackParams || null));
      }

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) {
        return;
      }

      if (anchor.href.startsWith("tel:")) {
        trackEvent("click_to_call", { href: anchor.href });
      }

      if (anchor.href.startsWith("sms:")) {
        trackEvent("click_to_text", { href: anchor.href });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
