import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { resourceArticles, type ResourceArticle } from "@/data/resources";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Landscaping Resources and Guides",
  description:
    "Practical local landscaping guides for homeowners in and around Pottstown, PA.",
  path: "/resources",
  ogImagePath: "/photos/property-finish.jpg"
});

function articleCategory(article: ResourceArticle) {
  if (article.slug.includes("spring") || article.slug.includes("leaf")) {
    return "Spring & Fall";
  }

  if (article.slug.includes("choose")) {
    return "Hiring a Crew";
  }

  if (article.slug.includes("photo")) {
    return "Local Wisdom";
  }

  return "Bed Work";
}

function formatMonthYear(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    timeZone: "UTC",
    year: "numeric"
  }).format(new Date(value));
}

function formatArchiveDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    timeZone: "UTC",
    year: "numeric"
  }).format(new Date(value));
}

export default function ResourcesPage() {
  const [featureArticle, ...remainingArticles] = resourceArticles;
  const recentArticles = remainingArticles.slice(0, 3);
  const archiveArticles = remainingArticles.slice(3);
  const currentSeasonCount = remainingArticles.length;

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

      {featureArticle ? (
        <header className="border-b border-brand-sage/30 bg-brand-bone px-4 py-10 md:px-8 md:py-16">
          <div className="mx-auto max-w-[82.5rem]">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-ink/50">
              <span className="text-brand-forest">Landscaping Resources</span>
              <span className="font-display text-sm font-normal normal-case tracking-[0.02em] text-brand-forest">
                Practical field guides from Iconic
              </span>
            </div>

            <Link href={`/resources/${featureArticle.slug}`} className="group grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:aspect-[16/10] lg:order-2">
                <Image
                  src={featureArticle.heroImage}
                  alt={featureArticle.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  priority
                />
              </div>
              <div>
                <p className="mb-5 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brand-forest before:h-px before:w-8 before:bg-brand-forest">
                  Featured Guide
                </p>
                <div className="mb-5 flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.15em] text-brand-ink/50">
                  <span className="text-brand-forest">{articleCategory(featureArticle)}</span>
                  <span className="h-1 w-1 rounded-full bg-brand-ink/35" />
                  <span>{featureArticle.readTime} read</span>
                  <span className="h-1 w-1 rounded-full bg-brand-ink/35" />
                  <span>{formatMonthYear(featureArticle.publishDate)}</span>
                </div>
                <h1 className="font-display text-[clamp(2.35rem,5vw,4.75rem)] font-normal leading-[0.98] tracking-[-0.035em] text-brand-ink">
                  {featureArticle.title}
                </h1>
                <p className="mt-5 max-w-2xl font-display text-[1.08rem] leading-relaxed text-brand-ink/75 md:text-[1.25rem]">
                  {featureArticle.summary}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-brand-sage/30 pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-forest font-display text-sm font-medium text-brand-cream">
                    IL
                  </span>
                  <span>
                    <span className="block font-display text-sm font-medium tracking-[-0.01em] text-brand-ink">
                      {featureArticle.author}
                    </span>
                    <span className="block text-xs italic text-brand-ink/50">
                      Field-tested across Montgomery, Chester &amp; Berks
                    </span>
                  </span>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-brand-forest transition group-hover:gap-4">
                  Read the full guide
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </header>
      ) : null}

      <section className="bg-brand-cream px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[82.5rem]">
          <div className="mb-12 grid gap-6 border-b border-brand-sage/30 pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-brand-forest">The Iconic Field Notes</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-none tracking-[-0.025em] text-brand-ink">
                More from <em className="italic text-brand-forest">the field.</em>
              </h2>
              <p className="mt-4 max-w-2xl font-display text-lg leading-relaxed text-brand-ink/70">
                Practical guides on cleanups, mulching, bed work, and hiring a local crew.
              </p>
            </div>
            <div>
              <p className="mb-3 font-display text-base italic text-brand-ink/50 lg:text-right">{currentSeasonCount} guides this season</p>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {["All", "Spring & Fall", "Bed Work", "Hiring a Crew", "Local Wisdom"].map((category, index) => (
                  <span
                    key={category}
                    className={`rounded-full border px-4 py-2 font-display text-sm transition ${
                      index === 0
                        ? "border-brand-forest bg-brand-forest text-brand-cream"
                        : "border-brand-sage/35 text-brand-ink/72"
                    }`}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-14 lg:grid-cols-3">
            {recentArticles.map((article) => (
              <Link key={article.slug} href={`/resources/${article.slug}`} className="group flex flex-col">
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-md">
                  <Image
                    src={article.heroImage}
                    alt={article.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mb-4 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-brand-ink/50">
                  <span className="text-brand-forest">{articleCategory(article)}</span>
                  <span className="h-[3px] w-[3px] rounded-full bg-brand-ink/35" />
                  <span>{article.readTime}</span>
                </div>
                <h3 className="font-display text-[1.65rem] font-medium leading-tight tracking-[-0.02em] text-brand-ink transition group-hover:text-brand-forest">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 font-display text-base leading-relaxed text-brand-ink/72">{article.summary}</p>
                <p className="mt-5 text-xs italic tracking-[0.02em] text-brand-ink/50">
                  <strong className="font-medium not-italic text-brand-ink/70">{article.author}</strong> · {formatMonthYear(article.publishDate)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-brand-sage/30 bg-brand-bone px-4 py-24 text-center md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 font-display text-7xl font-light leading-none text-brand-forest/30">&quot;</div>
          <p className="font-display text-[clamp(1.5rem,2.8vw,2.125rem)] font-normal leading-snug tracking-[-0.018em] text-brand-ink">
            We started writing these because customers kept asking the same questions in our quotes.{" "}
            <em className="italic text-brand-forest">It turns out a lot of homeowners just want someone to explain how this stuff actually works.</em>
          </p>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-brand-ink/50">A note from the team</p>
        </div>
      </section>

      {archiveArticles.length > 0 ? (
        <section className="bg-brand-bone px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-brand-forest">The Archive</p>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-none tracking-[-0.02em] text-brand-ink">
                Earlier <em className="italic text-brand-forest">seasons.</em>
              </h2>
            </div>

            <div className="border-t border-brand-sage/30">
              {archiveArticles.map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/resources/${article.slug}`}
                  className="group grid gap-2 border-b border-brand-sage/30 py-7 transition md:grid-cols-[5rem_1fr_12rem_3.75rem] md:items-center md:gap-8 md:hover:pl-3"
                >
                  <span className="hidden font-display text-lg italic text-brand-ink/45 md:block">
                    / {String(index + recentArticles.length + 2).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-display text-[1.35rem] font-medium leading-tight tracking-[-0.015em] text-brand-ink transition group-hover:text-brand-forest">
                      {article.title}
                    </span>
                    <span className="mt-1 block text-xs italic text-brand-ink/50">{article.author}</span>
                  </span>
                  <span className="text-left text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-brand-ink/50 md:text-right">
                    <span className="block text-brand-forest">{articleCategory(article)}</span>
                    <span>{formatArchiveDate(article.publishDate)} · {article.readTime}</span>
                  </span>
                  <span className="hidden text-right text-brand-forest opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100 md:block">
                    <ArrowRight className="ml-auto h-5 w-5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#183B2A] px-6 py-24 text-[#FAF6EC] md:px-10 md:py-36 lg:px-16 lg:py-[11.75rem]">
        <div className="grid gap-14 md:grid-cols-[1.28fr_1fr] md:items-start md:gap-28">
          <div>
            <span className="inline-block -rotate-2 font-[var(--font-caveat)] text-[2rem] font-semibold leading-none text-[#B8D4C0] md:text-[2.35rem]">
              ↳ a thought
            </span>
            <h2 className="mt-10 max-w-[52rem] font-display text-[clamp(3.5rem,5vw,5.05rem)] font-normal leading-[0.98] tracking-[-0.025em] text-[#FAF6EC]">
              Reading is good. <em className="italic text-[#B8D4C0]">Doing</em> is faster.
            </h2>
          </div>
          <div className="md:pt-1">
            <p className="max-w-[38rem] font-display text-[clamp(1.45rem,1.95vw,1.95rem)] font-normal leading-[1.36] tracking-[-0.01em] text-[#FAF6EC]/82">
              If you&apos;d rather skip the homework and have us assess the yard ourselves, we&apos;re happy to come take a look. Free quote, usually back the same day.
            </p>
            <Link
              href="/contact#quote"
              className="mt-14 inline-flex min-h-[5.65rem] items-center justify-center gap-5 rounded-full bg-[#F5F1E8] px-12 text-[1.25rem] font-bold text-[#183B2A] transition hover:-translate-y-0.5 md:min-w-[19.75rem]"
              data-track-event="cta_quote_click"
              data-track-params='{"source":"resources_index"}'
            >
              Get a Free Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
