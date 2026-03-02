import { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/Button";
import { PHONE_DISPLAY, PHONE_LINK } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Giving Back to Our Community",
  description:
    "See how Iconic Landscaping supports local schools, nonprofits, and families through hands-on community initiatives."
};

const coatDriveStats = [
  {
    label: "250+ Coats Donated",
    copy: "All coats donated to Mission First Pottstown and Mitzvah Circle."
  },
  {
    label: "3 Years Running",
    copy: "Our annual winter coat drive has been hosted for three consecutive years."
  },
  {
    label: "Organized Locally",
    copy: "Run through Owen J. Roberts High School with community-led collection and distribution."
  }
];

const initiatives = [
  {
    title: "Annual Coat Drive",
    image: "/community/coat-drive-team.jpg",
    copy:
      "Our annual coat drive has donated 250+ coats since 2023, helping keep families in Pottstown and Chester County warm each winter."
  },
  {
    title: "Habitat for Humanity",
    image: "/community/habitat.jpg",
    copy:
      "We have volunteered 50+ hours with Habitat for Humanity, contributing to hands-on service and housing initiatives."
  },
  {
    title: "Riverfront Park Makeover",
    image: "/community/riverfront-park.jpg",
    copy:
      "In partnership with the Pottstown Rotary Club, we helped revitalize Pottstown Riverfront Park through cleanup and landscape refresh work."
  },
  {
    title: "Planting 100 Trees",
    image: "/community/plant-100-trees.png",
    copy:
      "To celebrate Earth Day, we donated to plant 100 trees through the Arbor Day Foundation to support long-term sustainability."
  },
  {
    title: "OJR Fashion Show",
    image: "/community/ojr-fashion-show.jpg",
    copy:
      "We sponsored an Owen J. Roberts High School Fashion Show participant, helping support local students and milestone experiences."
  },
  {
    title: "THON Support",
    image: "/community/thon-support.jpg",
    copy:
      "We are proud supporters of THON and pediatric cancer fundraising, with team members participating in both THON and OJR Mini-THON initiatives."
  }
];

export default function GivingBackPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <Image
          src="/community/coat-drive-team.jpg"
          alt="Iconic Landscaping coat drive team"
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/86 to-brand-dark/70" />

        <div className="section-shell relative py-16 md:py-24">
          <p className="inline-flex rounded-full border border-white/35 px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/85">
            Giving Back to Our Community
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[0.98] md:text-6xl">
            Community First. Always.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
            At Iconic Landscaping, giving back is a core part of who we are. We&apos;re proud to support local schools, organizations, and neighbors year-round.
          </p>

          <div className="mt-8 max-w-3xl rounded-2xl border border-brand-accent/35 bg-white/10 p-5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">2025 Coat Drive Has Begun</p>
            <p className="mt-2 text-sm text-white/90">Donate today and help keep local families warm this winter.</p>
          </div>
        </div>
      </section>

      <section className="section-shell py-14 md:py-18">
        <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-2xl border border-brand-primary/12 bg-white p-6 shadow-card md:p-8">
            <h2 className="section-title">Now Accepting Donations: 2025 Winter Coat Drive</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-brand-dark/80 md:text-base">
              <p>
                <strong>Drop-Off Location:</strong> Owen J. Roberts High School, Main Entrance Lobby in Pottstown, PA.
              </p>
              <p>
                <strong>Address:</strong> 981 Ridge Rd, Pottstown, PA 19465
              </p>
              <p>
                <strong>Drop-Off Hours:</strong> Monday through Friday, 7:00 a.m. to 4:00 p.m.
              </p>
              <p>
                <strong>What to Bring:</strong> New or gently used winter coats. All sizes welcome.
              </p>
              <p>
                If the collection box is full, call us and we&apos;ll coordinate a pickup.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" ariaLabel="Contact Iconic Landscaping about coat drive">
                Contact Us
              </Button>
              <a
                href={`tel:${PHONE_LINK}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-primary/30 px-5 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-light"
              >
                <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
              </a>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-brand-primary/12 bg-white shadow-card">
            <div className="relative h-full min-h-[320px] w-full">
              <Image src="/community/coat-drive-poster.png" alt="Iconic Landscaping winter coat drive poster" fill className="object-cover" />
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell py-8 md:py-12">
        <h2 className="section-title">Coat Drive Stats</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {coatDriveStats.map((stat) => (
            <article key={stat.label} className="rounded-2xl border border-brand-primary/12 bg-brand-light p-5">
              <p className="text-xl font-extrabold text-brand-dark">{stat.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-dark/75">{stat.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <h2 className="section-title">Our Resume: Successful Community Initiatives</h2>
        <p className="section-subtitle">A snapshot of the programs and partnerships we&apos;re proud to support.</p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {initiatives.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-2xl border border-brand-primary/10 bg-white shadow-card">
              <div className="relative h-56 w-full">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-brand-dark">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-dark/75">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <div className="rounded-2xl border border-brand-primary/12 bg-brand-dark p-7 text-white shadow-card md:p-10">
          <h2 className="font-display text-3xl font-extrabold md:text-5xl">Help Us Keep This Going</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
            Want to donate, collaborate, or sponsor a future initiative? Let&apos;s connect.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact" ariaLabel="Contact Iconic Landscaping">
              Contact Us
            </Button>
            <a
              href={`tel:${PHONE_LINK}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/45 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <MapPin className="h-4 w-4" /> Pottstown, PA
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
