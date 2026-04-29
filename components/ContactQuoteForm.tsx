"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Check, Loader2 } from "lucide-react";
import { services } from "@/data/services";
import { trackEvent } from "@/lib/analytics";

type ContactQuoteFormValues = {
  fullName: string;
  phone: string;
  address?: string;
  services: string[];
  email?: string;
  message?: string;
  preferredContact?: "text" | "call" | "email";
  website?: string;
};

const featuredServices = [
  "Spring Cleanup",
  "Mulching",
  "Bed Cleanup",
  "Bush Trimming",
  "Leaf Cleanup",
  "Brush Cleanup",
  "Planting",
  "Off-Site Removal"
];

export function ContactQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const hasTrackedStart = useRef(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactQuoteFormValues>({
    defaultValues: {
      services: [],
      preferredContact: "text",
      website: ""
    }
  });

  const selectedServices = watch("services") ?? [];

  const trackStartOnce = () => {
    if (hasTrackedStart.current) {
      return;
    }

    hasTrackedStart.current = true;
    trackEvent("lead_form_started", { source: "contact_page", variant: "contact_redesign" });
  };

  const toggleService = (serviceName: string) => {
    trackStartOnce();
    const next = selectedServices.includes(serviceName)
      ? selectedServices.filter((name) => name !== serviceName)
      : [...selectedServices, serviceName];

    setValue("services", next, { shouldDirty: true, shouldTouch: true });
    if (next.length > 0) {
      clearErrors("services");
    }
  };

  const onSubmit = async (values: ContactQuoteFormValues) => {
    setSubmissionError(null);

    if (!values.services.length) {
      setError("services", { type: "manual", message: "Please select at least one service." });
      trackEvent("lead_form_error", { source: "contact_page", variant: "contact_redesign", type: "validation" });
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          sourcePage: "contact_page",
          pageUrl: typeof window !== "undefined" ? window.location.href : ""
        })
      });

      if (!response.ok) {
        setSubmissionError("We couldn't submit right now. Text or call us directly and we'll help from there.");
        trackEvent("lead_form_error", {
          source: "contact_page",
          variant: "contact_redesign",
          type: "api_response",
          status: response.status
        });
        return;
      }

      setSubmitted(true);
      reset();
      trackEvent("lead_form_submitted", { source: "contact_page", variant: "contact_redesign" });
    } catch {
      setSubmissionError("We couldn't submit right now. Text or call us directly and we'll help from there.");
      trackEvent("lead_form_error", { source: "contact_page", variant: "contact_redesign", type: "network" });
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-brand-forest/15 bg-brand-bone p-8 text-center shadow-soft md:p-10">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-brand-forest/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-forest">
          <Check className="h-4 w-4" />
          Request received
        </p>
        <h3 className="mt-5 font-display text-3xl font-normal leading-tight tracking-[-0.02em] text-brand-ink">
          Thanks, we&apos;ll be in touch shortly.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-brand-ink/70">
          Our team usually responds within 24 hours, often much faster during business hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl bg-brand-bone p-6 shadow-[0_8px_32px_rgba(20,44,32,0.06)] md:p-12"
      aria-label="Contact quote request form"
    >
      <div className="space-y-6">
        <label className="block text-[0.82rem] font-bold tracking-[0.04em] text-brand-ink">
          Your name
          <input
            {...register("fullName", { required: "Please enter your name." })}
            onFocus={trackStartOnce}
            className="mt-2 w-full rounded-xl border border-brand-sage/35 bg-white px-4 py-3.5 text-base font-normal tracking-normal text-brand-ink outline-none transition focus:border-brand-forest focus:ring-4 focus:ring-brand-forest/10"
            placeholder="Jane Smith"
            autoComplete="name"
          />
          {errors.fullName ? <span className="mt-1 block text-xs text-red-600">{errors.fullName.message}</span> : null}
        </label>

        <label className="block text-[0.82rem] font-bold tracking-[0.04em] text-brand-ink">
          Phone number
          <input
            {...register("phone", {
              required: "Phone is required.",
              minLength: { value: 10, message: "Enter a valid phone number." }
            })}
            onFocus={trackStartOnce}
            className="mt-2 w-full rounded-xl border border-brand-sage/35 bg-white px-4 py-3.5 text-base font-normal tracking-normal text-brand-ink outline-none transition focus:border-brand-forest focus:ring-4 focus:ring-brand-forest/10"
            placeholder="(484) 555-1234"
            inputMode="tel"
            autoComplete="tel"
          />
          {errors.phone ? <span className="mt-1 block text-xs text-red-600">{errors.phone.message}</span> : null}
        </label>

        <label className="block text-[0.82rem] font-bold tracking-[0.04em] text-brand-ink">
          Property address
          <input
            {...register("address")}
            onFocus={trackStartOnce}
            className="mt-2 w-full rounded-xl border border-brand-sage/35 bg-white px-4 py-3.5 text-base font-normal tracking-normal text-brand-ink outline-none transition focus:border-brand-forest focus:ring-4 focus:ring-brand-forest/10"
            placeholder="Street, city"
            autoComplete="street-address"
          />
        </label>

        <fieldset>
          <legend className="text-[0.82rem] font-bold tracking-[0.04em] text-brand-ink">Services needed</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {featuredServices
              .filter((serviceName) => services.some((service) => service.name === serviceName))
              .map((serviceName) => {
                const checked = selectedServices.includes(serviceName);

                return (
                  <label
                    key={serviceName}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition hover:border-brand-forest ${
                      checked ? "border-brand-forest bg-brand-forest/5" : "border-brand-sage/35 bg-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleService(serviceName)}
                      className="sr-only"
                    />
                    <span
                      className={`flex h-[18px] w-[18px] flex-none items-center justify-center rounded-[5px] border transition ${
                        checked ? "border-brand-forest bg-brand-forest" : "border-brand-ink/45 bg-white"
                      }`}
                    >
                      <Check className={`h-3 w-3 text-white transition ${checked ? "opacity-100" : "opacity-0"}`} />
                    </span>
                    <span className="text-sm font-semibold text-brand-ink">{serviceName}</span>
                  </label>
                );
              })}
          </div>
          {errors.services ? <span className="mt-2 block text-xs text-red-600">{errors.services.message}</span> : null}
        </fieldset>

        <label className="block text-[0.82rem] font-bold tracking-[0.04em] text-brand-ink">
          Email <span className="ml-1 text-xs font-normal text-brand-ink/45">(optional)</span>
          <input
            type="email"
            {...register("email")}
            onFocus={trackStartOnce}
            className="mt-2 w-full rounded-xl border border-brand-sage/35 bg-white px-4 py-3.5 text-base font-normal tracking-normal text-brand-ink outline-none transition focus:border-brand-forest focus:ring-4 focus:ring-brand-forest/10"
            placeholder="you@email.com"
            autoComplete="email"
          />
        </label>

        <label className="block text-[0.82rem] font-bold tracking-[0.04em] text-brand-ink">
          Anything else? <span className="ml-1 text-xs font-normal text-brand-ink/45">(optional)</span>
          <textarea
            {...register("message")}
            onFocus={trackStartOnce}
            rows={4}
            className="mt-2 w-full resize-y rounded-xl border border-brand-sage/35 bg-white px-4 py-3.5 text-base font-normal tracking-normal text-brand-ink outline-none transition focus:border-brand-forest focus:ring-4 focus:ring-brand-forest/10"
            placeholder="Tell us what you're hoping to get done, or anything we should know about the property."
          />
        </label>

        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />

        <button
          type="submit"
          disabled={isSubmitting}
          onFocus={trackStartOnce}
          className="flex h-14 w-full items-center justify-center rounded-xl bg-brand-forest px-6 text-sm font-bold text-brand-cream transition hover:bg-[#142c20] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Quote Request...
            </>
          ) : (
            "Send Quote Request"
          )}
        </button>

        <p className="text-center text-xs text-brand-ink/50">No spam. Real follow-up from our local team.</p>

        {submissionError ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {submissionError}
          </p>
        ) : null}
      </div>
    </form>
  );
}
