"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { services } from "@/data/services";
import { QUOTE_URL } from "@/lib/constants";

type ContactFormValues = {
  name: string;
  address: string;
  phone: string;
  email: string;
  servicesInterestedIn: string[];
  message: string;
  referral: "Facebook" | "Google" | "Friend/Family" | "Saw us working" | "Other";
};

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactFormValues>({
    defaultValues: {
      servicesInterestedIn: []
    }
  });

  useEffect(() => {
    if (!submitted) {
      return;
    }

    const timer = setTimeout(() => {
      window.location.href = QUOTE_URL;
    }, 1200);

    return () => clearTimeout(timer);
  }, [submitted]);

  const onSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand-primary/15 bg-white p-8 text-center shadow-soft">
        <h2 className="text-2xl font-bold text-brand-dark">Thank you. We&apos;ll be in touch shortly.</h2>
        <p className="mt-3 text-sm text-brand-dark/75">Redirecting you to our quote portal now...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-brand-primary/15 bg-white p-6 shadow-soft md:p-8" aria-label="Contact quote form">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm font-medium text-brand-dark">
          Name
          <input
            {...register("name", { required: "Name is required" })}
            className="mt-2 w-full rounded-xl border border-brand-primary/20 px-4 py-3 text-sm outline-none ring-brand-primary/25 focus:ring"
            aria-label="Name"
          />
          {errors.name && <span className="mt-1 block text-xs text-red-600">{errors.name.message}</span>}
        </label>

        <label className="text-sm font-medium text-brand-dark">
          Address
          <input
            {...register("address", { required: "Address is required" })}
            className="mt-2 w-full rounded-xl border border-brand-primary/20 px-4 py-3 text-sm outline-none ring-brand-primary/25 focus:ring"
            aria-label="Address"
          />
          {errors.address && <span className="mt-1 block text-xs text-red-600">{errors.address.message}</span>}
        </label>

        <label className="text-sm font-medium text-brand-dark">
          Phone
          <input
            {...register("phone", { required: "Phone is required" })}
            className="mt-2 w-full rounded-xl border border-brand-primary/20 px-4 py-3 text-sm outline-none ring-brand-primary/25 focus:ring"
            aria-label="Phone"
          />
          {errors.phone && <span className="mt-1 block text-xs text-red-600">{errors.phone.message}</span>}
        </label>

        <label className="text-sm font-medium text-brand-dark">
          Email
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="mt-2 w-full rounded-xl border border-brand-primary/20 px-4 py-3 text-sm outline-none ring-brand-primary/25 focus:ring"
            aria-label="Email"
          />
          {errors.email && <span className="mt-1 block text-xs text-red-600">{errors.email.message}</span>}
        </label>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-brand-dark">Services Interested In</legend>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {services.map((service) => (
            <label key={service.slug} className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/15 px-3 py-2 text-sm">
              <input type="checkbox" value={service.name} {...register("servicesInterestedIn")} aria-label={service.name} />
              {service.name}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block text-sm font-medium text-brand-dark">
        Message
        <textarea
          {...register("message")}
          rows={4}
          className="mt-2 w-full rounded-xl border border-brand-primary/20 px-4 py-3 text-sm outline-none ring-brand-primary/25 focus:ring"
          aria-label="Message"
        />
      </label>

      <label className="block text-sm font-medium text-brand-dark">
        How did you hear about us?
        <select
          {...register("referral", { required: "Please select an option" })}
          className="mt-2 w-full rounded-xl border border-brand-primary/20 px-4 py-3 text-sm outline-none ring-brand-primary/25 focus:ring"
          aria-label="How did you hear about us"
        >
          <option value="">Select one</option>
          <option value="Facebook">Facebook</option>
          <option value="Google">Google</option>
          <option value="Friend/Family">Friend/Family</option>
          <option value="Saw us working">Saw us working</option>
          <option value="Other">Other</option>
        </select>
        {errors.referral && <span className="mt-1 block text-xs text-red-600">{errors.referral.message}</span>}
      </label>

      <button
        type="submit"
        className="inline-flex rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary"
        aria-label="Submit quote request"
      >
        Submit and Continue
      </button>
    </form>
  );
}
