import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  MapPin,
  PhoneCall,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/Button";
import { ProcessStep } from "@/components/ProcessStep";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FaqTeaser } from "@/components/FaqTeaser";
import { ServiceCard } from "@/components/ServiceCard";
import { WorkGallery } from "@/components/WorkGallery";
import { getServiceIcon } from "@/components/ServiceIcon";
import { areas } from "@/data/areas";
import { services } from "@/data/services";
import { PHONE_DISPLAY, SMS_LINK } from "@/lib/constants";
import { GREEN_BLUR_PLACEHOLDER } from "@/lib/placeholder";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Landscaping Services in Pottstown, PA",
  description:
    "Premium residential landscaping in Pottstown, PA and surrounding areas. Reliable crew, clear communication, and results you'll notice.",
  path: "/",
  ogImagePath: "/photos/home/hero.jpg"
});

const featuredServiceSlugs = new Set([
  "bed-cleanup",
  "mulching",
  "spring-cleanup"
]);

const featuredServices = services.filter((service) => featuredServiceSlugs.has(service.slug));

const serviceMeta: Record<string, string> = {
  "bed-cleanup": "Your beds cleaned, edged, and ready",
  mulching: "Installed start to finish, we handle everything",
  "spring-cleanup": "Full seasonal reset before peak growth"
};

const answerBlocks = [
  {
    question: "What services does Iconic Landscaping offer?",
    answer:
      "Iconic Landscaping offers spring cleanup, bed cleanup, mulching, planting, edging, bush trimming, brush cleanup, leaf removal, and off-site debris removal. We serve residential and commercial properties, but we do not offer mowing or tree work."
  },
  {
    question: "What areas does Iconic Landscaping serve?",
    answer:
      "We serve Pottstown, Chester Springs, Royersford, Douglassville, Spring City, Phoenixville, Collegeville, Glenmoore, Birdsboro, and surrounding areas in Montgomery, Chester, and Berks Counties."
  },
  {
    question: "How fast do you respond to quote requests?",
    answer:
      "We respond to all quote requests within 24 hours, usually the same day. For complex jobs, we schedule a property visit before sending a detailed itemized quote."
  },
  {
    question: "Do you haul away debris?",
    answer:
      "Yes. Debris can be hauled off-site to local composting partners like Arborganic Acres, where organic material is naturally composted instead of sent to a landfill."
  }
];

const trustPoints = [
  {
    label: "500+ Customers",
    icon: <CheckCircle2 className="h-5 w-5" />
  },
  {
    label: "On-Time Scheduling",
    icon: <Clock3 className="h-5 w-5" />
  },
  {
    label: "Local to Pottstown",
    icon: <MapPin className="h-5 w-5" />
  },
  {
    label: "Licensed & Insured",
    icon: <ShieldCheck className="h-5 w-5" />
  }
];

const GoogleReviewsScroller = dynamic(
  () => import("@/components/GoogleReviewsScroller").then((mod) => mod.GoogleReviewsScroller),
  { ssr: false }
);

const LeadCaptureForm = dynamic(
  () => import("@/components/LeadCaptureForm").then((mod) => mod.LeadCaptureForm),
  {
    ssr: false,
    loading: () => (
      <div className="mt-6 h-72 animate-pulse rounded-2xl border border-brand-primary/15 bg-brand-light/30" />
    )
  }
);

