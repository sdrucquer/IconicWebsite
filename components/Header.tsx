"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { services } from "@/data/services";
import { CLIENT_HUB_LOGIN_URL, PHONE_DISPLAY, SMS_LINK } from "@/lib/constants";
import { Button } from "@/components/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/service-area", label: "Service Area" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const desktopServicesRef = useRef<HTMLDivElement | null>(null);
  const quoteHref = pathname === "/" ? "#quote" : "/contact#quote";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!desktopServicesOpen) {
      return;
    }

    const onClickOutside = (event: MouseEvent) => {
      if (!desktopServicesRef.current?.contains(event.target as Node)) {
        setDesktopServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [desktopServicesOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      setMobileServicesOpen(false);
    }
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setDesktopServicesOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-brand-sage/25 bg-brand-bone/95 backdrop-blur" : "bg-brand-bone/90"
      }`}
    >
      <div className="section-shell grid grid-cols-[52px_1fr_52px] items-center gap-3 py-3 lg:flex lg:justify-between">
        <Link href="/" className="inline-flex items-center" aria-label="Iconic Landscaping home">
          <BrandLogo compact className="h-12 w-12 object-contain lg:h-14 lg:w-14" />
        </Link>

        <Button
          href={quoteHref}
          ariaLabel="Get a free quote"
          className="mx-auto min-h-0 border-brand-forest bg-brand-forest px-6 py-3 text-sm font-bold tracking-[0.01em] text-brand-cream shadow-[0_10px_24px_rgba(31,74,34,0.16)] hover:border-brand-moss hover:bg-brand-moss sm:px-8 sm:text-base lg:hidden"
          trackEventName="cta_quote_click"
          trackEventParams={{ source: "header_mobile_pill" }}
        >
          Get a Free Quote
        </Button>

        <nav className="hidden items-center gap-6 lg:flex lg:gap-7 xl:gap-8" aria-label="Main navigation">
          {navLinks.slice(0, 1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-semibold text-brand-dark transition-colors hover:text-brand-primary lg:text-base"
            >
              {link.label}
            </Link>
          ))}

          <div className="relative" ref={desktopServicesRef}>
            <button
              type="button"
              onClick={() => setDesktopServicesOpen((value) => !value)}
              className="inline-flex items-center gap-1 text-[15px] font-semibold text-brand-dark transition-colors hover:text-brand-primary lg:text-base"
              aria-label="Toggle services menu"
              aria-expanded={desktopServicesOpen}
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition-transform ${desktopServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`absolute left-0 top-full mt-2 w-64 rounded-xl border border-brand-primary/10 bg-white p-2 shadow-soft transition-all ${
                desktopServicesOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={() => setDesktopServicesOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-brand-dark hover:bg-brand-light"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-semibold text-brand-dark transition-colors hover:text-brand-primary lg:text-base"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex lg:gap-4">
          <a
            href={CLIENT_HUB_LOGIN_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-brand-dark/80 transition-colors hover:text-brand-primary lg:text-[15px]"
            aria-label="Open client login"
          >
            Client Login
          </a>
          <a
            href={SMS_LINK}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-primary lg:text-[15px]"
            aria-label="Text Iconic Landscaping"
            data-track-event="click_to_text"
            data-track-params='{"source":"header_desktop"}'
          >
            <Phone className="h-4 w-4" /> Text {PHONE_DISPLAY}
          </a>
          <Button
            href={quoteHref}
            ariaLabel="Open full quote form"
            className="border-brand-primary bg-brand-primary px-6 py-2.5 text-white hover:border-brand-accent hover:bg-brand-accent lg:px-7 lg:py-3"
            trackEventName="cta_quote_click"
            trackEventParams={{ source: "header_desktop" }}
          >
            Get a Free Quote
          </Button>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-sage/40 bg-brand-bone text-brand-forest transition-colors hover:border-brand-forest hover:bg-brand-cream lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={mobileOpen ? "Close mobile menu" : "Open mobile menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`overflow-hidden overscroll-contain border-brand-sage/25 bg-brand-bone transition-[height,opacity] duration-300 lg:hidden ${
          mobileOpen
            ? "h-[calc(100vh-72px)] border-t pb-5 pt-3 opacity-100 shadow-[0_24px_50px_rgba(20,26,20,0.08)]"
            : "pointer-events-none h-0 border-t-0 pb-0 pt-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex h-full w-[min(100%,calc(100%-2rem))] flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto pb-5">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-4 py-3 font-display text-2xl font-medium tracking-[-0.02em] text-brand-ink transition-colors hover:bg-brand-cream"
            >
              Home
            </Link>
            <button
              type="button"
              onClick={() => setMobileServicesOpen((value) => !value)}
              className="inline-flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-display text-2xl font-medium tracking-[-0.02em] text-brand-ink transition-colors hover:bg-brand-cream"
              aria-label="Toggle mobile services list"
              aria-expanded={mobileServicesOpen}
            >
              Services
              <ChevronDown
                className={`h-5 w-5 text-brand-forest transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ${
                mobileServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="mb-2 min-h-0 rounded-2xl border border-brand-sage/25 bg-brand-cream/70 p-2">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-ink/78 transition-colors hover:bg-brand-bone hover:text-brand-forest"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
            {navLinks.slice(1, -1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-3 font-display text-2xl font-medium tracking-[-0.02em] text-brand-ink transition-colors hover:bg-brand-cream"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 border-t border-brand-sage/25 pt-3">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-base font-bold text-brand-ink transition-colors hover:bg-brand-cream hover:text-brand-forest"
                aria-label="Contact Iconic Landscaping"
              >
                Contact
              </Link>
              <a
                href={CLIENT_HUB_LOGIN_URL}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl px-4 py-2.5 text-base font-bold text-brand-ink transition-colors hover:bg-brand-cream hover:text-brand-forest"
                aria-label="Open client login"
              >
                Client Login
              </a>
            </div>
          </div>
          <div className="shrink-0 bg-brand-bone pt-3">
            <Link
              href={quoteHref}
              aria-label="Open full quote form"
              data-track-event="cta_quote_click"
              data-track-params='{"source":"header_mobile"}'
              className="inline-flex w-full items-center justify-center rounded-full border border-brand-forest bg-brand-forest px-6 py-4 text-base font-bold text-brand-cream shadow-[0_14px_30px_rgba(31,74,34,0.16)] transition-colors duration-300 hover:border-brand-moss hover:bg-brand-moss"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
