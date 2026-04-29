"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";

type Review = {
  quote: string;
  author: string;
  location: string;
  stars: number;
  service?: string;
};

const reviews: Review[] = [
  {
    quote:
      "I was very impressed with response times, scheduling and updates. The crew was polite, respectful and went above and beyond my expectations.",
    author: "Wendy Hanna",
    location: "Royersford",
    stars: 5,
    service: "Seasonal cleanup"
  },
  {
    quote:
      "They were communicative, hardworking, and great. You can tell they care about what they\u2019re doing and that they are doing work that they are proud of.",
    author: "Amanda Yoder",
    location: "Spring City",
    stars: 5,
    service: "Landscape refresh"
  },
  {
    quote:
      "Iconic did a wonderful job with our spring clean up and mulching. They were professional, dependable and hardworking.",
    author: "Zoe Baker",
    location: "Pottstown",
    stars: 5,
    service: "Cleanup and mulch"
  },
  {
    quote:
      "These guys were on point! They arrived early, had everything they needed, asked questions about what exactly we wanted and made our lives 100 times easier.",
    author: "Philip Brady",
    location: "Chester Springs",
    stars: 5,
    service: "Property cleanup"
  },
  {
    quote:
      "Crew did a fantastic job - arrived on time, got the work done, and even asked us to review their work before they left.",
    author: "Kathy M.",
    location: "Chester Springs",
    stars: 5,
    service: "Walkthrough"
  },
  {
    quote:
      "All are HS and college kids who work very hard and kept me well informed the entire time. They do a great job and were very reasonable.",
    author: "Karen Michaels",
    location: "Pottstown",
    stars: 5,
    service: "Yard cleanup"
  },
  {
    quote:
      "Highly recommend. Very professional and communication was great. They did an awesome job creating a new flower bed and mulching all existing beds.",
    author: "Susan Smith",
    location: "Collegeville",
    stars: 5,
    service: "Planting beds"
  }
];

const AUTOPLAY_MS = 5200;

function StarRating({ count, size = "sm" }: { count: number; size?: "sm" | "md" }) {
  return (
    <div className="flex gap-0.5 text-brand-gold" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${size === "md" ? "h-5 w-5" : "h-4 w-4"} ${
            i < count ? "fill-current" : "fill-transparent text-brand-sage/45"
          }`}
          strokeWidth={1.8}
        />
      ))}
    </div>
  );
}

export function TestimonialsCarousel() {
  const [idx, setIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const r = reviews[idx];
  const progress = useMemo(() => ((idx + 1) / reviews.length) * 100, [idx]);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setIdx((current) => (current + 1) % reviews.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const goTo = (nextIndex: number) => {
    setIdx(nextIndex);
  };

  const prev = () => goTo((idx - 1 + reviews.length) % reviews.length);
  const next = () => goTo((idx + 1) % reviews.length);

  return (
    <section className="bg-brand-bone band-tight">
      <div className="section-shell grid gap-8 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-14">
        <div>
          <p className="meta text-brand-sage">Customer stories</p>
          <h2 className="mt-3 h-section max-w-xl text-brand-ink">
            What homeowners are saying.
          </h2>

          <div className="mt-6 flex items-center gap-3 text-brand-forest">
            <StarRating count={5} />
            <p className="meta text-brand-forest">50+ 5-star reviews</p>
          </div>

          <a
            href="https://www.google.com/search?q=Iconic+Landscaping+Pottstown+reviews"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-forest underline-offset-4 hover:underline"
          >
            Read reviews on Google <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div
          className="min-w-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="relative overflow-hidden rounded-lg border hairline bg-brand-cream p-5 shadow-[0_18px_44px_rgba(20,26,20,0.06)] md:p-7">
            <div className="flex items-center justify-between gap-4">
              <StarRating count={r.stars} size="md" />
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous review"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border hairline bg-brand-cream text-brand-ink transition-colors hover:border-brand-forest hover:text-brand-forest"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next review"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border hairline bg-brand-cream text-brand-ink transition-colors hover:border-brand-forest hover:text-brand-forest"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-5">
              <span className="meta inline-flex rounded-full border hairline bg-brand-bone px-3 py-1 text-brand-forest">
                {r.service}
              </span>
            </div>

            <blockquote
              key={r.quote}
              className="mt-5 font-[var(--font-fraunces)] text-[clamp(1.35rem,3.4vw,2.15rem)] font-normal italic leading-[1.14] text-brand-ink transition-opacity duration-300"
            >
              &ldquo;{r.quote}&rdquo;
            </blockquote>

            <div className="mt-6 border-t hairline pt-5">
              <div>
                <p className="meta text-brand-sage">{r.author}</p>
                <p className="mt-1 text-sm font-medium text-brand-ink/62">{r.location}</p>
              </div>
            </div>

            <div className="mt-5 h-1 overflow-hidden rounded-full bg-brand-sage/20">
              <div
                className="h-full rounded-full bg-brand-forest transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-start gap-2">
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    i === idx ? "w-6 bg-brand-forest" : "w-2 bg-brand-sage/45 hover:bg-brand-sage"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
