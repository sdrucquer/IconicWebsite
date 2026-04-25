import { Metadata } from "next";
import { MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { areas, mentionedSecondaryAreas } from "@/data/areas";
import { SMS_LINK, PHONE_DISPLAY } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Service Area | Landscaping in Pottstown, PA",
  description:
    "Iconic Landscaping serves Pottstown, Chester Springs, Royersford, Douglassville, Spring City, and nearby communities.",
  path: "/service-area",
  ogImagePath: "/photos/property-finish.jpg"
});

const PRIMARY_NOTES: Record<string, string> = {
  Pottstown: "Our home base",
  "Chester Springs": "Full service",
  Royersford: "Full service",
  Douglassville: "Full service",
  "Spring City": "Full service",
  Phoenixville: "Larger jobs",
  Collegeville: "Seasonal cleanup"
};

const publishedAreas = areas.map((area) => ({ ...area, note: PRIMARY_NOTES[area.name] ?? "Service area" }));

const decisionPoints = [
  {
    title: "Distance from Pottstown",
    copy: "Most of our work is within 20 minutes of Pottstown. Further out is possible for larger jobs."
  },
  {
    title: "Job Size",
    copy: "We'll travel further for larger scopes. A full spring cleanup or major mulch install justifies the drive."
  },
  {
    title: "Crew Availability",
    copy: "During peak season we prioritize primary areas. Extended areas are scheduled around capacity."
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

      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-deep to-brand-primary opacity-90" />
        <div className="section-shell relative py-16 md:py-20 lg:py-24 xl:py-28">
          <p className="inline-block rounded-full border border-white/25 px-4 py-1 text-xs uppercase tracking-[0.14em] text-white/80">
            Where We Work
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-6xl lg:max-w-5xl lg:text-7xl">
            Serving the Greater Pottstown Area
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/78 md:text-lg lg:max-w-4xl lg:text-xl">
            We know these roads. We&apos;ve worked in these neighborhoods. Local crew, local knowledge.
          </p>
        </div>
      </section>

      <section className="section-shell py-16 md:py-20 lg:py-24">
        <h2 className="font-display text-3xl font-bold text-brand-dark md:text-4xl">Where We Work</h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-dark/75 md:text-base">
          These service areas have dedicated pages with local details, reviews, and recommended service options.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {publishedAreas.map((area) => (
            <Link key={area.slug} href={`/areas/${area.slug}`} className="rounded-2xl border-2 border-brand-primary bg-white p-5 shadow-soft transition-colors hover:bg-brand-light">
              <div className="mb-2 inline-flex items-center justify-center rounded-full bg-brand-light p-2 text-brand-primary">
                <MapPin className="h-4 w-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-dark">{area.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-brand-primary">{area.note}</p>
              <p className="mt-2 text-xs text-brand-dark/60">{area.county}</p>
            </Link>
          ))}
        </div>

        <div className="my-8 rounded-2xl bg-brand-dark p-6 text-white">
          <p className="text-base font-semibold">Don&apos;t see your town?</p>
          <p className="mt-1 text-sm text-white/70">
            Text us your address and we&apos;ll let you know within the hour if we can help.
          </p>
          <a
            href={SMS_LINK}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-accent"
          >
            <MessageCircle className="h-4 w-4" /> Text Us Your Address
          </a>
        </div>

        <p className="text-sm leading-relaxed text-brand-dark/75 md:text-base">
          We also serve these areas for larger jobs, but they do not have dedicated local pages yet. Not sure? Just text us.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {mentionedSecondaryAreas.map((area) => (
            <article key={area.name} className="rounded-2xl border border-brand-dark/15 bg-white p-5 shadow-soft">
              <p className="font-display text-lg font-bold text-brand-dark">{area.name}, {area.region}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-brand-primary">{area.note}</p>
              <p className="mt-3 text-sm leading-relaxed text-brand-dark/70">&ldquo;{area.review}&rdquo;</p>
              <p className="mt-2 text-sm font-semibold text-brand-dark">{area.author}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-16 md:pb-20 lg:pb-24">
        <h2 className="font-display text-3xl font-bold text-brand-dark md:text-4xl">How We Decide If We Can Help</h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-dark/75 md:text-base">
          If you&apos;re outside our listed areas, here&apos;s how we think about it.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {decisionPoints.map((point) => (
            <article key={point.title} className="rounded-2xl border border-brand-primary/12 bg-white p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold text-brand-dark">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-dark/75">{point.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-brand-primary/15 bg-brand-light p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">Coverage Area</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-brand-dark">
            Primarily Montgomery &amp; Chester County, PA
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-brand-dark/75">
            The majority of our work is in Montgomery and Chester County. We occasionally serve Berks County for the
            right job. If you&apos;re in Pennsylvania and within reasonable distance of Pottstown, reach out - we&apos;ll
            be straight with you about whether it makes sense.
          </p>
        </div>
      </section>

      <section className="bg-brand-dark py-20 text-center text-white lg:py-24 xl:py-28">
        <div className="section-shell">
          <h2 className="font-display text-3xl font-extrabold md:text-5xl">In Our Area? Let&apos;s Talk.</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            Text us your address and what you need. We&apos;ll confirm availability and get you a quote fast.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact#quote" ariaLabel="Get a free quote">
              Get a Free Quote
            </Button>
            <a
              href={SMS_LINK}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" /> Text {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