const StickyQuoteBar = dynamic(
  () => import("@/components/StickyQuoteBar").then((mod) => mod.StickyQuoteBar),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      <SchemaMarkup
        type="review"
        payload={{
          author: { "@type": "Person", name: "Susan Smith" },
          reviewRating: { "@type": "Rating", ratingValue: "5" },
          reviewBody:
            "Highly recommend. Very professional and communication was great. They did an awesome job creating a new flower bed and mulching all existing beds."
        }}
      />

      <div className="pb-[86px] lg:pb-0">
        <section className="relative overflow-hidden bg-brand-dark text-white lg:min-h-[620px] xl:min-h-[700px]">
        <Image
          src="/photos/home/hero.jpg"
          alt="Clean landscaped property in Pottstown"
          fill
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={GREEN_BLUR_PLACEHOLDER}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,30,10,0.88)] via-[rgba(10,30,10,0.62)] to-[rgba(10,30,10,0.28)]" />
        <div className="relative home-shell py-10 md:py-16 lg:flex lg:min-h-[620px] lg:items-center lg:py-24 xl:min-h-[700px] xl:py-28">
          <div className="grid items-start gap-10 md:gap-12 lg:w-full lg:grid-cols-[minmax(0,1fr)_minmax(520px,640px)] lg:items-center lg:gap-14 xl:gap-20">
            <div className="order-1">
              <p className="inline-block rounded-full border border-white/25 px-3 py-1 text-[0.7rem] uppercase tracking-[0.12em] text-white/80">
                📍 Pottstown, PA
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,7vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.02em] lg:max-w-none lg:text-[clamp(3.9rem,5.8vw,7.25rem)]">
                Make Your Property Iconic.
              </h1>
              <p className="mt-6 max-w-xl text-[1.03rem] leading-[1.55] text-white/78 md:text-[1.1rem] lg:max-w-[62ch] lg:text-[1.35rem]">
                Premium residential landscaping in Pottstown and surrounding areas. Reliable crew, clear communication, results you&apos;ll notice.
              </p>
            </div>

            <aside className="order-2 w-full max-w-[520px] justify-self-end rounded-2xl border border-brand-primary/20 border-t-4 border-t-brand-primary bg-white/95 p-5 text-brand-dark shadow-card backdrop-blur-md md:p-6 lg:max-w-[640px] lg:p-9 xl:p-10">
              <h2 className="font-display text-[1.3rem] font-extrabold leading-tight md:text-[1.45rem] lg:text-[1.78rem]">Get Your Free Quote</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-brand-dark/85 lg:space-y-3 lg:text-base">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand-primary" />
                  Response within 24 hours
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand-primary" />
                  Clear itemized quotes
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand-primary" />
                  Licensed, insured, electric-equipment crew
                </li>
              </ul>
              <Button
                href="#quote"
                ariaLabel="Start free quote"
                className="mt-4 w-full"
                trackEventName="cta_quote_click"
                trackEventParams={{ source: "home_hero_quote_card" }}
              >
                Start Free Quote
              </Button>
              <a
                href={SMS_LINK}
                className="mt-2 inline-flex w-full items-center justify-center gap-1.5 text-xs font-semibold text-brand-dark/60 underline-offset-4 hover:text-brand-primary hover:underline lg:text-sm"
                aria-label="Text us"
                data-track-event="click_to_text"
                data-track-params='{"source":"home_hero"}'
              >
                <PhoneCall className="h-4 w-4" /> Text {PHONE_DISPLAY}
              </a>
            </aside>
          </div>
        </div>
      </section>

        <GoogleReviewsScroller />
        <WorkGallery />

        <section className="home-shell py-8 md:py-12 lg:py-16 xl:py-20">
          <div className="rounded-2xl border border-brand-primary/15 bg-[#faf8f3] p-5 shadow-card md:p-7 lg:p-9">
            <h2 className="font-display text-2xl font-extrabold text-brand-dark md:text-3xl lg:text-4xl">
              Why Homeowners Choose Iconic
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 md:mt-6 md:gap-4">
              {trustPoints.map((point) => (
                <article key={point.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                  <div className="inline-flex items-center justify-center rounded-full bg-[#ebf5ec] p-2 text-brand-primary">
                    {point.icon}
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-snug text-brand-dark md:text-base">{point.label}</p>
                </article>
              ))}
            </div>
            <p className="mt-4 text-sm text-brand-dark/70 md:text-base">
              Reliable communication. Clean work. Final walkthrough before we leave.
            </p>
          </div>
        </section>

        <section className="home-shell py-16 md:py-20 lg:py-24 xl:py-28">
        <h2 className="section-title lg:text-5xl">Most Requested Services</h2>
        <p className="section-subtitle lg:text-xl">
          Start with our most requested services, then we customize scope to your property.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 lg:mt-12 lg:gap-7">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.slug}
              title={service.name}
              description={service.shortDescription}
              href={`/services/${service.slug}`}
              icon={getServiceIcon(service.slug)}
              ctaLabel="Get a Quote for This"
              meta={serviceMeta[service.slug]}
            />
          ))}
        </div>
        <Link
          href="/services"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-white px-5 py-3 text-sm font-semibold text-brand-primary hover:border-brand-primary lg:text-base"
        >
          View All Services <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

        <section id="how-it-works" className="home-shell py-12 md:py-14 lg:py-20 xl:py-24">
        <h2 className="section-title lg:text-5xl">How It Works</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center lg:gap-6 xl:gap-8">
          <ProcessStep
            step={1}
            title="Start a Quote"
            description="Fill out our quick form or text us directly to start a quote."
            icon={<ClipboardCheck className="h-6 w-6" />}
          />
          <span className="hidden text-3xl font-bold text-brand-accent md:inline-flex md:justify-center lg:text-4xl">→</span>
          <ProcessStep
            step={2}
            title="We Walk the Property"
            description="We review your property details and send a clear itemized quote - usually same day. For larger jobs or complex scopes, we'll schedule an in-person walkthrough to confirm pricing."
            icon={<MapPin className="h-6 w-6" />}
          />
          <span className="hidden text-3xl font-bold text-brand-accent md:inline-flex md:justify-center lg:text-4xl">→</span>
          <ProcessStep
            step={3}
            title="We Get to Work"
            description="Once approved, we schedule the job. Before any work starts we walk the full property with you to confirm scope and expectations. We finish the same way - a final walkthrough before we leave."
            icon={<CheckCircle2 className="h-6 w-6" />}
          />
        </div>
        <Button
          href="#quote"
          ariaLabel="Start with step one"
          className="mt-8 lg:mt-10"
          trackEventName="cta_quote_click"
          trackEventParams={{ source: "home_how_it_works" }}
        >
          Start with Step 1
        </Button>
      </section>

        <section className="home-shell py-10 md:py-12 lg:py-16 xl:py-20">
        <h2 className="section-title lg:text-5xl">Serving the Greater Pottstown Area</h2>
        <p className="section-subtitle lg:text-xl">Explore the towns where our crew already has real local work, reviews, and repeat clients.</p>
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="rounded-2xl border border-brand-primary/15 bg-white p-4 shadow-soft transition-colors hover:border-brand-primary"
            >
              <span className="block font-semibold text-brand-primary">{area.name}, {area.region}</span>
              <span className="mt-1 block text-xs uppercase tracking-[0.08em] text-brand-dark/55">
                {area.tier === "primary" ? "Core service area" : "Larger jobs prioritized"}
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-brand-dark/70 lg:text-base">Not on the list? Text us - we may still be able to help.</p>
        <Link
          href="/service-area"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-accent lg:text-base"
        >
          Check if we serve your area <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

        <section className="home-shell py-12 md:py-16 lg:py-20">
        <h2 className="section-title lg:text-5xl">Quick Answers</h2>
        <p className="section-subtitle lg:text-xl">Clear answers before you request a quote.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {answerBlocks.map((item) => (
            <article key={item.question} className="rounded-2xl border border-brand-primary/12 bg-white p-5 shadow-soft md:p-6">
              <h3 className="text-lg font-bold text-brand-dark">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-dark/75 md:text-base">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

        <section className="home-shell py-16 md:py-20 lg:py-24 xl:py-28">
        <div
          id="quote"
          className="mx-auto max-w-4xl rounded-2xl border border-brand-primary/15 border-t-4 border-t-brand-primary bg-white p-5 shadow-card md:p-7 lg:max-w-7xl lg:p-10 xl:p-12"
        >
          <p className="inline-flex rounded-full border border-brand-primary/20 bg-brand-light px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-brand-primary/80">
            Fast response. No spam.
          </p>
          <h2 className="mt-4 font-display text-[1.6rem] font-extrabold leading-tight text-brand-dark md:text-[1.9rem] lg:text-[2.2rem] xl:text-[2.45rem]">
            Start Your Free Quote
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-dark/75 md:text-base lg:text-lg">
            Quick form now, real follow-up from our local team. We typically respond within 24 hours.
          </p>
          <ul className="mt-5 space-y-2.5 text-sm text-brand-dark/85 lg:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand-primary" />
              Local team serving Greater Pottstown
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand-primary" />
              Detailed scope and transparent pricing
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand-primary" />
              Most quote requests get a response within 24 hours
            </li>
          </ul>
          <LeadCaptureForm source="home_quote_section" variant="compact" className="mt-6 lg:mt-8" />
        </div>
      </section>

        <section className="home-shell py-4 md:py-8 lg:py-10">
        <FaqTeaser />
      </section>

        <section className="relative overflow-hidden bg-brand-primary py-20 text-white lg:py-24 xl:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="home-shell relative text-center">
          <h2 className="font-display text-3xl font-extrabold md:text-5xl lg:text-6xl">Make Your Property Iconic.</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85 lg:text-xl">Fast response. Clear pricing. Local team.</p>
          <Button
            href="#quote"
            ariaLabel="Open quote form"
            className="mt-8 min-h-[52px] border-[#1C4A1E] bg-[#1C4A1E] px-9 text-base font-bold text-white hover:border-[#163a18] hover:bg-[#163a18] lg:min-h-[58px] lg:text-lg"
            trackEventName="cta_quote_click"
            trackEventParams={{ source: "home_final_cta" }}
          >
            Get My Free Quote
          </Button>
          <a
            href={SMS_LINK}
            className="mt-4 inline-flex text-sm font-semibold text-white/90 underline-offset-2 hover:underline lg:text-base"
            aria-label="Text Iconic Landscaping"
            data-track-event="click_to_text"
            data-track-params='{"source":"home_final_cta"}'
          >
            Or text {PHONE_DISPLAY}
          </a>
        </div>
        </section>
      </div>

      <StickyQuoteBar />
    </>
  );
}
