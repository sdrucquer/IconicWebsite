"use client";

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

type GtagFn = (command: "event", eventName: string, params?: AnalyticsParams) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    event: eventName,
    ...params
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  window.dispatchEvent(new CustomEvent("iconic:analytics", { detail: payload }));
}
