import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { ArrowRight, Leaf, Shovel, Sprout } from "lucide-react";
import { Button } from "@/components/Button";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCompactCard } from "@/components/ServiceCompactCard";
import { ProcessList } from "@/components/ProcessList";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { AfterGallery } from "@/components/AfterGallery";
import { areas } from "@/data/areas";
import { PHONE_DISPLAY, SMS_LINK } from "@/lib/constants";
import { GREEN_BLUR_PLACEHOLDER } from "@/lib/placeholder";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Landscaping in Pottstown, PA",
  description:
    "Mulch, beds, cleanups, and seasonal care for homes around Pottstown. Local crew. Clean work. Fast quotes.",
  path: "/",
  ogImagePath: "/photos/home/hero.jpg"
});

const compactServices = [
  {
    name: "Spring Cleanup",
    desc: "Full-property reset after winter. Debris, leaves, the works.",
    image: "/photos/home/after/after-2.jpg",
    icon: <Sprout className="h-5 w-5" />,
    href: "/services/spring-cleanup"
  },
  {
    name: "Bed Cleanup",
    desc: "Edged, weeded, and reset — every bed looks fresh.",
    image: "/photos/home/bed-cleanup.jpg",
    icon: <Shovel className="h-5 w-5" />,
    href: "/services/bed-cleanup"
  },
  {
    name: "Mulching",
    desc: "Premium hardwood mulch laid by hand with crisp, clean edges.",
    image: "/photos/home/after/after-3.jpg",
    icon: <Leaf className="h-5 w-5" />,
    href: "/services/mulching"
  }
];

const processSteps = [
  {
    duration: "Fast response",
    title: "Clarity right away",
    body: "Tell us what you need. We respond within 24 hours so you know next steps fast."
  },
  {
    duration: "Flexible quoting",
    title: "Clear, customizable pricing",
    body: "Itemized quotes you can adjust. Most done online, with free on-site visits if needed."
  },
  {
    duration: "Day of",
    title: "A clean, finished result",
    body: "We complete the work, walk it with you, and make sure everything is done right before we leave."
  }
];

const galleryItems = [
  { src: "/photos/home/after/after-1.jpg", alt: "Finished mulch and edged beds", caption: "Mulching, Pottstown" },
  { src: "/photos/home/after/after-2.jpg", alt: "Bed cleanup finish", caption: "Bed Cleanup, Chester Springs" },
  { src: "/photos/home/after/after-3.jpg", alt: "Spring cleanup result", caption: "Spring Cleanup, Royersford" },
  { src: "/photos/services/mulching/after.jpg", alt: "Premium hardwood mulch installed", caption: "Mulching, Douglassville" },
  { src: "/photos/services/bed-cleanup/after.jpg", alt: "Bed cleanup with crisp edge", caption: "Bed Cleanup, Spring City" },
  { src: "/photos/services/spring-cleanup/after.jpg", alt: "Spring cleanup full property", caption: "Spring Cleanup, Phoenixville" }
];

