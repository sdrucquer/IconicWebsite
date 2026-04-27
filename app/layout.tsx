import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { BUSINESS_NAME, SITE_URL } from "@/lib/constants";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"]
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iconic.land"),
  title: {
    default: `${BUSINESS_NAME} | Landscaping Services in Pottstown, PA`,
    template: `%s | ${BUSINESS_NAME}`
  },
  description:
    "Premium landscaping services in Pottstown, PA and surrounding areas. Locally run, quality-obsessed, and relationship-driven.",
  keywords: [
    "landscaping Pottstown PA",
    "mulching Pottstown",
    "bed cleanup",
    "spring cleanup",
    "Iconic Landscaping"
  ],
  openGraph: {
    title: BUSINESS_NAME,
    description:
      "Premium landscaping services in Pottstown, PA and surrounding areas.",
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: `${SITE_URL}/photos/property-finish.jpg`, alt: `${BUSINESS_NAME} landscaping work` }]
  },
  twitter: {
    card: "summary_large_image",
    title: BUSINESS_NAME,
    description:
      "Premium landscaping services in Pottstown, PA and surrounding areas.",
    images: [`${SITE_URL}/photos/property-finish.jpg`]
  },
  alternates: {
    canonical: SITE_URL
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans">
        <AnalyticsTracker />
        <SchemaMarkup type="localBusiness" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
