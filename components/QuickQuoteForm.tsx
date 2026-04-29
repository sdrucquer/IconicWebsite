"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, Loader2, MapPin } from "lucide-react";
import { services } from "@/data/services";

type QuickQuoteFormProps = {
  source?: string;
};

type AddressSuggestion = {
  display_name: string;
  place_id: number;
};

const SERVICE_OPTIONS = [...services.map((service) => service.name), "Not sure yet"];

export function QuickQuoteForm({ source = "homepage_quick_form" }: QuickQuoteFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [addressOpen, setAddressOpen] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const addressRef = useRef<HTMLDivElement | null>(null);

  const inputClass =
    "w-full rounded-lg border hairline bg-brand-cream px-4 py-3 text-sm text-brand-ink placeholder-brand-ink/40 outline-none transition-colors focus:border-brand-forest focus:ring-1 focus:ring-brand-forest";

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
      if (!addressRef.current?.contains(event.target as Node)) {
        setAddressOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const query = address.trim();
    if (query.length < 4) {
      setAddressSuggestions([]);
      setAddressOpen(false);
      setAddressLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setAddressLoading(true);
      try {
        const params = new URLSearchParams({
          format: "jsonv2",
          addressdetails: "1",
          limit: "5",
          countrycodes: "us",
          q: query
        });
        const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
          signal: controller.signal,
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Address lookup failed");
        }

        const results = (await response.json()) as AddressSuggestion[];
        setAddressSuggestions(results);
        setAddressOpen(results.length > 0);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setAddressSuggestions([]);
          setAddressOpen(false);
        }
      } finally {
        setAddressLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [address]);

  const toggleService = (serviceName: string) => {
    setSelectedServices((current) =>
      current.includes(serviceName)
        ? current.filter((item) => item !== serviceName)
        : [...current, serviceName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim() || !address.trim() || selectedServices.length === 0) {
      setErrorMsg("Please complete all required fields.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          phone,
          email,
          address,
          services: selectedServices,
          message: details.trim() || undefined,
          sourcePage: source,
          pageUrl: typeof window !== "undefined" ? window.location.href : ""
        })
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Unknown error");
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please text us directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border hairline bg-brand-cream px-6 py-8 text-center">
        <p className="font-[var(--font-fraunces)] text-2xl font-medium text-brand-ink">
          We&apos;ll be in touch.
        </p>
        <p className="lede mt-2 text-brand-ink/70">
          Expect a reply within 24 hours, usually the same day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoComplete="name"
        aria-label="Name"
        className={inputClass}
      />
      <input
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        autoComplete="tel"
        inputMode="tel"
        aria-label="Phone number"
        className={inputClass}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
        aria-label="Email"
        className={inputClass}
      />

      <div className="relative" ref={addressRef}>
        <div className="relative">
          <input
            type="text"
            placeholder="Service address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onFocus={() => {
              if (addressSuggestions.length > 0) {
                setAddressOpen(true);
              }
            }}
            required
            autoComplete="street-address"
            aria-label="Service address"
            className={`${inputClass} pr-11`}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-brand-ink/45">
            {addressLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
          </div>
        </div>
        {addressOpen ? (
          <div className="absolute z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border hairline bg-white p-2 shadow-card">
            {addressSuggestions.map((suggestion) => (
              <button
                key={suggestion.place_id}
                type="button"
                onClick={() => {
                  setAddress(suggestion.display_name);
                  setAddressOpen(false);
                }}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-brand-ink transition-colors hover:bg-brand-bone"
              >
                {suggestion.display_name}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="relative" ref={servicesRef}>
        <button
          type="button"
          onClick={() => setServicesOpen((current) => !current)}
          className={`${inputClass} flex items-center justify-between text-left`}
          aria-haspopup="listbox"
          aria-expanded={servicesOpen}
        >
          <span className="truncate">
            {selectedServices.length > 0
              ? `${selectedServices.length} service${selectedServices.length > 1 ? "s" : ""} selected`
              : "Services interested in"}
          </span>
          <ChevronDown className={`h-4 w-4 flex-none transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
        </button>
        {servicesOpen ? (
          <div className="absolute z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border hairline bg-white p-2 shadow-card">
            {SERVICE_OPTIONS.map((serviceName) => {
              const checked = selectedServices.includes(serviceName);
              return (
                <label
                  key={serviceName}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-brand-ink transition-colors hover:bg-brand-bone"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded border ${
                      checked ? "border-brand-forest bg-brand-forest text-white" : "border-brand-ink/25 bg-white text-transparent"
                    }`}
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleService(serviceName)}
                    className="sr-only"
                  />
                  <span>{serviceName}</span>
                </label>
              );
            })}
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => setShowDetails((current) => !current)}
        className="inline-flex items-center gap-2 self-start text-sm font-semibold text-brand-forest transition-colors hover:text-brand-moss"
      >
        {showDetails ? "Hide optional details" : "Add optional details"}
        <ChevronDown className={`h-4 w-4 transition-transform ${showDetails ? "rotate-180" : ""}`} />
      </button>

      {showDetails ? (
        <textarea
          placeholder="Project details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={4}
          aria-label="Project details"
          className={inputClass}
        />
      ) : null}

      {errorMsg ? <p className="text-xs text-red-600">{errorMsg}</p> : null}

      <input type="text" name="website" className="hidden" tabIndex={-1} aria-hidden="true" />

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-moss disabled:opacity-60"
        data-track-event="cta_quote_click"
        data-track-params={JSON.stringify({ source })}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
