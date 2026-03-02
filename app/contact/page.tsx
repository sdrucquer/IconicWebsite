import { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { FaqTeaser } from "@/components/FaqTeaser";
import { JobberQuoteEmbed } from "@/components/JobberQuoteEmbed";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { TrustProofPanel } from "@/components/TrustProofPanel";
import { EMAIL, PHONE_DISPLAY, PHONE_LINK } from "@/lib/constants";
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

      <section className="section-shell py-20">
        <h1 className="section-title">Contact Iconic Landscaping in Pottstown, PA</h1>
        <p className="section-subtitle">Reach our team directly or submit a quote request below.</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <aside className="space-y-4 rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-soft lg:col-span-1">
            <a
              href={`tel:${PHONE_LINK}`}
              className="flex items-center gap-3 rounded-xl border border-brand-primary/10 p-4 text-sm font-semibold text-brand-dark hover:bg-brand-light"
              aria-label="Call Iconic Landscaping"
              data-track-event="click_to_call"
              data-track-params='{"source":"contact_page"}'
            >
              <Phone className="h-4 w-4 text-brand-primary" /> {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-3 rounded-xl border border-brand-primary/10 p-4 text-sm font-semibold text-brand-dark hover:bg-brand-light"
              aria-label="Email Iconic Landscaping"
              data-track-event="click_to_email"
            >
              <Mail className="h-4 w-4 text-brand-primary" /> {EMAIL}
            </a>
          </aside>

          <div className="lg:col-span-2">
            <JobberQuoteEmbed
              title="Request a Quote"
              subtitle="Share your project details and we will follow up quickly."
              showCallFallback
            />
          </div>
        </div>

        <div className="mt-10 grid gap-6">
          <TrustProofPanel title="Why homeowners trust our team" />
          <FaqTeaser />
        </div>
      </section>
    </>
  );
}
