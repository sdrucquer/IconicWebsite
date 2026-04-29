import { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { ServiceAreaMap, ServiceAreaTownList } from "@/components/ServiceAreaMap";
import { SMS_LINK, PHONE_DISPLAY } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Service Area | Iconic Landscaping",
  description:
    "Iconic Landscaping serves homeowners across Montgomery, Chester, and Berks Counties in PA. See if we serve your town, and if you do not see it, text us.",
  path: "/service-area",
  ogImagePath: "/photos/property-finish.jpg"
});

const heroStats = [
  { value: "12", label: "Towns Served" },
  { value: "3", label: "Counties" },
  { value: "500+", label: "Yards Worked" },
  { value: "< 24hr", label: "Response Time" }
];

const reviews = [
  {
    quote:
      "Their communication via text was prompt, and when we needed an additional day the estimate remained unchanged.",
    name: "Chris S.",
    location: "Glenmoore",
    county: "Chester County"
  },
  {
    quote: "These young men did a wonderful job on our yard. Will come back sometime in the near future.",
    name: "Renee D.",
    location: "Birdsboro",
    county: "Berks County"
  },
  {
    quote:
      "Polite, respectful, and went above and beyond what I expected. I would recommend Iconic to anyone in the area.",
    name: "Wendy H.",
    location: "Royersford",
    county: "Montgomery County"
  }
];

const faqs = [
  {
    question: "Do you charge more for towns farther from your base?",
    answer:
      "No. Every primary town on our list gets the same itemized pricing based on the work, not where you live. Pricing depends on property size, scope, and add-ons."
  },
  {
    question: "My town is not on your list. Can you still help?",
    answer:
      "Probably yes. The list shows where we regularly work, but we serve plenty of homeowners outside it. Text us your address and we will let you know quickly whether we can take it on."
  },
  {
    question: "How quickly can you get out for a quote?",
    answer:
      "Most quote requests get a response within 24 hours, and often the same day. Scheduling depends on the season and the size of the job."
  },
  {
    question: "Do you ever turn jobs away?",
    answer:
      "Occasionally, usually when we are at peak spring capacity or when a job is far enough that it does not make sense for either of us. We will always tell you straight."
  }
];

