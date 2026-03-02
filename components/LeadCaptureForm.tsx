"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, ChevronDown, Loader2, MessageSquare, Phone } from "lucide-react";
import { services } from "@/data/services";
import { trackEvent } from "@/lib/analytics";
import { PHONE_DISPLAY, PHONE_LINK, SMS_LINK } from "@/lib/constants";
import { JobberQuoteCta } from "@/components/JobberQuoteCta";

type LeadCaptureFormProps = {
  source: string;
  variant?: "compact" | "full";
  className?: string;
};

type LeadFormValues = {
  fullName: string;
  phone: string;
  services: string[];
  email?: string;
  address?: string;
  timeline?: string;
  message?: string;
  preferredContact?: "text" | "call" | "email";
  website?: string;
};

const timelineOptions = [
  "ASAP",
  "This week",
  "Within 2 weeks",
  "This month",
  "Just planning"
];

export function LeadCaptureForm({ source, variant = "full", className = "" }: LeadCaptureFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(variant === "full");
  const [servicesOpen, setServicesOpen] = useState(false);
  const hasTrackedStart = useRef(false);
  const hasTrackedView = useRef(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const servicesDropdownRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
    reset
  } = useForm<LeadFormValues>({
    defaultValues: {
      services: [],
      preferredContact: "text",
      website: ""
    }
  });
  const selectedServices = watch("services");

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !hasTrackedView.current) {
          hasTrackedView.current = true;
          trackEvent("lead_form_viewed", { source, variant });
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [source, variant]);

  useEffect(() => {
    if (!servicesOpen) {
      return;
    }

    const onClickOutside = (event: MouseEvent) => {
      if (!servicesDropdownRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [servicesOpen]);

  useEffect(() => {
    register("services");
  }, [register]);

  const trackStartOnce = () => {
    if (hasTrackedStart.current) {
      return;
    }

    hasTrackedStart.current = true;
    trackEvent("lead_form_started", { source, variant });
  };

  const onValidSubmit = async (values: LeadFormValues) => {
    setSubmissionError(null);
    if (!values.services || values.services.length === 0) {
      setError("services", { type: "manual", message: "Please select at least one service." });
      trackEvent("lead_form_error", { source, variant, type: "validation" });
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          sourcePage: source,
          pageUrl: typeof window !== "undefined" ? window.location.href : ""
        })
      });

      if (!response.ok) {
        trackEvent("lead_form_error", { source, variant, type: "api_response", status: response.status });
        setSubmissionError("We couldn't submit right now. You can call or text us directly below.");
        return;
      }

      setSubmitted(true);
      reset();
      trackEvent("lead_form_submitted", { source, variant });
    } catch {
      trackEvent("lead_form_error", { source, variant, type: "network" });
      setSubmissionError("We couldn't submit right now. You can call or text us directly below.");
    }
  };

  const onInvalidSubmit = () => {
    trackEvent("lead_form_error", { source, variant, type: "validation" });
  };

  const toggleService = (serviceName: string) => {
    const current = selectedServices ?? [];
    const next = current.includes(serviceName)
      ? current.filter((name) => name !== serviceName)
      : [...current, serviceName];

    setValue("services", next, { shouldDirty: true, shouldTouch: true, shouldValidate: false });
    if (next.length > 0) {
      clearErrors("services");
    }
  };

  if (submitted) {
    return (
      <div className={`rounded-2xl border border-brand-primary/15 bg-white p-6 text-brand-dark shadow-soft ${className}`} ref={rootRef}>
        <p className="inline-flex items-center gap-2 rounded-full bg-[#ebf5ec] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-brand-primary">
          <CheckCircle2 className="h-4 w-4" /> Request received
        </p>
        <h3 className="mt-4 font-display text-2xl font-extrabold md:text-3xl">Thanks, we got your quote request.</h3>
        <p className="mt-3 text-sm leading-relaxed text-brand-dark/75 md:text-base">
          Our team usually responds within 24 hours. If you want to share extra photos or details now, you can open the Jobber form directly.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={`tel:${PHONE_LINK}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-brand-primary/20 px-4 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-light"
            data-track-event="click_to_call"
            data-track-params={`{"source":"${source}_success"}`}
          >
            <Phone className="h-4 w-4 text-brand-primary" /> Call {PHONE_DISPLAY}
          </a>
          <a
            href={SMS_LINK}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-brand-primary/20 px-4 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-light"
            data-track-event="click_to_text"
            data-track-params={`{"source":"${source}_success"}`}
          >
            <MessageSquare className="h-4 w-4 text-brand-primary" /> Text {PHONE_DISPLAY}
          </a>
          <JobberQuoteCta
            source={`${source}_success_jobber`}
            label="Open Jobber Form"
            className="inline-flex h-11 items-center justify-center rounded-full bg-brand-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-accent"
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={className}>
      <form
        onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
        className="space-y-4 rounded-2xl border border-brand-primary/15 bg-white p-5 shadow-soft md:p-6"
        aria-label="Lead capture form"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold text-brand-dark">
            Full name
            <input
              {...register("fullName", { required: "Please enter your name." })}
              onFocus={trackStartOnce}
              className="mt-2 w-full rounded-xl border border-brand-primary/20 px-4 py-3 text-sm outline-none ring-brand-primary/20 transition focus:ring"
              placeholder="Jane Smith"
              autoComplete="name"
            />
            {errors.fullName ? <span className="mt-1 block text-xs text-red-600">{errors.fullName.message}</span> : null}
          </label>

          <label className="text-sm font-semibold text-brand-dark">
            Phone number
            <input
              {...register("phone", {
                required: "Phone is required.",
                minLength: { value: 10, message: "Enter a valid phone number." }
              })}
              onFocus={trackStartOnce}
              className="mt-2 w-full rounded-xl border border-brand-primary/20 px-4 py-3 text-sm outline-none ring-brand-primary/20 transition focus:ring"
              placeholder="(484) 555-1234"
              inputMode="tel"
              autoComplete="tel"
            />
            {errors.phone ? <span className="mt-1 block text-xs text-red-600">{errors.phone.message}</span> : null}
          </label>
        </div>

        <fieldset>
          <legend className="text-sm font-semibold text-brand-dark">Services needed (select all that apply)</legend>
          <div className="relative mt-2" ref={servicesDropdownRef}>
            <button
              type="button"
              onClick={() => {
                trackStartOnce();
                setServicesOpen((current) => !current);
              }}
              className="flex w-full items-center justify-between rounded-xl border border-brand-primary/20 bg-white px-4 py-3 text-left text-sm text-brand-dark outline-none ring-brand-primary/20 transition focus:ring"
              aria-haspopup="listbox"
              aria-expanded={servicesOpen}
            >
              <span className="truncate">
                {selectedServices?.length
                  ? `${selectedServices.length} service${selectedServices.length > 1 ? "s" : ""} selected`
                  : "Select services"}
              </span>
              <ChevronDown className={`h-4 w-4 flex-none transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen ? (
              <div className="absolute z-20 mt-2 max-h-56 w-full overflow-y-auto rounded-xl border border-brand-primary/20 bg-white p-2 shadow-card">
                {services.map((service) => (
                  <label
                    key={service.slug}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm text-brand-dark hover:bg-brand-light"
                  >
                    <input
                      type="checkbox"
                      checked={(selectedServices ?? []).includes(service.name)}
                      onChange={() => toggleService(service.name)}
                      className="h-4 w-4 accent-brand-primary"
                    />
                    <span>{service.name}</span>
                  </label>
                ))}
              </div>
            ) : null}
          </div>
          {errors.services ? <span className="mt-1 block text-xs text-red-600">{errors.services.message}</span> : null}
        </fieldset>

        {variant === "compact" ? (
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-accent"
            onClick={() => setDetailsOpen((current) => !current)}
          >
            {detailsOpen ? "Hide optional details" : "Add optional details"}
            <ChevronDown className={`h-4 w-4 transition-transform ${detailsOpen ? "rotate-180" : ""}`} />
          </button>
        ) : null}

        {detailsOpen ? (
          <div className="space-y-4 rounded-xl border border-brand-primary/10 bg-brand-light/40 p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-brand-dark">
                Email (optional)
                <input
                  type="email"
                  {...register("email")}
                  onFocus={trackStartOnce}
                  className="mt-2 w-full rounded-xl border border-brand-primary/20 bg-white px-4 py-3 text-sm outline-none ring-brand-primary/20 transition focus:ring"
                  placeholder="you@email.com"
                  autoComplete="email"
                />
              </label>

              <label className="text-sm font-semibold text-brand-dark">
                Timeline (optional)
                <select
                  {...register("timeline")}
                  onFocus={trackStartOnce}
                  className="mt-2 w-full rounded-xl border border-brand-primary/20 bg-white px-4 py-3 text-sm outline-none ring-brand-primary/20 transition focus:ring"
                  defaultValue=""
                >
                  <option value="">Select timeline</option>
                  {timelineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block text-sm font-semibold text-brand-dark">
              Property address (optional)
              <input
                {...register("address")}
                onFocus={trackStartOnce}
                className="mt-2 w-full rounded-xl border border-brand-primary/20 bg-white px-4 py-3 text-sm outline-none ring-brand-primary/20 transition focus:ring"
                placeholder="Street, city"
                autoComplete="street-address"
              />
            </label>

            <label className="block text-sm font-semibold text-brand-dark">
              Project details (optional)
              <textarea
                {...register("message")}
                onFocus={trackStartOnce}
                rows={4}
                className="mt-2 w-full rounded-xl border border-brand-primary/20 bg-white px-4 py-3 text-sm outline-none ring-brand-primary/20 transition focus:ring"
                placeholder="Tell us what you'd like done, priorities, and anything we should know."
              />
            </label>

            <fieldset>
              <legend className="text-sm font-semibold text-brand-dark">Best way to reach you</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  { value: "text", label: "Text" },
                  { value: "call", label: "Call" },
                  { value: "email", label: "Email" }
                ].map((option) => (
                  <label key={option.value} className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-white px-3 py-2 text-sm text-brand-dark">
                    <input
                      type="radio"
                      value={option.value}
                      {...register("preferredContact")}
                      onFocus={trackStartOnce}
                      className="h-4 w-4 accent-brand-primary"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        ) : null}

        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-70"
          onFocus={trackStartOnce}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending request...
            </>
          ) : (
            "Request My Quote"
          )}
        </button>

        <p className="text-xs text-brand-dark/65">No spam. Real follow-up from our local team.</p>
      </form>

      {submissionError ? (
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p>{submissionError}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href={`tel:${PHONE_LINK}`}
              className="font-semibold text-brand-primary hover:text-brand-accent"
              data-track-event="click_to_call"
              data-track-params={`{"source":"${source}_error"}`}
            >
              Call {PHONE_DISPLAY}
            </a>
            <a
              href={SMS_LINK}
              className="font-semibold text-brand-primary hover:text-brand-accent"
              data-track-event="click_to_text"
              data-track-params={`{"source":"${source}_error"}`}
            >
              Text {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
