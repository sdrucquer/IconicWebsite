"use client";

import Link from "next/link";
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const desktopServicesRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-brand-primary/10 bg-white/95 backdrop-blur" : "bg-white/70"
      }`}
    >
      <div className="section-shell flex items-center justify-between py-3">
        <Link href="/" className="inline-flex items-center gap-2" aria-label="Iconic Landscaping home">
          <BrandLogo compact className="h-10 w-10 object-contain lg:h-11 lg:w-11" />
          <span className="text-sm font-bold uppercase tracking-[0.12em] text-brand-dark md:text-base lg:text-[1.05rem]">
            Iconic Landscaping
          </span>
        </Link>

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
            href="/contact#quote"
            ariaLabel="Open full quote form"
            className="border-brand-primary bg-brand-primary px-6 py-2.5 text-white hover:border-brand-accent hover:bg-brand-accent lg:px-7 lg:py-3"
            trackEventName="cta_quote_click"
            trackEventParams={{ source: "header_desktop" }}
          >
            Get a Free Quote
          </Button>
        </div>

        <button
          className="rounded-full border border-brand-primary/20 p-2 text-brand-primary lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={mobileOpen ? "Close mobile menu" : "Open mobile menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`overflow-hidden px-4 overscroll-contain transition-[max-height,opacity] duration-300 lg:hidden ${
          mobileOpen
            ? "max-h-[calc(100vh-80px)] border-t border-brand-primary/10 bg-white pb-6 pt-2 opacity-100"
            : "max-h-0 bg-transparent pb-0 pt-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-2 overflow-y-auto">
          <Link href="/" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 hover:bg-brand-light">
            Home
          </Link>
          <button
            type="button"
            onClick={() => setMobileServicesOpen((value) => !value)}
            className="inline-flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold uppercase tracking-wide text-brand-dark/70 hover:bg-brand-light"
            aria-label="Toggle mobile services list"
            aria-expanded={mobileServicesOpen}
          >
            Services
            <ChevronDown
              className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ${
              mobileServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="mb-1 min-h-0 flex flex-col gap-1 pt-1">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-brand-dark/85 hover:bg-brand-light"
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
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-brand-light"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SMS_LINK}
            className="rounded-lg px-3 py-2 font-semibold hover:bg-brand-light"
            aria-label="Text Iconic Landscaping"
            data-track-event="click_to_text"
            data-track-params='{"source":"header_mobile"}'
          >
            Text {PHONE_DISPLAY}
          </a>
          <a
            href={CLIENT_HUB_LOGIN_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg px-3 py-2 font-semibold hover:bg-brand-light"
            aria-label="Open client login"
          >
            Client Login
          </a>
          <Button
            href="/contact#quote"
            ariaLabel="Open full quote form"
            className="mt-2 w-full"
            trackEventName="cta_quote_click"
            trackEventParams={{ source: "header_mobile" }}
          >
            Get a Free Quote
          </Button>
        </div>
      </div>
    </header>
  );
}
