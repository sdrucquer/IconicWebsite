import { Metadata } from "next";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { FaqTeaser } from "@/components/FaqTeaser";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { TrustProofPanel } from "@/components/TrustProofPanel";
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

      <section className="section-shell py-14 md:py-20 lg:py-24 xl:py-28">
        <div
          id="quote"
          className="mx-auto max-w-4xl rounded-2xl border border-brand-primary/15 border-t-4 border-t-brand-primary bg-white p-6 shadow-card md:p-8 lg:max-w-6xl lg:p-10 xl:p-12"
        >
          <p className="inline-flex rounded-full border border-brand-primary/20 bg-brand-light px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-brand-primary/80">
            Fast response. No spam.
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-brand-dark md:text-4xl lg:text-5xl">
            Start Your Quote with Iconic Landscaping
          </h1>
          <p className="mt-3 text-base leading-relaxed text-brand-dark/75 lg:text-lg">
            Tell us what you need and we&apos;ll follow up quickly with clear next steps.
          </p>

          <LeadCaptureForm source="contact_page" variant="full" className="mt-6" />

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-brand-dark/80">
            <a
              href={`tel:${PHONE_LINK}`}
              className="inline-flex items-center gap-2 font-semibold text-brand-primary hover:text-brand-accent"
              aria-label="Call Iconic Landscaping"
              data-track-event="click_to_call"
              data-track-params='{"source":"contact_page"}'
            >
              <Phone className="h-4 w-4" /> Call {PHONE_DISPLAY}
            </a>
            <span className="hidden text-brand-dark/35 sm:inline">•</span>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 font-semibold text-brand-primary hover:text-brand-accent"
              aria-label="Email Iconic Landscaping"
              data-track-event="click_to_email"
              data-track-params='{"source":"contact_page"}'
            >
              <Mail className="h-4 w-4" /> {EMAIL}
            </a>
            <span className="hidden text-brand-dark/35 sm:inline">•</span>
            <a
              href={SMS_LINK}
              className="inline-flex items-center gap-2 font-semibold text-brand-primary hover:text-brand-accent"
              aria-label={`Text Iconic Landscaping at ${PHONE_DISPLAY}`}
              data-track-event="click_to_text"
              data-track-params='{"source":"contact_page"}'
            >
              <MessageSquare className="h-4 w-4" /> Text {PHONE_DISPLAY}
            </a>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <article className="rounded-xl border border-brand-primary/10 bg-brand-light p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary/75">Google Rating</p>
              <p className="mt-1 text-lg font-extrabold text-brand-dark">4.6 stars</p>
            </article>
            <article className="rounded-xl border border-brand-primary/10 bg-brand-light p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary/75">Customers Served</p>
              <p className="mt-1 text-lg font-extrabold text-brand-dark">500+</p>
            </article>
            <article className="rounded-xl border border-brand-primary/10 bg-brand-light p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary/75">Typical Reply</p>
              <p className="mt-1 text-lg font-extrabold text-brand-dark">Within 24 hours</p>
            </article>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:mt-12 lg:gap-8">
          <TrustProofPanel title="Why homeowners trust our team" />
          <FaqTeaser />
        </div>
      </section>
    </>
  );
}
