"use client";

import { useEffect } from "react";
import { JOBBER_CLIENT_HUB_ID, JOBBER_FORM_URL, PHONE_DISPLAY, SMS_LINK } from "@/lib/constants";

/**
 * @deprecated Inline Jobber embed retained temporarily for rollback only.
 * Prefer direct hosted form CTA via JobberQuoteCta.
 */
type JobberQuoteEmbedProps = {
  title?: string;
  subtitle?: string;
  className?: string;
  variant?: "default" | "section";
  showCallFallback?: boolean;
  anchorId?: string;
  minHeight?: number;
};

export function JobberQuoteEmbed({
  title = "Get Your Free Quote",
  subtitle = "Tell us about your property and we will follow up quickly.",
  className = "",
  variant = "default",
  showCallFallback = false,
  anchorId = "quote",
  minHeight
}: JobberQuoteEmbedProps) {
  const isSection = variant === "section";
  const effectiveMinHeight = minHeight ?? (isSection ? 620 : 0);

  useEffect(() => {
    if (!document.getElementById("jobber-embed-style")) {
      const link = document.createElement("link");
      link.id = "jobber-embed-style";
      link.rel = "stylesheet";
      link.media = "screen";
      link.href = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css";
      document.head.appendChild(link);
    }

    const host = document.getElementById(JOBBER_CLIENT_HUB_ID);
    if (host) {
      host.innerHTML = "";
    }

    const script = document.createElement("script");
    script.src =
      "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
    script.async = true;
    script.setAttribute("clienthub_id", JOBBER_CLIENT_HUB_ID);
    script.setAttribute("form_url", JOBBER_FORM_URL);
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <section
      id={anchorId}
      className={`${
        isSection
          ? "rounded-2xl border border-brand-primary/18 border-t-4 border-t-brand-primary bg-white p-5 shadow-card md:p-7"
          : "texture-panel rounded-2xl border border-brand-primary/15 p-5 shadow-card md:p-7"
      } ${className}`}
      aria-label="Quote form section"
    >
      <h2
        className={`font-display font-extrabold text-brand-dark ${
          isSection ? "text-[1.5rem] md:text-[1.65rem]" : "text-[1.3rem] md:text-[1.45rem]"
        }`}
      >
        {title}
      </h2>
      <p className="mt-2 text-sm text-brand-dark/70">{subtitle}</p>
      {isSection ? (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
          Spring 2026 slots are filling - book your walkthrough now.
        </p>
      ) : null}
      <div
        id={JOBBER_CLIENT_HUB_ID}
        className="mt-5 overflow-hidden rounded-xl bg-white p-2 md:p-3"
        style={effectiveMinHeight ? { minHeight: `${effectiveMinHeight}px` } : undefined}
      />
      {showCallFallback ? (
        <p className="mt-4 text-xs text-brand-dark/65">
          Prefer to skip the form? Text us directly at{" "}
          <a
            href={SMS_LINK}
            className="font-semibold text-brand-primary hover:text-brand-accent"
            aria-label="Text Iconic Landscaping"
            data-track-event="click_to_text"
            data-track-params='{"source":"quote_embed_fallback"}'
          >
            {PHONE_DISPLAY}
          </a>{" "}
          and we&apos;ll get back to you fast.
        </p>
      ) : (
        <p className="mt-4 text-xs text-brand-dark/60">No pressure. No spam. Just a fast, local response.</p>
      )}
    </section>
  );
}
