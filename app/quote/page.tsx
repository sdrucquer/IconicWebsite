import type { Metadata } from "next";
import { QuoteFlyer } from "@/components/QuoteFlyer";

export const metadata: Metadata = {
  title: "Get Your Free Quote | Iconic Landscaping",
  description:
    "Request a free landscaping quote from Iconic Landscaping. Serving Pottstown, Royersford, Spring City, Chester Springs and surrounding areas.",
  robots: { index: false, follow: false },
};

export default function QuotePage() {
  return <QuoteFlyer />;
}
