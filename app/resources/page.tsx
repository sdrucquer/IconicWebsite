import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { resourceArticles } from "@/data/resources";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Landscaping Resources and Guides",
  description:
    "Practical local landscaping guides for homeowners in and around Pottstown, PA.",
  path: "/resources",
  ogImagePath: "/photos/property-finish.jpg"
});

export default function ResourcesPage() {
  return (
    <>
      <SchemaMarkup
        type="breadcrumbList"
        payload={{
          items: [
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" }
          ]
        }}
      />

      <section className="section-shell py-16 md:py-20 lg:py-24 xl:py-28">
        <p className="inline-flex rounded-full border border-brand-primary/20 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary">
          Resources
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold text-brand-dark md:text-6xl lg:max-w-5xl lg:text-7xl">
          Local Landscaping Guides for Better Property Decisions
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-dark/75 md:text-lg lg:max-w-4xl lg:text-xl">
          Actionable guidance for homeowners across Pottstown and nearby communities, focused on real project scope, timing, and quality outcomes.
        </p>
      </section>

      <section className="section-shell pb-16 md:pb-20 lg:pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:gap-7 xl:grid-cols-3">
          {resourceArticles.map((article) => (
            <article key={article.slug} className="overflow-hidden rounded-2xl border border-brand-primary/10 bg-white shadow-soft">
              <div className="relative h-52 w-full">
                <Image src={article.heroImage} alt={article.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary/70">
                  {article.readTime} • {article.publishDate}
                </p>
                <h2 className="mt-2 text-xl font-bold text-brand-dark">{article.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-dark/75">{article.summary}</p>
                <Link
                  href={`/resources/${article.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-accent"
                >
                  Read guide <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-16 md:pb-20 lg:pb-24">
        <div className="rounded-2xl border border-brand-primary/12 bg-brand-dark p-7 text-white shadow-card md:p-10">
          <h2 className="font-display text-3xl font-extrabold md:text-5xl">Need help applying this to your property?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
            We can assess your yard and recommend a clear service scope based on your goals and budget.
          </p>
          <div className="mt-7">
            <Button
              href="/contact#quote"
              ariaLabel="Request a quote"
              variant="secondary"
              trackEventName="cta_quote_click"
              trackEventParams={{ source: "resources_index" }}
            >
              Request a Quote
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