export default function ServiceAreaPage() {
  return (
    <>
      <SchemaMarkup
        type="breadcrumbList"
        payload={{
          items: [
            { name: "Home", path: "/" },
            { name: "Service Area", path: "/service-area" }
          ]
        }}
      />

      <section className="relative overflow-hidden bg-[#1B3A2A] text-brand-cream">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(20,44,32,0.2),transparent_45%),linear-gradient(315deg,rgba(184,146,61,0.08),transparent_55%)]" />
        <svg
          className="pointer-events-none absolute -right-32 -top-32 h-[48rem] w-[48rem] text-brand-cream/10"
          viewBox="0 0 800 800"
          aria-hidden="true"
        >
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1">
            <path d="M100 200 Q300 150 500 220 T800 180" />
            <path d="M80 280 Q280 230 480 300 T800 260" />
            <path d="M60 360 Q260 310 460 380 T800 340" />
            <path d="M40 440 Q240 390 440 460 T800 420" />
            <path d="M20 520 Q220 470 420 540 T800 500" />
            <path d="M0 600 Q200 550 400 620 T800 580" />
          </g>
        </svg>
        <div className="section-shell relative py-20 md:py-24 lg:py-32">
          <p className="meta flex items-center gap-3 text-brand-sage before:h-px before:w-8 before:bg-brand-sage">
            Where We Work
          </p>
          <h1 className="mt-7 max-w-5xl font-display text-[clamp(3.25rem,9vw,6.75rem)] font-normal leading-[0.95] tracking-[-0.03em] text-brand-cream">
            Across the <em className="font-light text-brand-sage">region.</em>
            <br />
            In your{" "}
            <span className="inline-block -rotate-2 font-[var(--font-caveat)] text-[0.86em] font-semibold text-brand-gold">
              neighborhood.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl font-display text-[1.2rem] leading-[1.55] text-brand-cream/82 md:text-[1.45rem]">
            We serve homeowners across Montgomery, Chester, and Berks Counties: twelve towns we work in regularly, plus everywhere in between. If you&apos;re nearby, we probably already know your block.
          </p>
          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-7 border-t border-brand-cream/15 pt-9 md:gap-x-16">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl font-normal tracking-[-0.02em] text-brand-cream md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-cream/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-bone py-24 md:py-32">
        <div className="section-shell max-w-7xl">
          <ServiceAreaMap />
        </div>
      </section>

      <section className="bg-brand-cream py-24 md:py-32">
        <div className="section-shell max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="meta text-brand-forest">The Full List</p>
            <h2 className="mt-5 font-display text-[clamp(2.35rem,5vw,3.8rem)] font-normal leading-[1.08] tracking-[-0.02em] text-brand-ink">
              Where we <em className="text-brand-forest">regularly work.</em>
            </h2>
            <p className="mt-5 font-display text-lg leading-[1.6] text-brand-ink/72">
              Every town here gets full service: spring cleanups, mulching, bed work, trimming, the whole list. No tiers, no preferred zones.
            </p>
          </div>
          <div className="mt-16">
            <ServiceAreaTownList />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-bone py-24 md:py-32">
        <div className="section-shell relative grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.8fr] lg:items-center lg:gap-20">
          <div>
            <p className="-rotate-2 font-[var(--font-caveat)] text-3xl font-semibold text-brand-gold">a small note</p>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.7rem,6vw,5rem)] font-normal leading-[1] tracking-[-0.03em] text-brand-ink">
              Not on the list? <em className="text-brand-forest">You probably still are.</em>
            </h2>
            <p className="mt-7 max-w-xl font-display text-xl leading-[1.65] text-brand-ink/72">
              The towns above are where we work the most, but our region is bigger than any list. We serve homeowners outside these names every week.{" "}
              <strong className="font-semibold text-brand-ink">If you&apos;re nearby, send us your address and we&apos;ll let you know quickly.</strong>
            </p>
            <a
              href={SMS_LINK}
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-brand-forest px-7 py-4 text-sm font-semibold text-brand-cream transition hover:bg-brand-moss"
            >
              <MessageCircle className="h-5 w-5" /> Text Us Your Address
            </a>
            <p className="mt-4 text-sm text-brand-ink/45">{PHONE_DISPLAY} - usually responds within the hour</p>
          </div>

          <figure className="relative mx-auto w-full max-w-sm rotate-2 bg-white p-4 pb-16 shadow-[0_8px_18px_rgba(20,26,20,0.08),0_28px_70px_rgba(20,26,20,0.16)] transition-transform duration-300 hover:rotate-0">
            <span className="absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 -rotate-3 bg-brand-forest/20 shadow-sm" />
            <div className="flex aspect-[3/4] flex-col gap-4 rounded-lg bg-brand-cream p-6">
              <div className="max-w-[82%] self-start rounded-[1.15rem] rounded-bl-md bg-brand-bone px-4 py-3 text-sm leading-snug text-brand-ink">
                Hey, do y&apos;all serve my town?
              </div>
              <div className="max-w-[82%] self-end rounded-[1.15rem] rounded-br-md bg-brand-forest px-4 py-3 text-sm leading-snug text-brand-cream">
                Yep, we work nearby all the time. Send your address and we&apos;ll get you a quote.
              </div>
              <div className="max-w-[82%] self-start rounded-[1.15rem] rounded-bl-md bg-brand-bone px-4 py-3 text-sm leading-snug text-brand-ink">
                Awesome, thanks.
              </div>
            </div>
            <figcaption className="absolute inset-x-0 bottom-4 text-center font-[var(--font-caveat)] text-2xl font-semibold text-brand-ink/70">
              how it usually goes
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-brand-cream py-24 md:py-32">
        <div className="section-shell max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="meta text-brand-forest">Voices From the Region</p>
            <h2 className="mt-5 font-display text-[clamp(2.35rem,5vw,3.8rem)] font-normal leading-[1.08] tracking-[-0.02em] text-brand-ink">
              Real customers, <em className="text-brand-forest">across the map.</em>
            </h2>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="flex flex-col border border-brand-sage/25 bg-brand-bone p-7 md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">5-star review</p>
                <blockquote className="mt-5 grow font-display text-xl italic leading-[1.55] text-brand-ink">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <div className="mt-8 border-t border-brand-sage/30 pt-5">
                  <p className="font-display text-lg font-medium text-brand-ink">{review.name}</p>
                  <p className="mt-1 text-sm text-brand-ink/48">
                    <strong className="font-semibold text-brand-forest">{review.location}</strong> - {review.county}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-bone py-24 md:py-32">
        <div className="section-shell max-w-4xl">
          <div className="text-center">
            <p className="meta text-brand-forest">A Few Questions</p>
            <h2 className="mt-5 font-display text-[clamp(2.35rem,5vw,3.8rem)] font-normal leading-[1.08] tracking-[-0.02em] text-brand-ink">
              The usual <em className="text-brand-forest">asks.</em>
            </h2>
          </div>
          <div className="mt-14 divide-y divide-brand-sage/35 border-y border-brand-sage/35">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="group" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-7 font-display text-xl font-medium tracking-[-0.005em] text-brand-ink marker:hidden transition hover:text-brand-forest [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="text-3xl font-light text-brand-forest transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pb-7 text-base leading-[1.7] text-brand-ink/72">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="relative overflow-hidden bg-[#0D2E20] py-24 text-center text-brand-cream md:py-32">
        <Image
          src="/photos/home/after/after-2.jpg"
          alt="Finished landscaping by Iconic Landscaping"
          fill
          className="object-cover opacity-30 brightness-[0.52] saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-[#0D2E20]/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D2E20]/70 via-[#0D2E20]/35 to-[#0D2E20]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.42)] via-[rgba(0,0,0,0.18)] to-[rgba(0,0,0,0.58)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.008)_36%,rgba(0,0,0,0.0)_60%)]" />
        <div className="section-shell relative max-w-5xl lg:flex lg:justify-end">
          <div className="mx-auto max-w-4xl lg:mx-0 lg:w-[68%]">
            <p className="inline-block -rotate-2 font-[var(--font-caveat)] text-[2.1rem] font-medium leading-none text-brand-sage/95 md:text-[2.35rem]">
              in our region?
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.7rem,6vw,5rem)] font-normal leading-[1.03] tracking-[-0.025em] text-brand-cream">
              Let&apos;s <em className="text-brand-sage">take a look.</em>
            </h2>
            <p className="mx-auto mt-7 max-w-2xl font-display text-xl leading-[1.55] text-brand-cream/82">
              Free quote, usually back the same day. We&apos;ll be straight with you about whether your address makes sense for us.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="/contact#quote"
                aria-label="Get a free quote from Iconic Landscaping"
                className="inline-flex items-center justify-center rounded-full border border-brand-cream bg-brand-cream px-8 py-4 text-sm font-semibold text-brand-forest transition-colors hover:border-brand-tan hover:bg-brand-tan"
              >
                Get a Free Quote
              </a>
              <a
                href={SMS_LINK}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-cream/45 px-8 py-4 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-cream/10"
              >
                Text {PHONE_DISPLAY} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
