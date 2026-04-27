"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

type Review = {
  quote: string;
  author: string;
  location: string;
  stars: number;
};

const reviews: Review[] = [
  {
    quote:
      "I was very impressed with response times, scheduling and updates. The crew was polite, respectful and went above and beyond my expectations.",
    author: "Wendy Hanna",
    location: "Royersford",
    stars: 5
  },
  {
    quote:
      "They were communicative, hardworking, and great. You can tell they care about what they\u2019re doing and that they are doing work that they are proud of.",
    author: "Amanda Yoder",
    location: "Spring City",
    stars: 5
  },
  {
    quote:
      "Iconic did a wonderful job with our spring clean up and mulching. They were professional, dependable and hardworking.",
    author: "Zoe Baker",
    location: "Pottstown",
    stars: 5
  },
  {
    quote:
      "These guys were on point! They arrived early, had everything they needed, asked questions about what exactly we wanted and made our lives 100 times easier.",
    author: "Philip Brady",
    location: "Chester Springs",
    stars: 5
  }
];

export function TestimonialsCarousel() {
  const [idx, setIdx] = useState(0);
  const r = reviews[idx];

  const prev = () => setIdx((idx - 1 + reviews.length) % reviews.length);
  const next = () => setIdx((idx + 1) % reviews.length);

  return (
    <section className="bg-brand-bone band-tight">
      <div className="section-shell">
        <p className="meta text-brand-sage">Customer stories</p>
        <h2 className="mt-3 h-section max-w-xl text-brand-ink">
          What homeowners are saying.
        </h2>

        <div className="mt-10">
          {/* Quote card */}
          <div className="rounded-xl border hairline bg-brand-cream p-6 md:p-8 lg:p-10">
            <div className="flex gap-0.5 text-brand-gold">
              {Array.from({ length: r.stars }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="pull mt-5 text-brand-ink">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <p className="meta mt-6 text-brand-sage">
              {r.author} &mdash; {r.location}
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-5 flex items-center justify-between">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className="h-2 rounded-full transition-all duration-200"
                  style={{ width: i === idx ? "22px" : "8px", backgroundColor: i === idx ? "var(--tw-forest, #1F4A22)" : "rgba(143,169,140,0.45)" }}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-2">
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
        </div>
      </div>
    </section>
  );
}
