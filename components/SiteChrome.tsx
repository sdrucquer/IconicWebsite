"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Wraps Header/Footer around site pages.
// Pages whose paths start with /quote are standalone (no nav).
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone =
    pathname.startsWith("/quote") ||
    pathname.startsWith("/leaderboard") ||
    pathname.startsWith("/admin");

  return (
    <>
      {!isStandalone && <Header />}
      <main>{children}</main>
      {!isStandalone && <Footer />}
    </>
  );
}
