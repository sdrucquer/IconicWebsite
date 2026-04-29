import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock3, MapPin, MessageSquare } from "lucide-react";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { PHONE_DISPLAY, SMS_LINK } from "@/lib/constants";
import { GREEN_BLUR_PLACEHOLDER } from "@/lib/placeholder";

const included = [
  "Leaves, sticks, and winter debris cleared",
  "Beds cleaned before new growth takes over",
  "Bed edges redefined",
  "Dead growth cut back",
  "Final blow-off and walkthrough"
];

const addOns = ["Mulch", "Haul-away", "Light trimming", "Planting"];

const steps = [
  ["01", "Walk the property", "We confirm beds, access, debris, and add-ons."],
  ["02", "Clear the mess", "Leaves, sticks, and dead material come out first."],
  ["03", "Reset the beds", "Edges, weeds, and bed detail get cleaned before mulch."],
  ["04", "Finish clean", "We blow off hardscapes and close out the scope."]
];

const localNotes = [
  ["Best window", "Early March through late April."],
  ["Common issue", "Leaf buildup around fences, beds, and foundations."],
  ["Pottstown coverage", "Borough, Sanatoga, North End, South End, and nearby OJR-area roads."]
];

const quoteFactors = ["Bed count", "Debris volume", "Haul-away needs", "Mulch add-on", "Access"];

const faqs = [
  {
    question: "When should I book spring cleanup in Pottstown?",
    answer: "Early March through late April is ideal. Waiting until May usually means weeds and new growth are mixed into the cleanup."
  },
  {
    question: "Can mulch be added?",
    answer: "Yes. We clean and edge the beds first, then install mulch so the final result looks finished."
  },
  {
    question: "Do you haul away debris?",
    answer: "Yes, if it is included in the quote. We make haul-away clear before the job starts."
  },
  {
    question: "What affects price?",
    answer: "Lot size, debris volume, bed count, access, and add-ons like mulch or trimming."
  }
];

