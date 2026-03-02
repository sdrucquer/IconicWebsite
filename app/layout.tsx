import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SchemaMarkup } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  metadataBase: new URL("https://iconic.land"),
  title: {
    default: "Iconic Landscaping | Landscaping Services in Pottstown, PA",
    template: "%s | Iconic Landscaping"
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
    title: "Iconic Landscaping",
    description:
      "Premium landscaping services in Pottstown, PA and surrounding areas.",
    url: "https://iconic.land",
    siteName: "Iconic Landscaping",
    locale: "en_US",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <SchemaMarkup type="localBusiness" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
