import {
  BUSINESS_NAME,
  EMAIL,
  LEGAL_BUSINESS_NAME,
  MAILING_CITY,
  MAILING_COUNTRY,
  MAILING_POSTAL_CODE,
  MAILING_REGION,
  MAP_DIRECTIONS_URL,
  PHONE_LINK,
  SITE_URL
} from "@/lib/constants";

type ReviewPayload = {
  author: { "@type": "Person"; name: string };
  reviewRating: { "@type": "Rating"; ratingValue: string };
  reviewBody: string;
};

type ServicePayload = {
  name: string;
  serviceType: string;
  areaServed: string | string[];
  description?: string;
  offers?: {
    "@type": "Offer";
    priceCurrency: string;
    price?: string;
    priceSpecification?: {
      "@type": "PriceSpecification";
      minPrice?: string;
      maxPrice?: string;
      priceCurrency: string;
    };
  };
};

type FaqPayload = {
  items: Array<{
    question: string;
    answer: string;
  }>;
};

type BreadcrumbPayload = {
  items: Array<{
    name: string;
    path: string;
  }>;
};

type SchemaMarkupProps =
  | {
      type: "localBusiness";
      payload?: never;
    }
  | {
      type: "review";
      payload: ReviewPayload;
    }
  | {
      type: "service";
      payload: ServicePayload;
    }
  | {
      type: "faqPage";
      payload: FaqPayload;
    }
  | {
      type: "breadcrumbList";
      payload: BreadcrumbPayload;
    };

const baseBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS_NAME,
  legalName: LEGAL_BUSINESS_NAME,
  alternateName: "Iconic Cleanup",
  url: SITE_URL,
  telephone: PHONE_LINK,
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: MAILING_CITY,
    addressRegion: MAILING_REGION,
    postalCode: MAILING_POSTAL_CODE,
    addressCountry: MAILING_COUNTRY
  },
  areaServed: [
    "Pottstown",
    "Chester Springs",
    "Royersford",
    "Douglassville",
    "Spring City",
    "Phoenixville",
    "Collegeville",
    "Glenmoore",
    "Birdsboro"
  ],
  hasMap: MAP_DIRECTIONS_URL,
  foundingDate: "2023-03",
  slogan: "Make Your Property Iconic.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    reviewCount: "56"
  }
};

function buildSchema(props: SchemaMarkupProps) {
  if (props.type === "localBusiness") {
    return baseBusiness;
  }

  if (props.type === "review") {
    return {
      "@context": "https://schema.org",
      "@type": "Review",
      itemReviewed: {
        "@type": "LocalBusiness",
        name: BUSINESS_NAME
      },
      ...props.payload
    };
  }

  if (props.type === "service") {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      provider: {
        "@type": "LocalBusiness",
        name: BUSINESS_NAME,
        url: SITE_URL,
        areaServed: props.payload.areaServed
      },
      ...props.payload
    };
  }

  if (props.type === "faqPage") {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: props.payload.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: props.payload.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`
    }))
  };
}

export function SchemaMarkup(props: SchemaMarkupProps) {
  const schema = buildSchema(props);

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
