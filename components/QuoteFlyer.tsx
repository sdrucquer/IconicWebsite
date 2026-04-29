"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle, Phone, Star } from "lucide-react";
import { PHONE_DISPLAY, PHONE_LINK } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Static content
// ---------------------------------------------------------------------------

const SERVICES = [
  "Bed Cleanup",
  "Mulching",
  "Edging",
  "Bush Trimming",
  "Spring Cleanup",
  "Fall Cleanup",
  "General Landscaping",
  "Not Sure — Help Me Figure It Out",
];

const BEFORE_AFTER = [
  {
    label: "Bed Cleanup",
    before: "/photos/services/bed-cleanup/before.jpg",
    after: "/photos/services/bed-cleanup/after.jpg",
  },
  {
    label: "Bush Trimming",
    before: "/photos/services/bush-trimming/before.jpg",
    after: "/photos/services/bush-trimming/after.jpg",
  },
  {
    label: "Leaf Cleanup",
    before: "/photos/services/leaf-cleanup/before.jpg",
    after: "/photos/services/leaf-cleanup/after.jpg",
  },
];

const REVIEWS = [
  {
    quote:
      "I was very impressed with response times, scheduling and updates. The crew was polite, respectful and went above and beyond my expectations.",
    author: "Wendy Hanna",
    location: "Royersford",
    stars: 5,
    service: "Seasonal cleanup",
  },
  {
    quote:
      "Iconic did a wonderful job with our spring clean up and mulching. They were professional, dependable and hardworking.",
    author: "Zoe Baker",
    location: "Pottstown",
    stars: 5,
    service: "Cleanup & mulch",
  },
  {
    quote:
      "These guys were on point! They arrived early, had everything they needed, asked questions about what exactly we wanted and made our lives 100 times easier.",
    author: "Philip Brady",
    location: "Chester Springs",
    stars: 5,
    service: "Property cleanup",
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-brand-gold" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4" fill={i < count ? "currentColor" : "none"} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Form types
// ---------------------------------------------------------------------------

type FormData = {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  phone: string;
  serviceNeeded: string;
  notes: string;
  email: string;
  referredBy: string;
  _hp: string; // honeypot — must stay empty
};

const inputBase =
  "w-full px-4 py-3.5 rounded-xl border bg-white placeholder:text-brand-ink/30 focus:outline-none focus:ring-4 focus:ring-brand-forest/10 transition text-brand-ink";
const inputDefault = "border-brand-sage/35 focus:border-brand-forest";
const inputError = "border-red-400";

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function QuoteFlyer() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { serviceNeeded: "", referredBy: "unknown" },
  });

  // Capture the ?ref= crew-member param from the URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setValue("referredBy", ref.toLowerCase().trim());
  }, [setValue]);

  async function onSubmit(data: FormData) {
    setSubmitError("");
    try {
      const res = await fetch("/api/submit-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Unknown error");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError(
        `Something went wrong. Please call us directly at ${PHONE_DISPLAY}.`
      );
    }
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* ── Logo bar ──────────────────────────────────────────────────────── */}
      <header className="bg-brand-cream border-b border-brand-sage/20 py-4 px-4">
        <div className="flex justify-center">
          <Image
            src="/brand/iconic-logo-wordmark-optimized.png"
            alt="Iconic Landscaping"
            width={160}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-4 pt-10 pb-6 text-center max-w-xl mx-auto">
        <p className="meta text-brand-forest mb-3">Free Estimate · No Obligation</p>
        <h1 className="font-display text-[clamp(2rem,6vw,3rem)] font-semibold text-brand-ink leading-tight tracking-tight mb-3">
          Get Your Free Quote
        </h1>
        <p className="lede text-brand-ink/55 mb-7">
          Serving Pottstown, Royersford, Spring City, Chester Springs &amp; surrounding areas
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="inline-flex items-center gap-1.5 bg-white border border-brand-sage/30 rounded-full px-3 py-1.5 text-sm font-medium text-brand-ink shadow-sm">
            <Star className="w-3.5 h-3.5 text-brand-gold fill-current shrink-0" />
            4.6 Rating · 56+ Reviews
          </span>
          <span className="inline-flex items-center bg-white border border-brand-sage/30 rounded-full px-3 py-1.5 text-sm font-medium text-brand-ink shadow-sm">
            500+ Customers Served
          </span>
          <span className="inline-flex items-center bg-white border border-brand-sage/30 rounded-full px-3 py-1.5 text-sm font-medium text-brand-ink shadow-sm">
            Reply Within 2 Hours
          </span>
        </div>
      </section>

      {/* ── Form ──────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-14 max-w-xl mx-auto">
        {submitted ? (
          /* Success state */
          <div className="bg-white rounded-3xl shadow-[0_8px_32px_rgba(20,44,32,0.07)] border border-brand-sage/20 p-8 text-center">
            <div className="w-16 h-16 bg-brand-forest/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-brand-forest" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-brand-ink mb-2">
              You&apos;re all set!
            </h2>
            <p className="text-brand-ink/60">
              Thanks! We&apos;ll be in touch within 2 business hours.
            </p>
          </div>
        ) : (
          /* Form card */
          <div className="bg-white rounded-3xl shadow-[0_8px_32px_rgba(20,44,32,0.07)] border border-brand-sage/20 p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-brand-ink mb-1">
              Tell us about your property
            </h2>
            <p className="text-sm text-brand-ink/50 mb-6">
              Takes 60 seconds. We&apos;ll reach out with a fair price.
            </p>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              {/* Hidden fields */}
              <input type="hidden" {...register("referredBy")} />
              {/* Honeypot — bots fill this; browsers skip display:none fields */}
              <div style={{ display: "none" }} aria-hidden="true">
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("_hp")}
                />
              </div>

              {/* First + Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-brand-ink mb-1.5">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className={`${inputBase} ${errors.firstName ? inputError : inputDefault}`}
                    {...register("firstName", { required: "Required" })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-ink mb-1.5">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Smith"
                    className={`${inputBase} ${errors.lastName ? inputError : inputDefault}`}
                    {...register("lastName", { required: "Required" })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-sm font-medium text-brand-ink mb-1.5">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="123 Oak Street"
                  className={`${inputBase} ${errors.streetAddress ? inputError : inputDefault}`}
                  {...register("streetAddress", { required: "Address is required" })}
                />
                {errors.streetAddress && (
                  <p className="text-red-500 text-xs mt-1">{errors.streetAddress.message}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-brand-ink mb-1.5">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Pottstown"
                  className={`${inputBase} ${errors.city ? inputError : inputDefault}`}
                  {...register("city", { required: "City is required" })}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-brand-ink mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="(484) 000-0000"
                  className={`${inputBase} ${errors.phone ? inputError : inputDefault}`}
                  {...register("phone", {
                    required: "Phone is required",
                    minLength: { value: 10, message: "Enter a valid phone number" },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Service Needed */}
              <div>
                <label className="block text-sm font-medium text-brand-ink mb-1.5">
                  Service Needed <span className="text-red-500">*</span>
                </label>
                <select
                  className={`${inputBase} appearance-none cursor-pointer ${
                    errors.serviceNeeded ? inputError : inputDefault
                  }`}
                  {...register("serviceNeeded", { required: "Please select a service" })}
                >
                  <option value="" disabled>
                    Select a service…
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.serviceNeeded && (
                  <p className="text-red-500 text-xs mt-1">{errors.serviceNeeded.message}</p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-brand-ink mb-1.5">
                  Additional Notes{" "}
                  <span className="text-brand-ink/40 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Anything else we should know about your property?"
                  className={`${inputBase} ${inputDefault} resize-none`}
                  {...register("notes")}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-brand-ink mb-1.5">
                  Email{" "}
                  <span className="text-brand-ink/40 font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={`${inputBase} ${inputDefault}`}
                  {...register("email")}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-brand-forest text-brand-cream font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-moss transition-colors disabled:opacity-60 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-brand-cream/40 border-t-brand-cream rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Request My Free Quote →"
                )}
              </button>

              <p className="text-center text-xs text-brand-ink/40 pt-1">
                No spam. We&apos;ll only contact you about your quote.
              </p>
            </form>
          </div>
        )}
      </section>

      {/* ── Before / After ────────────────────────────────────────────────── */}
      <section className="bg-brand-bone border-y border-brand-sage/15 px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <p className="meta text-brand-forest mb-2">Real Results</p>
            <h2 className="font-display text-[clamp(1.5rem,4vw,2.25rem)] font-semibold text-brand-ink leading-tight">
              See What We Can Do
            </h2>
          </div>

          <div className="space-y-5">
            {BEFORE_AFTER.map((pair) => (
              <div key={pair.label}>
                <p className="text-xs font-medium text-brand-ink/50 uppercase tracking-widest mb-2 text-center">
                  {pair.label}
                </p>
                <div className="grid grid-cols-2 gap-1.5 rounded-2xl overflow-hidden">
                  <Image
                    src={pair.before}
                    alt={`${pair.label} — before`}
                    width={400}
                    height={300}
                    className="w-full h-40 sm:h-52 object-cover"
                  />
                  <Image
                    src={pair.after}
                    alt={`${pair.label} — after`}
                    width={400}
                    height={300}
                    className="w-full h-40 sm:h-52 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ───────────────────────────────────────────────────────── */}
      <section className="px-4 py-12 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="meta text-brand-forest mb-2">Customer Reviews</p>
          <h2 className="font-display text-[clamp(1.5rem,4vw,2.25rem)] font-semibold text-brand-ink leading-tight">
            What Our Neighbors Say
          </h2>
        </div>

        <div className="space-y-4">
          {REVIEWS.map((review) => (
            <div
              key={review.author}
              className="bg-white rounded-2xl p-5 border border-brand-sage/20 shadow-[0_4px_16px_rgba(20,44,32,0.04)]"
            >
              <Stars count={review.stars} />
              <blockquote className="font-display italic text-brand-ink text-base leading-relaxed mt-3 mb-3">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="text-sm font-medium text-brand-ink">
                  {review.author}{" "}
                  <span className="text-brand-ink/50 font-normal">· {review.location}</span>
                </p>
                <span className="text-xs text-brand-ink/45 border border-brand-sage/25 rounded-full px-2.5 py-0.5 shrink-0">
                  {review.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Second CTA below reviews */}
        <div className="mt-8 text-center">
          <p className="text-sm text-brand-ink/50 mb-4">Ready to get started?</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 bg-brand-forest text-brand-cream font-semibold rounded-xl px-6 py-3.5 hover:bg-brand-moss transition-colors text-sm"
          >
            Request My Free Quote →
          </button>
        </div>
      </section>

      {/* ── Footer bar ────────────────────────────────────────────────────── */}
      <footer className="bg-brand-forest text-brand-cream/75 py-5 px-4 text-center text-sm">
        <p className="font-medium text-brand-cream mb-1.5">Iconic Landscaping · Pottstown, PA</p>
        <p className="flex items-center justify-center gap-2 flex-wrap">
          <span>Licensed &amp; Insured</span>
          <span className="opacity-40">·</span>
          <a
            href={`tel:${PHONE_LINK}`}
            className="text-brand-cream/90 hover:text-brand-cream transition-colors inline-flex items-center gap-1"
          >
            <Phone className="w-3.5 h-3.5" />
            {PHONE_DISPLAY}
          </a>
        </p>
      </footer>
    </div>
  );
}
