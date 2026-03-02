"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import { GOOGLE_REVIEWS_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

type Review = {
  name: string;
  quote: string;
  initials: string;
  sourceLabel: string;
  sourceUrl: string;
};

const reviews: Review[] = [
  {
    name: "Susan Smith",
    initials: "SS",
    quote:
      "Highly recommend. Very professional and communication was great. They did an awesome job creating a new flower bed and mulching all existing beds.",
    sourceLabel: "Google Review",
    sourceUrl: GOOGLE_REVIEWS_URL
  },
  {
    name: "Chris Saitta",
    initials: "CS",
    quote:
      "After following this team on social media, we reached out for our front garden that had been overtaken by weeds. Consultation was professional and thorough.",
    sourceLabel: "Google Review",
    sourceUrl: GOOGLE_REVIEWS_URL
  },
  {
    name: "Karen Michaels",
    initials: "KM",
    quote:
      "All are HS and college kids who work very hard and kept me well informed the entire time. They do a great job and were very reasonable.",
    sourceLabel: "Google Review",
    sourceUrl: GOOGLE_REVIEWS_URL
  }
];

export function GoogleReviewsScroller() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const swipeTrackedRef = useRef(false);

  const scrollToIndex = (index: number) => {
    const target = cardRefs.current[index];
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActiveIndex(index);
  };

  const onMobileScroll = () => {
    if (!carouselRef.current) {
      return;
    }

    const containerRect = carouselRef.current.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = Math.abs(center - containerCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    if (nearestIndex !== activeIndex) {
      setActiveIndex(nearestIndex);

      if (!swipeTrackedRef.current) {
        swipeTrackedRef.current = true;
      } else {
        trackEvent("reviews_carousel_swiped", { index: nearestIndex });
      }
    }
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 xl:py-28" id="reviews">
      <div className="home-shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title lg:text-5xl">Verified Client Reviews</h2>
            <p className="section-subtitle mt-2 lg:text-xl">
              <span className="inline-flex items-center gap-1 align-middle text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current opacity-60" />
              </span>{" "}
              4.6 average across 40+ Google reviews from local homeowners.
            </p>
          </div>
        </div>

        <div className="mt-8 md:hidden">
          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Client reviews"
            onScroll={onMobileScroll}
          >
            {reviews.map((review, index) => (
              <article
                key={review.name}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="google-review-card google-review-card-mobile min-h-[220px] snap-start shrink-0"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-accent text-sm font-bold text-white">
                    {review.initials}
                  </div>
                  <Link
                    href={review.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:text-brand-accent"
                  >
                    {review.sourceLabel} <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
                <p className="text-sm italic leading-7 text-brand-dark/80">&ldquo;{review.quote}&rdquo;</p>
                <p className="mt-4 text-sm font-bold text-brand-dark">{review.name}</p>
              </article>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollToIndex((activeIndex - 1 + reviews.length) % reviews.length)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-primary/25 text-brand-primary transition-colors hover:bg-brand-light"
              aria-label="Show previous review"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((review, index) => (
                <button
                  key={`${review.name}-dot`}
                  type="button"
                  onClick={() => {
                    scrollToIndex(index);
                    trackEvent("reviews_dot_click", { index });
                  }}
                  aria-label={`Go to review ${index + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 ${
                    activeIndex === index ? "bg-brand-primary" : "bg-brand-primary/30"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollToIndex((activeIndex + 1) % reviews.length)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-primary/25 text-brand-primary transition-colors hover:bg-brand-light"
              aria-label="Show next review"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 hidden gap-4 md:grid md:grid-cols-3 lg:mt-10 lg:gap-7 xl:gap-8">
          {reviews.map((review) => (
            <article key={review.name} className="google-review-card min-h-[220px] lg:min-h-[280px] xl:min-h-[300px]">
              <div className="mb-3 flex items-center justify-between">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-accent text-sm font-bold text-white">
                  {review.initials}
                </div>
                <Link
                  href={review.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:text-brand-accent"
                >
                  {review.sourceLabel} <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
              <p className="text-sm italic leading-7 text-brand-dark/80 lg:text-base lg:leading-8">&ldquo;{review.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-bold text-brand-dark lg:text-base">{review.name}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            data-track-event="reviews_google_cta_click"
            data-track-params='{"source":"reviews_section"}'
            className="inline-flex items-center gap-2 rounded-full border border-brand-primary bg-white px-7 py-3.5 text-base font-semibold text-brand-primary hover:bg-brand-light"
          >
            Read reviews on Google <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
