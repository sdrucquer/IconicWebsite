import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { getServiceIcon } from "@/components/ServiceIcon";
import { services } from "@/data/services";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Landscaping Services in Pottstown, PA",
  description:
    "Explore bed cleanup, mulching, edging, spring cleanup, and more services from Iconic Landscaping."
};

const serviceBundles = [
  {
    title: "Curb Appeal Reset",
    items: ["Bed Cleanup", "Edging", "Mulching"],
    copy: "Best for homeowners who want an immediate visual upgrade in one project cycle."
  },
  {
    title: "Seasonal Recovery",
    items: ["Leaf Cleanup", "Spring Cleanup", "Bush Trimming"],
    copy: "Built for properties coming out of rough weather or heavy seasonal debris."
  },
  {
    title: "Overgrowth Control",
    items: ["Brush Cleanup", "Off-Site Removal", "Weeding"],
    copy: "Clears dense growth and gets unmanaged areas back to clean, usable condition."
  }
];

const choosePoints = [
  "Pick the result you want first, then we map the right service mix.",
  "If you are unsure, start with a quote and we will recommend a practical scope.",
  "Most homeowners combine 2-3 services for the best value and outcome."
];

export default function ServicesPage() {
  return (
    <>
      <section className="section-shell py-14 md:py-18">
        <div className="texture-panel rounded-2xl border border-brand-primary/15 p-6 shadow-card md:p-9">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-light px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary">
            <Sparkles className="h-3.5 w-3.5" /> Local service menu
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-tight text-brand-dark md:text-6xl">
            Landscaping Services Designed for Real Property Results
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-dark/75 md:text-lg">
            Every service is built around clean execution, clear communication, and an end result that looks intentionally maintained.
          </p>
          <Button href="/contact#quote" ariaLabel="Open full quote form" className="mt-7">
            Start Your Quote
          </Button>
        </div>
      </section>

      <section className="section-shell py-8 md:py-12">
        <h2 className="section-title">All Services</h2>
        <p className="section-subtitle">
          Browse individual service pages for scope details, examples, and common questions.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              title={service.name}
              description={service.shortDescription}
              href={`/services/${service.slug}`}
              icon={getServiceIcon(service.slug)}
            />
          ))}
        </div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <h2 className="section-title">Popular Service Bundles</h2>
        <p className="section-subtitle">Most homeowners combine services to get better visual and maintenance outcomes.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {serviceBundles.map((bundle) => (
            <article key={bundle.title} className="rounded-2xl border border-brand-primary/12 bg-white p-6 shadow-soft">
              <h3 className="font-display text-2xl font-bold text-brand-dark">{bundle.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-dark/75">{bundle.copy}</p>
              <ul className="mt-4 space-y-2">
                {bundle.items.map((item) => (
                  <li key={item} className="inline-flex items-center gap-2 text-sm font-medium text-brand-dark/90">
                    <CheckCircle2 className="h-4 w-4 text-brand-primary" /> {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <div className="rounded-2xl border border-brand-primary/12 bg-brand-dark p-6 text-white shadow-card md:p-8">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">How to choose the right service</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {choosePoints.map((point) => (
              <p key={point} className="rounded-xl bg-white/10 p-4 text-sm leading-relaxed text-white/90">
                {point}
              </p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact#quote" ariaLabel="Open full quote form">
              Get a Recommended Scope
            </Button>
            <Link
              href="/service-area"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Check service area <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
