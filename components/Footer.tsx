import Link from "next/link";
import { Facebook, Mail, Phone } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { services } from "@/data/services";
import { CLIENT_HUB_LOGIN_URL, EMAIL, PHONE_DISPLAY, SMS_LINK } from "@/lib/constants";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/about-us/giving-back", label: "Giving Back" },
  { href: "/resources", label: "Resources" },
  { href: "/service-area", label: "Service Area" },
  { href: "/contact", label: "Contact" },
  { href: CLIENT_HUB_LOGIN_URL, label: "Client Login", external: true },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" }
];

export function Footer() {
  return (
    <footer className="mt-20 bg-brand-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-[70px] lg:grid-cols-4 lg:px-8">
        <div>
          <BrandLogo className="h-12 w-auto object-contain" fallbackClassName="text-white" />
          <p className="mt-3 text-sm text-white/75">Premium Landscaping in the Greater Pottstown Area</p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Quick Links</h2>
          <ul className="mt-3 space-y-1 text-[0.9rem] leading-8">
            {quickLinks.map((link) => (
              <li key={link.href}>
                {link.external ? (
                  <a href={link.href} target="_blank" rel="noreferrer" className="text-white/85 hover:text-brand-accent">
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className="text-white/85 hover:text-brand-accent">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Services</h2>
          <ul className="mt-3 grid grid-cols-1 gap-1 text-[0.9rem] leading-8">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="text-white/85 hover:text-brand-accent">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Contact</h2>
          <div className="mt-3 space-y-1 text-[0.9rem] leading-8">
            <a
              href={SMS_LINK}
              className="inline-flex items-center gap-2 text-white/85 hover:text-brand-accent"
              aria-label="Text or call Iconic Landscaping"
              data-track-event="click_to_text"
              data-track-params='{"source":"footer"}'
            >
              <Phone className="h-4 w-4" /> Text or call: {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 text-white/85 hover:text-brand-accent"
              aria-label="Email Iconic Landscaping"
              data-track-event="click_to_email"
              data-track-params='{"source":"footer"}'
            >
              <Mail className="h-4 w-4" /> {EMAIL}
            </a>
            <a
              href="https://www.facebook.com/iconiccleanuppa"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white/85 hover:text-brand-accent"
              aria-label="Visit Iconic Landscaping Facebook page"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/65">
        © 2026 Iconic Landscaping LLC. All rights reserved.
      </div>
    </footer>
  );
}