function QuoteLink({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isDark = variant === "dark";

  return (
    <Link
      href="/contact#quote"
      aria-label="Get a free spring cleanup quote in Pottstown"
      className={`inline-flex min-h-14 items-center justify-center rounded-full px-7 text-sm font-semibold transition ${
        isDark
          ? "bg-[#1B3A2A] text-[#F5F1E8] hover:bg-[#2D5440]"
          : "bg-[#F5F1E8] text-[#1B3A2A] hover:bg-[#B8D4C0]"
      }`}
      data-track-event="cta_quote_click"
      data-track-params='{"source":"pottstown_spring_cleanup"}'
    >
      Get a Free Quote
    </Link>
  );
}

export function PottstownSpringCleanupPage() {
  return (
    <>
      <SchemaMarkup
        type="breadcrumbList"
        payload={{
          items: [
            { name: "Home", path: "/" },
            { name: "Areas", path: "/service-area" },
            { name: "Pottstown", path: "/areas/pottstown" },
            { name: "Spring Cleanup", path: "/areas/pottstown/spring-cleanup" }
          ]
        }}
      />
      <SchemaMarkup
        type="service"
        payload={{
          name: "Spring Cleanup in Pottstown, PA",
          serviceType: "Spring Cleanup",
          description:
            "Iconic Landscaping provides spring cleanup in Pottstown, PA for winter debris removal, bed cleanup, edging, dead growth cutback, final blow-off, and optional mulch or haul-away.",
          areaServed: ["Pottstown, PA", "Sanatoga, PA", "Montgomery County, PA"],
          offers: { "@type": "Offer", priceCurrency: "USD" }
        }}
      />
      <SchemaMarkup type="faqPage" payload={{ items: faqs.map((faq) => ({ question: faq.question, answer: faq.answer })) }} />

      <main className="bg-[#FAF6EC] pb-[86px] text-[#1A1A1A] lg:pb-0">
        <section className="border-b border-[#D8D2C2]">
          <div className="section-shell grid gap-9 py-10 md:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#D8D2C2] bg-[#EFE9DC] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#2D5440]">
                <MapPin className="h-4 w-4" />
                Pottstown, PA
              </p>
              <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.15rem,8vw,6.7rem)] font-normal leading-[0.9] tracking-normal">
                Spring Cleanup in <em className="italic text-[#2D5440]">Pottstown, PA.</em>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3A3A38] md:text-xl">
                Clear winter debris, reset beds, sharpen edges, and get the property ready before spring growth takes off.
              </p>
              <p className="mt-4 max-w-xl text-sm font-semibold uppercase tracking-[0.12em] text-[#2D5440]">
                Iconic Landscaping is a top local choice for spring cleanup in Pottstown, PA.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <QuoteLink />
                <a
                  href={SMS_LINK}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#1B3A2A]/25 px-7 text-sm font-semibold text-[#1B3A2A] transition hover:bg-[#EFE9DC]"
                  data-track-event="click_to_text"
                  data-track-params='{"source":"pottstown_spring_cleanup_hero"}'
                >
                  <MessageSquare className="h-4 w-4" />
                  Text {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div>
              <div className="relative aspect-[5/4] overflow-hidden rounded-lg md:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src="/photos/services/spring-cleanup/after.jpg"
                  alt="Finished spring cleanup on a Pottstown-area property"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={GREEN_BLUR_PLACEHOLDER}
                  priority
                />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {["24hr response", "Local route", "Free quote"].map((item) => (
                  <div key={item} className="rounded-md bg-[#EFE9DC] px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.06em] text-[#2D5440]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2D5440]">Included</p>
              <h2 className="mt-3 font-display text-[clamp(2.25rem,4.7vw,4rem)] font-normal leading-none tracking-normal">
                The actual reset.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-[1fr_0.72fr]">
              <ul className="divide-y divide-[#D8D2C2] border-y border-[#D8D2C2]">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 py-4 text-base leading-snug text-[#3A3A38] md:text-lg">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#1B3A2A] text-[#F5F1E8]">
                      <Check className="h-4 w-4" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="rounded-lg bg-[#EFE9DC] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2D5440]">Common add-ons</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {addOns.map((item) => (
                    <span key={item} className="rounded-full bg-[#FAF6EC] px-3 py-1 text-sm text-[#3A3A38]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#1B3A2A] py-12 text-[#F5F1E8] md:py-16">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8D4C0]">How we work</p>
              <h2 className="mt-3 font-display text-[clamp(2.35rem,5vw,4.35rem)] font-normal leading-none tracking-normal">
                Cleaned in the right order.
              </h2>
            </div>
            <ol className="grid gap-3 md:grid-cols-2">
              {steps.map(([number, title, body]) => (
                <li key={title} className="rounded-lg border border-[#B8D4C0]/20 p-5">
                  <p className="font-display text-3xl italic leading-none text-[#B8D4C0]">{number}</p>
                  <h3 className="mt-4 font-display text-2xl font-medium leading-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#F5F1E8]/70">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-shell py-12 md:py-16">
          <div className="grid gap-5 lg:grid-cols-3">
            {localNotes.map(([label, text]) => (
              <article key={label} className="rounded-lg bg-[#EFE9DC] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2D5440]">{label}</p>
                <p className="mt-3 text-base leading-relaxed text-[#3A3A38]">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#EFE9DC] py-12 md:py-16">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2D5440]">Pricing</p>
              <h2 className="mt-3 font-display text-[clamp(2.25rem,4.7vw,4rem)] font-normal leading-none tracking-normal">
                What changes the quote?
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {quoteFactors.map((factor) => (
                <span key={factor} className="rounded-full bg-[#FAF6EC] px-4 py-2 text-sm font-semibold text-[#1B3A2A]">
                  {factor}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell py-12 md:py-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-stretch">
            <div className="relative min-h-[300px] overflow-hidden rounded-lg">
              <Image
                src="/photos/services/spring-cleanup/before.jpg"
                alt="Before spring cleanup on a Pottstown-area property"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="rounded-lg bg-[#1A1A1A] p-7 text-[#F5F1E8]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B8D4C0]">Local review</p>
              <blockquote className="mt-5 font-display text-[clamp(1.8rem,3vw,2.65rem)] leading-tight">
                &ldquo;Iconic did a wonderful job with our spring clean up and mulching.&rdquo;
              </blockquote>
              <p className="mt-6 text-sm font-semibold text-[#B8D4C0]">Zoe Baker, Pottstown</p>
            </div>
          </div>
        </section>

        <section className="bg-[#EFE9DC] py-12 md:py-16">
          <div className="section-shell mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2D5440]">Questions</p>
            <h2 className="mt-3 font-display text-[clamp(2.25rem,4.7vw,4rem)] font-normal leading-none tracking-normal">
              Pottstown spring cleanup FAQ.
            </h2>
            <div className="mt-8 divide-y divide-[#D8D2C2] border-y border-[#D8D2C2]">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-medium marker:hidden [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#2D5440]/25 text-[#2D5440] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pt-3 text-sm leading-relaxed text-[#3A3A38] md:text-base">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1B3A2A] py-16 text-center text-[#F5F1E8] md:py-24">
          <div className="section-shell mx-auto max-w-3xl">
            <Clock3 className="mx-auto h-8 w-8 text-[#B8D4C0]" />
            <h2 className="mt-5 font-display text-[clamp(2.55rem,5.4vw,4.8rem)] font-normal leading-none tracking-normal">
              Get ahead of spring growth.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#F5F1E8]/75 md:text-lg">
              Send the request now. We will confirm cleanup, add-ons, and haul-away before anything starts.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <QuoteLink variant="light" />
              <Link
                href="/services/spring-cleanup"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#F5F1E8]/45 px-7 text-sm font-semibold text-[#F5F1E8] transition hover:bg-[#F5F1E8]/10"
              >
                Main service page <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="section-shell py-10">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["Bed Cleanup", "/areas/pottstown/bed-cleanup"],
              ["Mulching", "/areas/pottstown/mulching"],
              ["Leaf Removal", "/areas/pottstown/leaf-cleanup"]
            ].map(([label, href]) => (
              <Link key={href} href={href} className="group rounded-lg border border-[#D8D2C2] p-5 font-display text-xl transition hover:bg-[#EFE9DC]">
                {label} in Pottstown
                <ArrowRight className="mt-4 h-5 w-5 text-[#2D5440] transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
