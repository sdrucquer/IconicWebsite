"use client";

import { useEffect, useRef } from "react";
import { JOBBER_CLIENT_HUB_ID } from "@/lib/constants";
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
  const quoteViewedRef = useRef(false);

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

  useEffect(() => {
    const quoteSection = document.getElementById("quote");
    if (!quoteSection) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !quoteViewedRef.current) {
          quoteViewedRef.current = true;
          trackEvent("quote_form_viewed", { section: "quote" });
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(quoteSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const host = document.getElementById(JOBBER_CLIENT_HUB_ID);
    if (!host) {
      return;
    }

    let startedTracked = false;
    const markStarted = () => {
      if (startedTracked) {
        return;
      }

      startedTracked = true;
      trackEvent("quote_form_started", { provider: "jobber" });
    };

    const onStart = () => {
      markStarted();
    };

    host.addEventListener("pointerdown", onStart, { once: true });

    const observer = new MutationObserver(() => {
      if (host.querySelector("iframe")) {
        markStarted();
      }
    });

    observer.observe(host, { childList: true, subtree: true });

    return () => {
      host.removeEventListener("pointerdown", onStart);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (typeof event.origin !== "string" || !event.origin.includes("jobber")) {
        return;
      }

      const message = typeof event.data === "string" ? event.data.toLowerCase() : JSON.stringify(event.data).toLowerCase();
      if (message.includes("submit") || message.includes("success") || message.includes("completed")) {
        trackEvent("quote_form_submitted", { provider: "jobber" });
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}
