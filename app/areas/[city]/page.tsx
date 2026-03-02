import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { ServiceCard } from "@/components/ServiceCard";
import { getServiceIcon } from "@/components/ServiceIcon";
import { areaMap, areas } from "@/data/areas";
import { serviceMap } from "@/data/services";
import { buildPageMetadata } from "@/lib/seo";

type AreaPageProps = {
  params: { city: string };
};

export function generateStaticParams() {
  return areas.map((area) => ({ city: area.slug }));
}

export function generateMetadata({ params }: AreaPageProps): Metadata {
  const area = areaMap[params.city];

  if (!area) {
    return buildPageMetadata({
      title: "Area not found",
      description: "Requested service area page was not found.",
      path: `/areas/${params.city}`,
      noIndex: true
    });
  }

  return buildPageMetadata({
    title: `${area.name}, ${area.region} Landscaping Services`,
    description: `${area.summary} Request a quote from Iconic Landscaping for ${area.name}, ${area.region}.`,
    path: `/areas/${area.slug}`,
    ogImagePath: "/photos/property-finish.jpg"
  });
}

export default function AreaCityPage({ params }: AreaPageProps) {
  const area = areaMap[params.city];

  if (!area) {
    notFound();
  }

  const featuredServices = area.featuredServiceSlugs
    .map((slug) => serviceMap[slug])
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <>
      <SchemaMarkup
        type="breadcrumbList"
        payload={{
          items: [
            { name: "Home", path: "/" },
            { name: "Areas", path: "/service-area" },
            { name: area.name, path: `/areas/${area.slug}` }
          ]
        }}
      />
      <SchemaMarkup
        type="faqPage"
        payload={{
          items: area.faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))
        }}
      />

      <section className="section-shell py-16 md:py-20">
        <p className="inline-flex rounded-full border border-brand-primary/20 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary">
          Local service page
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold text-brand-dark md:text-6xl">
          {area.heroTitle}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-dark/75 md:text-lg">{area.summary}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            href="/contact#quote"
            ariaLabel={`Request a quote for ${area.name}`}
            trackEventName="cta_quote_click"
            trackEventParams={{ source: `area_page_${area.slug}` }}
          >
            Request a Quote in {area.name}
          </Button>
          <Link
            href="/service-area"
            className="inline-flex items-center gap-2 rounded-full border border-brand-primary/25 px-5 py-3 text-sm font-semibold text-brand-primary hover:bg-brand-light"
          >
            View all service areas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="section-shell py-8 md:py-10">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-brand-dark">What we handle most in {area.name}</h2>
            <ul className="mt-4 space-y-2 text-sm text-brand-dark/80">
              {area.serviceHighlights.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-brand-dark">Why homeowners choose us locally</h2>
            <ul className="mt-4 space-y-2 text-sm text-brand-dark/80">
              {area.proofPoints.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <h2 className="section-title">Top Services in {area.name}</h2>
        <p className="section-subtitle">Service pages include scope, examples, and detailed FAQs.</p>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.slug}
              title={service.name}
              description={service.shortDescription}
              href={`/areas/${area.slug}/${service.slug}`}
              icon={getServiceIcon(service.slug)}
              ctaLabel="View local service page"
            />
          ))}
        </div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <h2 className="section-title">Frequently Asked Questions for {area.name}</h2>
        <div className="mt-7 space-y-3">
          {area.faqs.map((faq) => (
            <article key={faq.question} className="rounded-xl border border-brand-primary/10 bg-white p-5 shadow-soft">
              <h3 className="text-sm font-bold text-brand-dark md:text-base">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-dark/75">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
