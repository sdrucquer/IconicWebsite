import { Metadata } from "next";
import { Button } from "@/components/Button";
import { serviceAreasPrimary, serviceAreasSecondary } from "@/data/services";
import { PHONE_DISPLAY, PHONE_LINK } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Service Area | Landscaping in Pottstown, PA",
  description:
    "Iconic Landscaping serves Pottstown, Chester Springs, Royersford, Douglassville, Spring City, and surrounding areas."
};

export default function ServiceAreaPage() {
  return (
    <section className="section-shell py-20">
      <h1 className="section-title">We Come to You</h1>
      <p className="section-subtitle">Landscaping services based in Pottstown, PA with coverage across nearby towns.</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-brand-dark">Primary Service Areas</h2>
          <p className="mt-2 text-sm text-brand-dark/70">We take most jobs in these areas:</p>
          <ul className="mt-4 space-y-2 text-sm text-brand-dark/80">
            {serviceAreasPrimary.map((city) => (
              <li key={city}>• {city}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-brand-dark">Secondary Service Areas</h2>
          <p className="mt-2 text-sm text-brand-dark/70">Larger jobs only in these areas:</p>
          <ul className="mt-4 space-y-2 text-sm text-brand-dark/80">
            {serviceAreasSecondary.map((city) => (
              <li key={city}>• {city}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className="mt-8 rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-bold text-brand-dark">Map Preview</h2>
        <div className="mt-4 flex h-72 items-center justify-center rounded-xl border border-dashed border-brand-primary/20 bg-brand-light text-center text-sm text-brand-dark/70">
          Google Maps Embed Placeholder (Pottstown, PA marker)
        </div>
        <p className="mt-4 text-sm text-brand-dark/75">
          Not sure if we serve your area? Call or text us at <a href={`tel:${PHONE_LINK}`} className="font-semibold text-brand-primary">{PHONE_DISPLAY}</a>.
        </p>
      </div>

      <div className="mt-10">
        <Button href="/#quote" ariaLabel="Open quote form on homepage">
          Get a Free Quote
        </Button>
      </div>
    </section>
  );
}