const QuickQuoteForm = dynamic(
  () => import("@/components/QuickQuoteForm").then((m) => m.QuickQuoteForm),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      <SchemaMarkup
        type="review"
        payload={{
          author: { "@type": "Person", name: "Wendy Hanna" },
          reviewRating: { "@type": "Rating", ratingValue: "5" },
          reviewBody:
            "I was very impressed with response times, scheduling and updates. The crew was polite, respectful and went above and beyond my expectations."
        }}
      />

      <div className="pb-[86px] lg:pb-0">

        {/* ── 1. HERO ── */}
        <section className="relative overflow-hidden bg-brand-bone">
          <div className="relative h-[calc(100svh-78px)] min-h-[640px] w-full lg:h-[calc(100vh-82px)] lg:min-h-[680px]">
            <Image
              src="/photos/home/hero.jpg"
              alt="Landscaped property in Pottstown"
              fill
              sizes="100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={GREEN_BLUR_PLACEHOLDER}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.55)] via-[rgba(0,0,0,0.35)] to-[rgba(0,0,0,0.65)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.008)_36%,rgba(0,0,0,0.0)_60%)]" />
            <div className="section-shell relative flex h-full flex-col items-center justify-center pt-6 text-center">
              <h1 className="hero-title max-w-5xl text-[clamp(3.35rem,12.4vw,6.9rem)] font-medium leading-[0.8] text-white md:text-[clamp(5rem,8.5vw,8.2rem)]">
                Make Your <br />
                Property <span className="text-[#9bb593]">Iconic.</span>
              </h1>
              <p className="mt-8 max-w-[26rem] text-balance text-xl font-light leading-[1.38] text-white md:max-w-3xl md:text-2xl">
                Premium landscaping in Pottstown, PA and surrounding areas.
              </p>
              <div className="mt-9 flex flex-col items-center gap-14">
                <Button
                  href="#quote"
                  ariaLabel="Get a free quote"
                  className="border-brand-forest bg-brand-forest px-10 py-4 text-xl text-brand-cream hover:border-brand-moss hover:bg-brand-moss md:px-16 md:py-6 md:text-2xl"
                  trackEventName="cta_quote_click"
                  trackEventParams={{ source: "home_hero" }}
                >
                  Get a Free Quote
                </Button>
                <div className="space-y-4 text-white">
                  <div className="flex flex-wrap items-center justify-center gap-3 text-base font-bold md:text-lg">
                    <span className="text-xl leading-none text-yellow-400 md:text-2xl">★★★★★</span>
                    <span>4.6 ★ (56+ reviews)</span>
                  </div>
                  <p className="text-xl font-bold md:text-2xl">500+ Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. SERVICES ── */}
        <section className="section-shell band-tight">
          <SectionHeader
            meta="Our services"
            title="Quality work. Clean results. Every time."
            lede="We focus on what we do best — three core services, done exceptionally well."
          />
          <div className="mt-8 flex flex-col gap-3">
            {compactServices.map((s) => (
              <ServiceCompactCard key={s.href} {...s} />
            ))}
          </div>
          <div className="mt-8 flex justify-start">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-brand-forest bg-brand-forest px-5 py-3 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-moss hover:bg-brand-moss"
            >
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ── 4. RESULTS GALLERY ── */}
        <section id="work" className="bg-brand-bone band-tight">
          <div className="section-shell">
            <SectionHeader
              meta="Real results"
              title="Recent work from around town."
              lede="A handful of properties we&rsquo;ve made iconic in the last few weeks."
            />
            <div className="mt-8">
              <AfterGallery items={galleryItems} />
            </div>
          </div>
        </section>

        {/* ── 5. WHY CHOOSE US ── */}
        <WhyChooseUs />

        {/* ── 6. HOW IT WORKS ── */}
        <section className="bg-brand-bone band-tight">
          <div className="section-shell grid gap-8 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-14">
            <SectionHeader
              meta="How it works"
              title="Three steps to a landscape you&rsquo;ll love."
              lede="A simple path from first text to finished walkthrough, with room to adjust the scope before work starts."
              className="lg:sticky lg:top-24"
            />
            <ProcessList steps={processSteps} />
          </div>
        </section>

        {/* ── 7. TESTIMONIALS ── */}
        <TestimonialsCarousel />

        {/* ── 8. SERVICE AREA ── */}
        <section className="section-shell band-tight">
          <SectionHeader
            meta="Service area"
            title="Proudly serving Chester &amp; Montgomery Counties"
          />
          <ul className="mt-8 grid gap-px overflow-hidden border-y hairline md:grid-cols-2">
            {areas.map((area) => (
              <li
                key={area.slug}
                className="border-b hairline last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <Link
                  href={`/areas/${area.slug}`}
                  className="group flex items-baseline justify-between gap-6 px-1 py-4 transition-colors hover:bg-brand-bone md:px-4"
                >
                  <span className="font-[var(--font-fraunces)] text-lg font-medium text-brand-ink md:text-xl">
                    {area.name}
                  </span>
                  <span className="flex items-baseline gap-3">
                    <span className="meta hidden sm:inline">{area.region}</span>
                    <ArrowRight className="h-4 w-4 text-brand-sage transition-transform group-hover:translate-x-1 group-hover:text-brand-forest" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-brand-ink/60">
            Don&apos;t see your town?{" "}
            <a
              href={SMS_LINK}
              className="font-semibold text-brand-forest underline-offset-4 hover:underline"
              data-track-event="click_to_text"
              data-track-params='{"source":"home_areas"}'
            >
              Text us
            </a>{" "}
            — we travel for the right job.
          </p>
        </section>

        {/* ── 9. QUICK QUOTE ── */}
        <section id="quote" className="bg-brand-forest band-tight">
          <div className="section-shell grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
            <div>
              <h2 className="font-[var(--font-fraunces)] text-3xl font-medium leading-tight tracking-[-0.01em] text-brand-cream md:text-4xl">
                Ready to make your property iconic?
              </h2>
              <p className="mt-4 max-w-md text-base font-normal leading-relaxed text-[#E7DDCB] md:text-lg">
                Free quotes. No pressure. We respond in 24 hours or less.
              </p>
              <a
                href={SMS_LINK}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-cream underline-offset-4 hover:underline"
                data-track-event="click_to_text"
                data-track-params='{"source":"home_quote"}'
              >
                Or text {PHONE_DISPLAY}
              </a>
            </div>
            <div className="rounded-xl bg-brand-bone p-5 md:p-6">
              <QuickQuoteForm source="home_quote_section" />
            </div>
          </div>
        </section>

      </div>

    </>
  );
}
