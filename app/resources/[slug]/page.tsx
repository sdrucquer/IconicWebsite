import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { areaMap } from "@/data/areas";
import { resourceMap, resourceSlugs } from "@/data/resources";
import { serviceMap } from "@/data/services";
import { buildPageMetadata } from "@/lib/seo";

type ResourcePageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return resourceSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ResourcePageProps): Metadata {
  const article = resourceMap[params.slug];

  if (!article) {
    return buildPageMetadata({
      title: "Resource not found",
      description: "Requested resource page was not found.",
      path: `/resources/${params.slug}`,
      noIndex: true
    });
  }

  return buildPageMetadata({
    title: article.title,
    description: article.summary,
    path: `/resources/${article.slug}`,
    ogImagePath: article.heroImage
  });
}

export default function ResourceArticlePage({ params }: ResourcePageProps) {
  const article = resourceMap[params.slug];

  if (!article) {
    notFound();
  }

  const relatedServices = article.relatedServiceSlugs
    .map((slug) => serviceMap[slug])
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const relatedAreas = article.relatedAreaSlugs
    .map((slug) => areaMap[slug])
    .filter((area): area is NonNullable<typeof area> => Boolean(area));

  return (
    <>
      <SchemaMarkup
        type="breadcrumbList"
        payload={{
          items: [
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: article.title, path: `/resources/${article.slug}` }
          ]
        }}
      />
      <SchemaMarkup
        type="faqPage"
        payload={{
          items: article.faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))
        }}
      />

      <article className="section-shell py-16 md:py-20 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary/75">
          {article.publishDate} • Updated {article.updatedDate} • {article.readTime}
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl font-extrabold text-brand-dark md:text-6xl lg:max-w-5xl lg:text-7xl">{article.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-dark/75 md:text-lg lg:max-w-4xl lg:text-xl">{article.summary}</p>

        <div className="relative mt-8 h-[300px] w-full overflow-hidden rounded-2xl border border-brand-primary/10 md:h-[420px]">
          <Image src={article.heroImage} alt={article.title} fill className="object-cover" priority />
        </div>

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-brand-dark/85">
          <p>{article.intro}</p>
          {article.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="font-display text-2xl font-bold text-brand-dark md:text-3xl">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </article>

      <section className="section-shell py-2 md:py-6 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-brand-primary/12 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-brand-dark">Recommended Process</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-brand-dark/80">
              {article.processSteps.map((step, index) => (
                <li key={`${step}-${index}`}>{step}</li>
              ))}
            </ol>
          </article>

          <article className="rounded-2xl border border-brand-primary/12 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-brand-dark">Typical Cost Range</h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-dark/80">{article.costRange}</p>
            <Button
              href="/contact#quote"
              ariaLabel="Request quote"
              className="mt-6"
              trackEventName="cta_quote_click"
              trackEventParams={{ source: `resource_${article.slug}` }}
            >
              Request a Quote
            </Button>
          </article>
        </div>
      </section>

      <section className="section-shell py-10 md:py-14 lg:py-20">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="mt-7 space-y-3">
          {article.faqs.map((faq) => (
            <article key={faq.question} className="rounded-xl border border-brand-primary/10 bg-white p-5 shadow-soft">
              <h3 className="text-sm font-bold text-brand-dark md:text-base">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-dark/75">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-16 md:pb-20 lg:pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-brand-primary/12 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-bold text-brand-dark">Related Services</h2>
            <div className="mt-4 space-y-2">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-accent"
                >
                  {service.name} <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-brand-primary/12 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-bold text-brand-dark">Related Service Areas</h2>
            <div className="mt-4 space-y-2">
              {relatedAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-accent"
                >
                  {area.name}, {area.region} <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
