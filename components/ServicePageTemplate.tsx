import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, Clock3, ShieldCheck } from "lucide-react";
import { Service, serviceMap } from "@/data/services";
import { serviceDetails } from "@/data/service-details";
import { Button } from "@/components/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { getServiceIcon } from "@/components/ServiceIcon";
import { PHONE_DISPLAY, PHONE_LINK } from "@/lib/constants";

type ServicePageTemplateProps = {
  service: Service;
};

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const related = service.related
    .map((slug) => serviceMap[slug])
    .filter((item): item is Service => Boolean(item));
  const detail = serviceDetails[service.slug];

  return (
    <>
      <SchemaMarkup
        type="service"
        payload={{
          name: `${service.name} in Pottstown, PA`,
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
          items: detail.faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))
        }}
      />

      <section className="relative overflow-hidden bg-brand-dark py-20 text-white md:py-24">
        <Image
          src={detail.heroImage}
          alt={`${service.name} project by Iconic Landscaping`}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/85 to-brand-dark/75" />
        <div className="section-shell relative">
          <p className="inline-block rounded-full border border-white/30 px-4 py-1 text-xs uppercase tracking-[0.12em] text-white/85">
            Landscaping Services in Pottstown, PA
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[0.98] md:text-6xl">
            {detail.heroTitle ?? `${service.name} Services in Pottstown, PA`}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            {detail.heroSubtitle ?? service.tagline}
          </p>

          <div className="mt-7 flex flex-wrap gap-3 text-xs font-semibold">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur">
              <Clock3 className="h-4 w-4 text-brand-accent" /> Fast quote response
            </p>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-brand-accent" /> Licensed & insured
            </p>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur">
              <CalendarDays className="h-4 w-4 text-brand-accent" /> Flexible scheduling
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href="/contact#quote"
              ariaLabel={`Get a free quote for ${service.name}`}
              trackEventName="cta_quote_click"
              trackEventParams={{ source: `service_hero_${service.slug}` }}
            >
              Get a Free Quote
            </Button>
            <a
              href={`tel:${PHONE_LINK}`}
              className="inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              aria-label={`Call about ${service.name}`}
              data-track-event="click_to_call"
              data-track-params={`{"source":"service_hero_${service.slug}"}`}
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <section className="section-shell py-10 md:py-14">
        <div className="mb-5 md:mb-7">
          <h2 className="section-title">{detail.topSectionTitle ?? "What You Can Expect"}</h2>
          <p className="section-subtitle">
            {detail.topSectionSubtitle ?? "Clear process, clean execution, and results that hold up."}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {detail.expectations.map((item) => (
            <article key={item} className="rounded-2xl border border-brand-primary/12 bg-white p-5 shadow-soft">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary">
                <Check className="h-4 w-4" /> {detail.topCardLabel ?? "What to expect"}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-brand-dark/80">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <article>
            <h2 className="section-title">What&apos;s Included</h2>
            <ul className="mt-6 space-y-3">
              {service.included.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-brand-primary/10 bg-white p-4">
                  <span className="mt-0.5 rounded-full bg-brand-light p-1 text-brand-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-relaxed text-brand-dark/80">{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article>
            <h2 className="section-title">Why It Matters</h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-brand-dark/80 md:text-base">
              {service.whyItMatters.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell py-6">
        <h2 className="section-title">Recent Project Examples</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {detail.gallery.map((src, index) => (
            <div key={`${src}-${index}`} className="overflow-hidden rounded-2xl border border-brand-primary/10 bg-white shadow-soft">
              <div className="relative h-64 w-full">
                <Image src={src} alt={`${service.name} project example ${index + 1}`} fill className="object-cover" />
              </div>
              <p className="px-4 py-3 text-sm font-semibold text-brand-dark">Project #{index + 1}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <article>
            <h2 className="section-title">Ideal For Properties That Need</h2>
            <ul className="mt-6 space-y-3">
              {detail.idealFor.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-brand-primary/10 bg-white p-4">
                  <span className="mt-0.5 rounded-full bg-brand-light p-1 text-brand-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-relaxed text-brand-dark/80">{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article>
            <h2 className="section-title">Common Questions</h2>
            <div className="mt-6 space-y-3">
              {detail.faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-brand-primary/10 bg-white p-4">
                  <p className="text-sm font-bold text-brand-dark">{faq.question}</p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-dark/75">{faq.answer}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell py-16">
        <h2 className="section-title">Related Services</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <ServiceCard
              key={item.slug}
              title={item.name}
              description={item.shortDescription}
              href={`/services/${item.slug}`}
              icon={getServiceIcon(item.slug)}
            />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
          <Link href="/areas/pottstown" className="text-brand-primary hover:text-brand-accent">
            {service.name} in Pottstown
          </Link>
          <Link href="/areas/royersford" className="text-brand-primary hover:text-brand-accent">
            {service.name} in Royersford
          </Link>
          <Link href="/areas/spring-city" className="text-brand-primary hover:text-brand-accent">
            {service.name} in Spring City
          </Link>
          <Link href="/resources" className="text-brand-primary hover:text-brand-accent">
            Landscaping resources and guides
          </Link>
        </div>
      </section>

      <section className="bg-brand-primary py-16 text-white">
        <div className="section-shell text-center">
          <h2 className="font-display text-3xl font-extrabold md:text-5xl">
            {detail.ctaTitle ?? `Need ${service.name.toLowerCase()} done right?`}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            {detail.ctaCopy ??
              "Get clear pricing, straightforward communication, and a crew that takes pride in the result."}
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              href="/contact#quote"
              ariaLabel={`Request quote for ${service.name}`}
              variant="secondary"
              trackEventName="cta_quote_click"
              trackEventParams={{ source: `service_bottom_${service.slug}` }}
            >
              {detail.ctaButtonLabel ?? "Get a Free Quote"}
            </Button>
          </div>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white">
            Prefer to talk first? Contact our team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
