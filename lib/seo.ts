import type { Metadata } from "next";
import { BUSINESS_NAME, SITE_URL } from "@/lib/constants";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImagePath?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path: string): string {
  if (!path || path === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  ogImagePath = "/photos/property-finish.jpg",
  noIndex = false
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(ogImagePath);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical
    },
    robots: noIndex
      ? {
          index: false,
          follow: false
        }
      : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: BUSINESS_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: ogImage, alt: `${BUSINESS_NAME} project photo` }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    }
  };
}
