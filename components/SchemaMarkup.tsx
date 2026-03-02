import { SITE_URL } from "@/lib/constants";

type SchemaMarkupProps = {
  type: "localBusiness" | "review" | "service";
  payload?: Record<string, unknown>;
};

const baseBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Iconic Landscaping",
  alternateName: "Iconic Cleanup",
  url: SITE_URL,
  telephone: "+1-484-925-1640",
  email: "contact@iconic.land",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pottstown",
    addressRegion: "PA",
    addressCountry: "US"
  },
  areaServed: [
    "Pottstown",
    "Chester Springs",
    "Royersford",
    "Douglassville",
    "Spring City",
    "Phoenixville",
    "Collegeville"
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    reviewCount: "40"
  }
};

export function SchemaMarkup({ type, payload = {} }: SchemaMarkupProps) {
  const schema =
    type === "localBusiness"
      ? baseBusiness
      : type === "review"
        ? {
            "@context": "https://schema.org",
            "@type": "Review",
            itemReviewed: {
              "@type": "LocalBusiness",
              name: "Iconic Landscaping"
            },
            ...payload
          }
        : {
            "@context": "https://schema.org",
            "@type": "Service",
            provider: {
              "@type": "LocalBusiness",
              name: "Iconic Landscaping",
              areaServed: "Pottstown, PA"
            },
            ...payload
          };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
