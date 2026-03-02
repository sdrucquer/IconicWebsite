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
  MessageSquare,
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
import { allServiceAreas, services } from "@/data/services";
import { PHONE_DISPLAY, SMS_LINK } from "@/lib/constants";
import { GREEN_BLUR_PLACEHOLDER } from "@/lib/placeholder";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Landscaping Services in Pottstown, PA",
  description:
    "Get a fast, no-pressure landscaping quote from Iconic Landscaping. Serving Pottstown, PA and surrounding areas with premium local service.",
  path: "/",
  ogImagePath: "/photos/mowing.jpg"
});

const trustStrip = [
  { title: "4.6 Google Rating", detail: "40+ verified reviews" },
  { title: "500+ Customers", detail: "500+ in Greater Pottstown." },
  { title: "Licensed & Insured", detail: "Covered on every property" },
  { title: "Local Team", detail: "Student-run in Pottstown since 2023" }
];

const featuredServiceSlugs = new Set([
  "bed-cleanup",
  "mulching",
  "spring-cleanup"
]);

const featuredServices = services.filter((service) => featuredServiceSlugs.has(service.slug));

const serviceMeta: Record<string, string> = {
  "bed-cleanup": "Your beds cleared, edged, and ready",
  mulching: "Installed start to finish, we handle everything",
  "spring-cleanup": "Full seasonal reset before peak growth"
};

const pillars = [
  {
    title: "We Show Up (On Time)",
    copy: "Reliable scheduling windows with a crew that respects your day.",
    stat: "500+ Customers",
    icon: <Clock3 className="h-5 w-5" />
  },
  {
    title: "You'll Always Know What's Happening",
    copy: "Clear updates before, during, and after every job.",
    stat: "Same-day responses",
    icon: <MessageSquare className="h-5 w-5" />
  },
  {
    title: "We're Local - You've Seen Our Crew",
    copy: "Pottstown-born team committed to nearby neighborhoods.",
    stat: "Est. 2023 in Pottstown",
    icon: <MapPin className="h-5 w-5" />
  },
  {
    title: "Licensed & Insured on Every Job",
    copy: "Professional coverage and process on every property.",
    stat: "Covered every visit",
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
          src="/photos/mowing.jpg"
          alt="Clean landscaped property in Pottstown"
          fill
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={GREEN_BLUR_PLACEHOLDER}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,30,10,0.88)] via-[rgba(10,30,10,0.62)] to-[rgba(10,30,10,0.28)]" />
        <div className="relative home-shell py-8 md:py-14 lg:flex lg:min-h-[620px] lg:items-center lg:py-24 xl:min-h-[700px] xl:py-28">
          <div className="grid items-start gap-6 lg:w-full lg:grid-cols-[minmax(0,1fr)_minmax(520px,640px)] lg:items-center lg:gap-14 xl:gap-20">
            <div className="order-1">
              <p className="inline-block rounded-full border border-white/25 px-3 py-1 text-[0.7rem] uppercase tracking-[0.12em] text-white/80">
                📍 Pottstown, PA
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,7vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.02em] lg:max-w-none lg:text-[clamp(3.9rem,5.8vw,7.25rem)]">
                Make Your Property Iconic.
              </h1>
              <p className="mt-4 max-w-xl text-[1.15rem] leading-relaxed text-white/78 lg:max-w-[62ch] lg:text-[1.4rem]">
                Premium landscaping from a local Pottstown crew that communicates clearly and executes clean.
              </p>
            </div>

            <aside className="order-2 w-full max-w-[520px] justify-self-end rounded-2xl border border-brand-primary/20 border-t-4 border-t-brand-primary bg-white/95 p-5 text-brand-dark shadow-card backdrop-blur-md md:p-6 lg:max-w-[640px] lg:p-9 xl:p-10">
              <h2 className="font-display text-[1.3rem] font-extrabold leading-tight md:text-[1.45rem] lg:text-[1.78rem]">Get Your Free Quote</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-brand-dark/85 lg:space-y-3 lg:text-base">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand-primary" />
                  Fast quote response and scheduling clarity
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand-primary" />
                  Clear pricing and scope before work begins
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand-primary" />
                  Local, licensed, and insured crew
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
                className="mt-3 inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-brand-dark/70 hover:text-brand-primary lg:text-base"
                aria-label="Text us"
                data-track-event="click_to_text"
                data-track-params='{"source":"home_hero"}'
              >
                <PhoneCall className="h-4 w-4" /> Text {PHONE_DISPLAY}
              </a>
            </aside>
          </div>
          <p className="mt-4 text-center text-xs font-semibold text-white/75 lg:hidden">Scroll down to start your quote ↓</p>
        </div>
      </section>

        <section className="bg-[#111810] text-white">
        <div className="home-shell">
          <div className="grid grid-cols-2 gap-2 py-2 md:grid-cols-4 md:gap-0 md:py-0 lg:py-2 xl:py-3">
            {trustStrip.map((item, index) => (
              <article
                key={item.title}
                className={`rounded-md px-3 py-2 md:rounded-none md:px-5 md:py-5 lg:px-9 lg:py-8 xl:px-10 ${index < trustStrip.length - 1 ? "md:border-r md:border-white/15" : ""}`}
              >
                <p className={`text-sm font-semibold lg:text-[1.05rem] xl:text-[1.12rem] ${index === 0 ? "text-brand-accent" : "text-white"}`}>
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-white/72 lg:text-[0.98rem]">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

        <section className="home-shell py-10 md:py-14 lg:py-20 xl:py-24">
        <div className="rounded-2xl border border-brand-primary/15 bg-[#faf8f3] p-5 shadow-card md:p-7 lg:p-10 xl:p-12">
          <h2 className="font-display text-2xl font-extrabold text-brand-dark md:text-3xl lg:text-4xl xl:text-[2.6rem]">Why homeowners choose Iconic</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6 xl:grid-cols-4 xl:gap-7">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:p-6 lg:p-7"
              >
                <div className="mb-3 inline-flex items-center justify-center rounded-full bg-[#ebf5ec] p-2.5 text-brand-primary lg:p-3">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-bold text-brand-dark lg:text-lg">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-dark/75 lg:text-base">{pillar.copy}</p>
                <p className="mt-3 text-sm font-bold text-brand-primary lg:text-base">{pillar.stat}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

        <GoogleReviewsScroller />
        <WorkGallery />

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
        <p className="section-subtitle lg:text-xl">We actively serve all areas listed below.</p>
        <div className="mt-8 flex flex-wrap gap-2 lg:mt-10 lg:gap-3">
          {allServiceAreas.map((area) => (
            <span
              key={area}
              className="rounded-full border border-brand-primary/25 bg-white px-4 py-2 text-sm font-semibold text-brand-primary lg:text-base"
            >
              {area}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-brand-dark/70 lg:text-base">Not on the list? Text us - we may still be able to help.</p>
        <Link
          href="/service-area"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-accent lg:text-base"
        >
          Check if we serve your area <ArrowRight className="h-4 w-4" />
        </Link>
        <div className="mt-5 flex flex-wrap gap-2 text-sm lg:text-base">
          <Link href="/areas/pottstown" className="font-semibold text-brand-primary hover:text-brand-accent">
            Pottstown landscaping
          </Link>
          <Link href="/areas/royersford" className="font-semibold text-brand-primary hover:text-brand-accent">
            Royersford landscaping
          </Link>
          <Link href="/areas/spring-city" className="font-semibold text-brand-primary hover:text-brand-accent">
            Spring City landscaping
          </Link>
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
