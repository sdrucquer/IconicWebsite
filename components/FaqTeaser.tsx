import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FaqTeaser({
  title = "Questions before you book?",
  description = "Review common service questions and get clear answers before requesting your quote."
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="rounded-2xl border border-brand-primary/15 bg-white p-6 shadow-soft md:p-7">
      <h2 className="font-display text-2xl font-extrabold text-brand-dark md:text-3xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-dark/75 md:text-base">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-light px-5 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-white"
        >
          Browse service FAQs <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/contact#quote"
          className="inline-flex items-center gap-2 rounded-full border border-brand-primary bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent"
          data-track-event="cta_quote_click"
          data-track-params='{"source":"faq_teaser"}'
        >
          Start your quote
        </Link>
      </div>
    </section>
  );
}
