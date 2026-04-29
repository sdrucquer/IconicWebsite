import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, Clock3, MapPin, Quote, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { areas } from "@/data/areas";
import { Service, serviceMap } from "@/data/services";
import { PHONE_DISPLAY, PHONE_LINK, SMS_LINK } from "@/lib/constants";
import { GREEN_BLUR_PLACEHOLDER } from "@/lib/placeholder";

type ProcessStep = {
  eyebrow: string;
  title: string;
  body: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type PremiumServicePageConfig = {
  schemaName: string;
  heroImage: string;
  heroAlt: string;
  heroLines: string[];
  heroSource: string;
  includedHeading: string;
  includedItems: string[];
  includedNote: string;
  galleryMainImage: string;
  galleryMainAlt: string;
  galleryMainCaption: string;
  gallerySideImage: string;
  gallerySideAlt: string;
  gallerySideCaption: string;
  galleryCrewImage?: string;
  galleryCrewAlt?: string;
  galleryCrewCaption?: string;
  processSource: string;
  processSteps: ProcessStep[];
  faqs: FaqItem[];
  areaHeading: string;
  areaCopy: string;
  relatedImages?: Record<string, string>;
  bottomImage: string;
  bottomAlt: string;
  bottomTitle: string;
  bottomBody: string;
  bottomSource: string;
  bottomSeasonLabel: string;
};

const proofPoints = [
  {
    icon: Clock3,
    title: "24-hour response"
  },
  {
    icon: ShieldCheck,
    title: "Licensed and insured"
  },
  {
    icon: Star,
    title: "500+ customers served"
  }
];

const featuredAreas = areas.filter((area) =>
  ["pottstown", "royersford", "spring-city", "chester-springs", "douglassville", "phoenixville"].includes(area.slug)
);

export function PremiumServicePage({
  service,
  config
}: {
  service: Service;
  config: PremiumServicePageConfig;
}) {
  const related = service.related
    .map((slug) => serviceMap[slug])
    .filter((item): item is Service => Boolean(item));

  return (
    <>
      <SchemaMarkup
        type="service"
        payload={{
          name: config.schemaName,
          serviceType: service.name,
          areaServed: ["Pottstown, PA", "Royersford, PA", "Spring City, PA", "Chester Springs, PA", "Douglassville, PA"],
          description: service.shortDescription,
          offers: {
            "@type": "Offer",
            priceCurrency: "USD"
          }
        }}
      />
      <SchemaMarkup
        type="breadcrumbList"
        payload={{
          items: [
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` }
          ]
        }}
      />
      <SchemaMarkup
        type="faqPage"
        payload={{
          items: config.faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))
        }}
      />

      <main className="bg-brand-cream pb-[86px] lg:pb-0">
        <section className="relative overflow-hidden bg-brand-ink text-white">
          <div className="relative min-h-[calc(100svh-78px)] lg:min-h-[calc(100vh-82px)]">
            <Image
              src={config.heroImage}
              alt={config.heroAlt}
              fill
              sizes="100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={GREEN_BLUR_PLACEHOLDER}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.55)] via-[rgba(0,0,0,0.35)] to-[rgba(0,0,0,0.65)]" />
            <div className="section-shell relative flex min-h-[calc(100svh-78px)] flex-col items-center justify-center py-16 text-center lg:min-h-[calc(100vh-82px)] lg:py-20">
              <div className="mx-auto max-w-5xl">
                <h1 className="hero-title mx-auto max-w-5xl text-[clamp(3.2rem,12vw,6.9rem)] font-medium leading-[0.82] text-white md:text-[clamp(5rem,8.5vw,8.2rem)]">
                  {config.heroLines.map((line, index) => (
                    <span key={`${line}-${index}`}>
                      {line}
                      {index < config.heroLines.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </h1>
                <div className="mx-auto mt-9 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
                  <Button
                    href="/contact#quote"
                    ariaLabel={`Get a free ${service.name.toLowerCase()} quote`}
                    className="border-brand-forest bg-brand-forest px-8 py-4 text-base text-brand-cream hover:border-brand-moss hover:bg-brand-moss sm:min-w-52 md:px-10 md:text-lg"
                    trackEventName="cta_quote_click"
                    trackEventParams={{ source: config.heroSource }}
                  >
                    Get a Free Quote
                  </Button>
                  <a
                    href={`tel:${PHONE_LINK}`}
                    className="inline-flex items-center justify-center rounded-full border border-white/55 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:min-w-52 md:text-base"
                    data-track-event="click_to_call"
                    data-track-params={`{"source":"${config.heroSource}"}`}
                  >
                    Call {PHONE_DISPLAY}
                  </a>
                </div>
                <div className="mt-8 space-y-3 text-white">
                  <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-bold md:text-base">
                    <span className="text-lg leading-none text-yellow-400 md:text-xl">★★★★★</span>
                    <span>4.6 ★ (56+ reviews)</span>
                  </div>
                  <p className="text-lg font-bold md:text-xl">500+ Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-14 md:py-20">
          <div className="grid gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-16">
            <div className="max-w-2xl">
              <p className="meta text-brand-forest">What is included</p>
              <h2 className="mt-4 font-[var(--font-fraunces)] text-[clamp(2.35rem,7vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.01em] text-brand-ink">
                {config.includedHeading}
              </h2>
            </div>

            <div>
              <ul className="border-y hairline">
                {config.includedItems.map((item) => (
                  <li key={item} className="flex items-center gap-4 border-b hairline py-4 text-[1.08rem] leading-snug text-brand-ink/84 last:border-b-0 md:text-xl">
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-forest text-brand-cream">
                      <Check className="h-4 w-4" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 inline-flex rounded-full bg-brand-bone px-4 py-2 text-sm font-semibold text-brand-forest">
                {config.includedNote}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-brand-bone band-tight">
          <div className="section-shell">
            <div className="grid gap-3 lg:grid-cols-[1.35fr_0.65fr]">
              <figure className="group">
                <div className="relative aspect-[16/10] overflow-hidden rounded">
                  <Image
                    src={config.galleryMainImage}
                    alt={config.galleryMainAlt}
                    fill
                    sizes="(min-width: 1024px) 65vw, 100vw"
                    className="object-cover object-bottom transition-transform duration-700 group-hover:scale-[1.015]"
                  />
                </div>
                <figcaption className="meta mt-3 text-brand-ink/55">{config.galleryMainCaption}</figcaption>
              </figure>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden rounded">
                    <Image
                      src={config.gallerySideImage}
                      alt={config.gallerySideAlt}
                      fill
                      sizes="(min-width: 1024px) 32vw, 50vw"
                      className="object-cover object-bottom"
                    />
                  </div>
                  <figcaption className="meta mt-3 text-brand-ink/55">{config.gallerySideCaption}</figcaption>
                </figure>
                {config.galleryCrewImage ? (
                  <figure>
                    <div className="relative aspect-[4/3] overflow-hidden rounded">
                      <Image
                        src={config.galleryCrewImage}
                        alt={config.galleryCrewAlt ?? "Iconic Landscaping local crew"}
                        fill
                        sizes="(min-width: 1024px) 32vw, 50vw"
                        className="rotate-180 object-cover"
                      />
                    </div>
                    <figcaption className="meta mt-3 text-brand-ink/55">
                      {config.galleryCrewCaption ?? "Local crew"}
                    </figcaption>
                  </figure>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand-forest text-brand-cream">
          <div className="section-shell py-12 md:py-16">
            <div className="grid gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
              <div>
                <p className="meta text-brand-cream/62">Why customers choose us</p>
                <h2 className="mt-4 max-w-3xl font-[var(--font-fraunces)] text-[clamp(2.15rem,5.4vw,4.1rem)] font-medium leading-[0.95] tracking-[-0.01em]">
                  Local, responsive, and careful with the details people notice.
                </h2>
              </div>
              <ul className="grid gap-5 md:grid-cols-3 lg:grid-cols-1">
                {proofPoints.map(({ icon: Icon, title }) => (
                  <li key={title} className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand-cream/10 md:h-14 md:w-14">
                      <Icon className="h-6 w-6 text-brand-tan" />
                    </div>
                    <h3 className="font-[var(--font-fraunces)] text-2xl font-medium leading-tight md:text-[1.65rem]">{title}</h3>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 md:py-16">
          <div className="grid gap-8 rounded bg-brand-bone px-5 py-7 md:px-8 md:py-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
            <div>
              <p className="meta text-brand-forest">How it works</p>
              <h2 className="mt-4 max-w-xl font-[var(--font-fraunces)] text-[clamp(2.15rem,6vw,4rem)] font-medium leading-[0.98] tracking-[-0.01em] text-brand-ink">
                Quote to walkthrough.
              </h2>
              <a
                href={SMS_LINK}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-forest underline-offset-4 hover:underline"
                data-track-event="click_to_text"
                data-track-params={`{"source":"${config.processSource}"}`}
              >
                Text {PHONE_DISPLAY} <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <ol className="relative grid gap-5 before:absolute before:left-5 before:top-5 before:h-[calc(100%-2.5rem)] before:w-px before:bg-brand-sage/35 md:gap-6">
              {config.processSteps.map((step) => (
                <li key={step.title} className="group relative grid grid-cols-[2.5rem_1fr] gap-4">
                  <p className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand-forest font-[var(--font-fraunces)] text-lg font-medium leading-none text-brand-cream transition-transform duration-300 group-hover:scale-105">
                    {step.eyebrow}
                  </p>
                  <div>
                    <h3 className="font-[var(--font-fraunces)] text-[1.45rem] font-medium leading-tight text-brand-ink md:text-2xl">{step.title}</h3>
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-brand-ink/68 md:text-base">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-brand-ink text-brand-cream">
          <div className="section-shell py-14 md:py-20">
            <div className="grid gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16">
              <div>
                <h2 className="font-[var(--font-fraunces)] text-[clamp(2.8rem,7vw,5rem)] font-medium leading-[0.95] tracking-[-0.01em] text-brand-tan">
                  What customers say
                </h2>
                <div className="mt-7 flex flex-wrap items-center gap-3 text-sm font-bold text-brand-cream">
                  <span className="text-lg leading-none text-yellow-400">★★★★★</span>
                  <span>4.6 Google rating</span>
                  <span className="text-brand-cream/45">/</span>
                  <span>56+ reviews</span>
                </div>
              </div>

              <div>
                {service.reviews[0] ? (
                  <figure className="rounded bg-brand-cream p-7 text-brand-ink shadow-[0_24px_70px_rgba(0,0,0,0.22)] md:p-9">
                    <Quote className="h-8 w-8 text-brand-forest" />
                    <blockquote className="mt-5 font-[var(--font-fraunces)] text-[1.75rem] font-medium leading-[1.14] md:text-4xl">
                      &ldquo;{service.reviews[0].quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-7 text-base font-bold">
                      {service.reviews[0].author}
                      {service.reviews[0].location ? (
                        <span className="font-medium text-brand-ink/55">, {service.reviews[0].location}</span>
                      ) : null}
                    </figcaption>
                  </figure>
                ) : null}

                <div className="mt-6 grid gap-px overflow-hidden rounded bg-brand-cream/18 md:grid-cols-2">
                  {service.reviews.slice(1, 3).map((review) => (
                    <figure key={`${review.author}-${review.quote}`} className="bg-brand-ink px-1 py-5 md:p-6">
                      <blockquote className="text-lg font-semibold leading-snug text-brand-cream">
                        &ldquo;{review.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-4 text-sm font-bold text-brand-tan">{review.author}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div>
              <p className="meta text-brand-forest">Common questions</p>
              <h2 className="mt-4 h-section max-w-2xl">Quick answers before you request a quote.</h2>
            </div>
            <div className="mt-8 border-y hairline">
              {config.faqs.map((faq) => (
                <details key={faq.question} className="group border-b hairline py-4 last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-bold text-brand-ink marker:hidden [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border hairline text-brand-forest transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-2 pt-3 leading-relaxed text-brand-ink/70">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-bone band-default">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-16">
              <div>
                <p className="meta text-brand-forest">Service area</p>
                <h2 className="mt-4 h-section max-w-xl">{config.areaHeading}</h2>
                <p className="lede mt-5 text-brand-ink/70">{config.areaCopy}</p>
              </div>
              <div className="grid border-y hairline md:grid-cols-2">
                {featuredAreas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/areas/${area.slug}/${service.slug}`}
                    className="group flex items-center justify-between gap-5 border-b hairline px-1 py-5 transition-colors hover:bg-brand-cream md:px-5 md:[&:nth-last-child(-n+2)]:border-b-0"
                  >
                    <span>
                      <span className="block font-[var(--font-fraunces)] text-xl font-medium text-brand-ink">{area.name}</span>
                      <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.04em] text-brand-ink/48">
                        <MapPin className="h-3 w-3" />
                        {area.county}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-brand-sage transition-transform group-hover:translate-x-1 group-hover:text-brand-forest" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell band-default">
          <div>
            <div>
              <p className="meta text-brand-forest">Related services</p>
              <h2 className="mt-4 h-section max-w-2xl">Related services.</h2>
            </div>
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group overflow-hidden rounded bg-brand-bone"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden">
                    <Image
                      src={config.relatedImages?.[item.slug] ?? `/photos/services/${item.slug}/after.jpg`}
                      alt={`${item.name} finished project`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-brand-ink/58 via-brand-ink/8 to-transparent" />
                    <span className="absolute bottom-4 left-4 right-4 font-[var(--font-fraunces)] text-3xl font-medium leading-none text-white">
                      {item.name}
                    </span>
                  </span>
                  <span className="block p-5">
                    <span className="block text-sm leading-relaxed text-brand-ink/68">{item.shortDescription}</span>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-forest">
                      Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-brand-forest text-brand-cream">
          <Image src={config.bottomImage} alt={config.bottomAlt} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.55)] via-[rgba(0,0,0,0.35)] to-[rgba(0,0,0,0.65)]" />
          <div className="section-shell relative band-feature text-center">
            <p className="meta text-brand-cream/62">Free quote</p>
            <h2 className="mx-auto mt-5 max-w-4xl font-[var(--font-fraunces)] text-[clamp(2.6rem,7vw,5.3rem)] font-medium leading-[0.95] tracking-[-0.01em]">
              {config.bottomTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-cream/72">{config.bottomBody}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                href="/contact#quote"
                ariaLabel={`Request a ${service.name.toLowerCase()} quote`}
                variant="secondary"
                className="px-9 py-4 text-base"
                trackEventName="cta_quote_click"
                trackEventParams={{ source: config.bottomSource }}
              >
                Get a Free Quote
              </Button>
              <a
                href={SMS_LINK}
                className="inline-flex items-center justify-center rounded-full border border-brand-cream/55 px-7 py-4 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-cream/10"
                data-track-event="click_to_text"
                data-track-params={`{"source":"${config.bottomSource}"}`}
              >
                Text {PHONE_DISPLAY}
              </a>
            </div>
            <p className="mt-7 inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-cream/72">
              <CalendarDays className="h-4 w-4 text-brand-tan" />
              {config.bottomSeasonLabel}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
