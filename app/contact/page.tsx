import { Metadata } from "next";
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
import { ContactQuoteForm } from "@/components/ContactQuoteForm";
import { ContactServiceAreaMap } from "@/components/ContactServiceAreaMap";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { EMAIL, PHONE_DISPLAY, PHONE_LINK, SMS_LINK } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Iconic Landscaping",
  description:
    "Call, text, email, or request a quote from Iconic Landscaping in Pottstown, PA.",
  path: "/contact",
  ogImagePath: "/photos/edging-trim.jpg"
});

export default function ContactPage() {
  const contactMethods = [
    {
      label: "Text",
      value: PHONE_DISPLAY,
      text: "Most customers start here. Usually replies within the hour.",
      href: SMS_LINK,
      icon: MessageSquare,
      featured: true
    },
    {
      label: "Call",
      value: PHONE_DISPLAY,
      text: "Available during business hours. Talk through the project.",
      href: `tel:${PHONE_LINK}`,
      icon: Phone
    },
    {
      label: "Email",
      value: EMAIL,
      text: "Best for longer questions or attaching project photos.",
      href: `mailto:${EMAIL}`,
      icon: Mail
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="breadcrumbList"
        payload={{
          items: [
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" }
          ]
        }}
      />

      <header className="bg-brand-bone px-4 pb-10 pt-16 text-center md:px-8 md:pb-14 md:pt-24">
        <p className="mx-auto inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-brand-forest before:h-px before:w-7 before:bg-brand-forest after:h-px after:w-7 after:bg-brand-forest">
          Get In Touch
        </p>
        <h1 className="mx-auto mt-7 max-w-[14ch] font-display text-[clamp(2.75rem,6.5vw,5.25rem)] font-normal leading-none tracking-[-0.03em] text-brand-ink">
          How can we <em className="font-light italic text-brand-forest">help?</em>
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-display text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-brand-ink/78">
          Text, call, email, or send us a quick quote request. Whichever&apos;s easiest, we respond fast either way.
        </p>
        <p className="mt-6 inline-block rotate-[-2deg] font-display text-2xl italic text-brand-gold">
          pick your favorite
        </p>
      </header>

      <section className="bg-brand-bone px-4 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-3">
          {contactMethods.map((method) => {
            const Icon = method.icon;

            return (
              <a
                key={method.label}
                href={method.href}
                className={`group relative overflow-hidden rounded-3xl border p-8 text-left transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(20,44,32,0.08)] ${
                  method.featured
                    ? "border-brand-forest bg-brand-forest text-brand-cream"
                    : "border-brand-sage/35 bg-white text-brand-ink hover:border-brand-forest"
                }`}
                data-track-event={
                  method.label === "Text"
                    ? "click_to_text"
                    : method.label === "Call"
                      ? "click_to_call"
                      : "click_to_email"
                }
                data-track-params='{"source":"contact_page_quick_method"}'
              >
                <span
                  className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${
                    method.featured ? "bg-brand-cream/15 text-brand-sage" : "bg-brand-cream text-brand-forest"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={`flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.25em] ${
                    method.featured ? "text-brand-sage" : "text-brand-forest"
                  }`}
                >
                  {method.label}
                  {method.featured ? (
                    <span className="rounded-full bg-brand-gold px-2 py-0.5 text-[0.56rem] tracking-[0.15em] text-white">
                      Fastest
                    </span>
                  ) : null}
                </span>
                <span className="mt-3 block break-words font-display text-[clamp(1.35rem,2.2vw,1.65rem)] font-medium leading-tight tracking-[-0.015em]">
                  {method.value}
                </span>
                <span className={`mt-3 block max-w-sm text-sm leading-relaxed ${method.featured ? "text-brand-cream/80" : "text-brand-ink/70"}`}>
                  {method.text}
                </span>
                <ArrowRight
                  className={`absolute bottom-8 right-8 h-5 w-5 transition group-hover:translate-x-1 ${
                    method.featured ? "text-brand-sage" : "text-brand-ink/45"
                  }`}
                />
              </a>
            );
          })}
        </div>
      </section>

      <section id="quote" className="scroll-mt-28 bg-brand-cream px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-brand-forest">Or Start a Quote</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight tracking-[-0.025em] text-brand-ink">
              Send the <em className="italic text-brand-forest">details.</em>
            </h2>
            <p className="mt-4 font-display text-[1.05rem] leading-relaxed text-brand-ink/72">
              Quick form. We&apos;ll text or call back, usually within the hour.
            </p>
          </div>

          <ContactQuoteForm />
        </div>
      </section>

      <section className="border-y border-brand-sage/30 bg-brand-bone px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 text-center md:grid-cols-3 md:gap-14">
          {[
            { value: "4.6", accent: "stars", label: "Across 56+ Reviews" },
            { value: "500", accent: "+", label: "Customers Since 2023" },
            { value: "< 24", accent: "hr", label: "Typical Response Time" }
          ].map((stat) => (
            <article key={stat.label}>
              <p className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-none tracking-[-0.025em] text-brand-ink">
                {stat.value}
                <em className="ml-1 italic text-brand-forest">{stat.accent}</em>
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink/50">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-bone px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-brand-forest">Where We&apos;re Based</p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-tight tracking-[-0.02em] text-brand-ink">
              Pottstown, <em className="italic text-brand-forest">PA.</em>
            </h2>
            <p className="mt-3 font-display text-base text-brand-ink/72">Serving Montgomery, Chester &amp; Berks Counties.</p>
          </div>

          <ContactServiceAreaMap />

          <div className="mt-8 text-center">
            <a
              href="/service-area"
              className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.04em] text-brand-forest transition hover:gap-3"
            >
              See our full service area
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
