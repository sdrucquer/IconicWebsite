import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { GOOGLE_REVIEWS_URL } from "@/lib/constants";

type Review = {
  name: string;
  quote: string;
  initials: string;
  avatarSrc?: string;
};

const reviews: Review[] = [
  {
    name: "Chris Saitta",
    initials: "CS",
    quote:
      "After following this team on social media, we reached out for our front garden that had been overtaken by weeds. Consultation was professional and thorough."
  },
  {
    name: "Karen Michaels",
    initials: "KM",
    quote:
      "All are HS and college kids who work very hard and kept me well informed the entire time. They do a great job and were very reasonable."
  },
  {
    name: "Susan Smith",
    initials: "SS",
    quote:
      "Highly recommend. Very professional and communication was great. They did an awesome job creating a new flower bed and mulching all existing beds."
  },
  {
    name: "Local Homeowner",
    initials: "LH",
    quote:
      "Crew was on time, polite, and detailed. The edging and mulch transformed the front of our home in one day."
  },
  {
    name: "Alyssa M.",
    initials: "AM",
    quote:
      "Communication was excellent from quote to completion. The beds looked brand new and the whole property felt more polished."
  },
  {
    name: "Mike R.",
    initials: "MR",
    quote:
      "They showed up on schedule, worked hard, and left everything clean. Pricing was straightforward and fair."
  },
  {
    name: "Jen T.",
    initials: "JT",
    quote:
      "Our spring cleanup was night-and-day better. Super respectful crew and clear updates all the way through."
  },
  {
    name: "Pat W.",
    initials: "PW",
    quote:
      "Fast response, detailed walk-through, and no surprises. Exactly the kind of local team we wanted to hire."
  }
];

export function GoogleReviewsScroller() {
  const rotatingReviews = [...reviews, ...reviews];

  return (
    <section className="py-16 md:py-20" id="reviews">
      <div className="section-shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle mt-2">
              4.6 stars across 40+ reviews from homeowners in and around Pottstown.
            </p>
          </div>
        </div>

        <div className="google-marquee mt-8" aria-label="Scrolling customer reviews">
          <div className="google-marquee-track">
            {rotatingReviews.map((review, index) => (
              <article
                key={`${review.name}-${index}`}
                className="google-review-card min-h-[220px] min-w-[300px] md:min-w-[360px] xl:min-w-[420px]"
              >
                <div className="mb-3 flex items-center justify-between">
                  {review.avatarSrc ? (
                    <div className="relative h-11 w-11 overflow-hidden rounded-full">
                      <Image src={review.avatarSrc} alt={`${review.name} profile`} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-accent text-sm font-bold text-white">
                      {review.initials}
                    </div>
                  )}
                  <div className="flex items-center gap-0.5 text-amber-400" aria-label="5 star review">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </div>
                <p className="line-clamp-4 text-sm italic leading-7 text-brand-dark/80">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <p className="mt-4 text-sm font-bold text-brand-dark">{review.name}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-brand-primary bg-white px-7 py-3.5 text-base font-semibold text-brand-primary hover:bg-brand-light"
          >
            Read 40+ reviews on Google <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
