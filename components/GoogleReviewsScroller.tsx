import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { GOOGLE_REVIEWS_URL } from "@/lib/constants";

type Review = {
  name: string;
  quote: string;
  initials: string;
  sourceLabel: string;
  sourceUrl: string;
};

const reviews: Review[] = [
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
  },
  {
    name: "Susan Smith",
    initials: "SS",
    quote:
      "Highly recommend. Very professional and communication was great. They did an awesome job creating a new flower bed and mulching all existing beds.",
    sourceLabel: "Google Review",
    sourceUrl: GOOGLE_REVIEWS_URL
  }
];

export function GoogleReviewsScroller() {
  return (
    <section className="py-16 md:py-20" id="reviews">
      <div className="section-shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Verified Client Reviews</h2>
            <p className="section-subtitle mt-2">
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

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.name} className="google-review-card min-h-[220px]">
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

        <div className="mt-8 flex justify-center">
          <Link
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-brand-primary bg-white px-7 py-3.5 text-base font-semibold text-brand-primary hover:bg-brand-light"
          >
            Read reviews on Google <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
