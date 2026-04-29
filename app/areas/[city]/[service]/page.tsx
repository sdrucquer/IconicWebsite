import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, Quote } from "lucide-react";
import { Button } from "@/components/Button";
import { PottstownSpringCleanupPage } from "@/components/PottstownSpringCleanupPage";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { areaMap, areas } from "@/data/areas";
import { serviceDetails } from "@/data/service-details";
import { serviceMap, services } from "@/data/services";
import { buildPageMetadata } from "@/lib/seo";

type AreaServicePageProps = {
  params: { city: string; service: string };
};

export function generateStaticParams() {
  return areas.flatMap((area) =>
    area.featuredServiceSlugs.map((serviceSlug) => ({
      city: area.slug,
      service: serviceSlug
    }))
  );
}

export function generateMetadata({ params }: AreaServicePageProps): Metadata {
  const area = areaMap[params.city];
  const service = serviceMap[params.service];

  if (!area || !service || !area.featuredServiceSlugs.includes(service.slug)) {
    return buildPageMetadata({
      title: "Service page not found",
      description: "Requested local service page was not found.",
      path: `/areas/${params.city}/${params.service}`,
      noIndex: true
    });
  }

  if (area.slug === "pottstown" && service.slug === "spring-cleanup") {
    return buildPageMetadata({
      title: "Spring Cleanup in Pottstown, PA",
      description:
        "Iconic Landscaping is a top local choice for spring cleanup in Pottstown, PA. Winter debris removal, bed cleanup, edging, haul-away, and optional mulch.",
      path: "/areas/pottstown/spring-cleanup",
      ogImagePath: "/photos/services/spring-cleanup/after.jpg"
    });
  }

  return buildPageMetadata({
    title: `${service.name} in ${area.name}, ${area.region}`,
    description: `${service.shortDescription} Request ${service.name.toLowerCase()} service in ${area.name} from Iconic Landscaping.`,
    path: `/areas/${area.slug}/${service.slug}`,
    ogImagePath: serviceDetails[service.slug].heroImage
  });
}

export default function AreaServicePage({ params }: AreaServicePageProps) {
  const area = areaMap[params.city];
  const service = serviceMap[params.service];

  if (!area || !service || !area.featuredServiceSlugs.includes(service.slug)) {
    notFound();
  }

  if (area.slug === "pottstown" && service.slug === "spring-cleanup") {
    return <PottstownSpringCleanupPage />;
  }

  const detail = serviceDetails[service.slug];

  const relatedInArea = services
    .filter((candidate) => area.featuredServiceSlugs.includes(candidate.slug) && candidate.slug !== service.slug)
    .slice(0, 3);
  const localReview = area.reviews[0] ?? service.reviews[0];

  return (
    <>
      <SchemaMarkup
        type="breadcrumbList"
        payload={{
          items: [
            { name: "Home", path: "/" },
            { name: "Areas", path: "/service-area" },
            { name: area.name, path: `/areas/${area.slug}` },
            { name: service.name, path: `/areas/${area.slug}/${service.slug}` }
          ]
        }}
      />
      <SchemaMarkup
        type="service"
        payload={{
          name: `${service.name} in ${area.name}, ${area.region}`,
          serviceType: service.name,
          description: service.shortDescription,
          areaServed: [`${area.name}, ${area.region}`],
          offers: {
            "@type": "Offer",
            priceCurrency: "USD"
          }
        }}
      />
      <SchemaMarkup
        type="faqPage"
        payload={{
          items: detail.faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))
        }}
      />

      <section className="section-shell py-16 md:py-20 lg:py-24">
        <p className="inline-flex rounded-full border border-brand-primary/20 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary">
          Local service page
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold text-brand-dark md:text-6xl lg:max-w-5xl lg:text-7xl">
          {service.name} in {area.name}, {area.region}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-dark/75 md:text-lg lg:max-w-4xl lg:text-xl">
          {service.tagline} In {area.name}, we focus on clear scope, fast communication, and a finished property that matches the quote.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-brand-primary/20 bg-white px-3 py-1 text-sm font-semibold text-brand-primary">
            {area.county}
          </span>
          <span className="rounded-full border border-brand-primary/20 bg-white px-3 py-1 text-sm font-semibold text-brand-primary">
            {area.tier === "primary" ? "Core service area" : "Larger jobs prioritized"}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            href="/contact#quote"
            ariaLabel={`Get quote for ${service.name} in ${area.name}`}
            trackEventName="cta_quote_click"
            trackEventParams={{ source: `area_service_${area.slug}_${service.slug}` }}
          >
            Get a Quote for {service.name}
          </Button>
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-brand-primary/25 px-5 py-3 text-sm font-semibold text-brand-primary hover:bg-brand-light"
          >
            View core service page <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="section-shell py-8 md:py-10 lg:py-14">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-brand-dark">What&apos;s included</h2>
            <ul className="mt-4 space-y-2 text-sm text-brand-dark/80">
              {service.included.map((item) => (
                <li key={item} className="inline-flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-brand-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-brand-dark">Why this matters in {area.name}</h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-dark/80">{area.whyCustomersHireUs}</p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-brand-dark/80">
              {service.whyItMatters.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell py-10 md:py-12 lg:py-16">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-brand-dark">Local service notes</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-brand-dark/75">
              <p>{area.seasonalNeeds}</p>
              <p><strong className="text-brand-dark">Best time to book:</strong> {service.bestSeason}</p>
              <p><strong className="text-brand-dark">Pricing:</strong> {service.pricingGuidance}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {area.landmarks.map((landmark) => (
                <span key={landmark} className="inline-flex items-center gap-1 rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand-primary">
                  <MapPin className="h-3 w-3" /> {landmark}
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-soft">
            <Quote className="h-5 w-5 text-brand-primary" />
            <h2 className="mt-3 text-2xl font-bold text-brand-dark">Proof from local clients</h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-dark/75">&ldquo;{localReview.quote}&rdquo;</p>
            <p className="mt-4 text-sm font-bold text-brand-dark">{localReview.author}, {area.name}</p>
          </article>
        </div>
      </section>

      <section className="section-shell py-12 md:py-16 lg:py-20">
        <h2 className="section-title">Common Questions</h2>
        <div className="mt-7 space-y-3">
          {detail.faqs.map((faq) => (
            <article key={faq.question} className="rounded-xl border border-brand-primary/10 bg-white p-5 shadow-soft">
              <h3 className="text-sm font-bold text-brand-dark md:text-base">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-dark/75">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 md:py-16 lg:py-20">
        <h2 className="section-title">Related {area.name} Services</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {relatedInArea.map((item) => (
            <Link
              key={item.slug}
              href={`/areas/${area.slug}/${item.slug}`}
              className="rounded-xl border border-brand-primary/10 bg-white p-5 text-sm font-semibold text-brand-primary hover:border-brand-primary"
            >
              {item.name} in {area.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
