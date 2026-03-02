import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, Users2 } from "lucide-react";
import { Button } from "@/components/Button";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { PHONE_DISPLAY, PHONE_LINK } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Meet the Team Behind Iconic Landscaping",
  description:
    "Discover how our young, student-led team is redefining landscaping in Pottstown and surrounding areas.",
  path: "/about-us",
  ogImagePath: "/team/team-hero.jpg"
});

const uniqueness = [
  {
    title: "Student Run",
    copy:
      "Led by ambitious high school and college students, we bring fresh energy, creativity, and a strong work ethic to every project.",
    icon: <Users2 className="h-5 w-5" />
  },
  {
    title: "Community Impact",
    copy:
      "We regularly dedicate time and resources to local causes, from coat drives to volunteer projects and youth-focused initiatives.",
    icon: <ShieldCheck className="h-5 w-5" />
  },
  {
    title: "Eco Friendly",
    copy:
      "We are transitioning to fully electric equipment to reduce emissions and noise pollution as we continue to grow.",
    icon: <Leaf className="h-5 w-5" />
  }
];

const difference = [
  {
    title: "Trusted professionals",
    copy:
      "Our team brings years of experience and a commitment to quality service. We show up on time, treat your home with respect, and make sure the job is done right the first time."
  },
  {
    title: "Clear & simple process",
    copy:
      "From first call to final payment, we keep it easy with transparent pricing, reliable scheduling, and clear communication."
  },
  {
    title: "Results that last",
    copy:
      "Using proven methods and quality materials, we deliver work built for long-term value, not short-term fixes."
  }
];

const teamMembers = [
  {
    name: "Shanin Drucquer",
    role: "Owner",
    image: "/team/shanin-drucquer.jpg",
    bio: "I founded Iconic during my junior year of high school with a few friends, driven by a love for the outdoors and a passion for building something meaningful.",
    more:
      "I currently study Mechanical Engineering at Penn State, where I apply systems thinking and problem solving to how we run Iconic."
  },
  {
    name: "Dan Bower",
    role: "Chief Operating Officer (COO)",
    image: "/team/dan-bower.jpg",
    bio: "I handle client communication, quoting, scheduling, and day-to-day operations to ensure every customer gets the quality and attention Iconic is known for.",
    more:
      "I study Accounting and Supply Chain & Information Systems at Penn State while helping scale our operations each season."
  },
  {
    name: "Ryan D'Angelo",
    role: "Job Manager",
    image: "/team/ryan-dangelo.jpg",
    bio: "I manage job scheduling and daily logistics to keep crews coordinated and projects moving smoothly.",
    more:
      "As a senior at Owen J. Roberts High School, I bring teamwork and discipline from varsity soccer into every day at Iconic."
  },
  {
    name: "Leila Azimov",
    role: "Marketing Manager",
    image: "/team/leila-azimov.jpg",
    bio: "I lead social media and brand messaging so our online presence reflects the quality of our field work.",
    more:
      "I am a Penn State Marketing student pursuing a minor in Management Information Systems."
  },
  {
    name: "Max Collins",
    role: "Financial Manager",
    image: "/team/max-collins.jpg",
    bio: "I oversee invoicing, payroll, expense management, and reporting to keep the business running efficiently behind the scenes.",
    more:
      "I am a Penn State student majoring in Finance and Statistics, focused on data-driven decisions and sustainable growth."
  }
];

export default function AboutUsPage() {
  return (
    <>
      <SchemaMarkup
        type="breadcrumbList"
        payload={{
          items: [
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about-us" }
          ]
        }}
      />

      <section className="relative overflow-hidden bg-brand-dark text-white">
        <Image
          src="/team/team-hero.jpg"
          alt="Iconic Landscaping team"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/88 to-brand-dark/75" />
        <div className="section-shell relative py-16 md:py-24 lg:py-28 xl:py-32">
          <p className="inline-flex items-center rounded-full border border-white/35 px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/85">
            Meet the Team Behind Iconic Landscaping
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[0.98] md:text-6xl lg:max-w-5xl lg:text-7xl">
            A young, passionate crew redefining landscaping in Pottstown and surrounding areas.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg lg:max-w-4xl lg:text-xl">
            Making landscapes iconic since 2023.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact#quote" ariaLabel="Get a free quote from Iconic Landscaping">
              Get a Quote
            </Button>
            <a
              href={`tel:${PHONE_LINK}`}
              className="inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <section className="section-shell py-14 md:py-16 lg:py-20">
        <div className="rounded-2xl border border-brand-primary/12 bg-white p-6 shadow-card md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary">Why Us</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-brand-dark md:text-4xl">What Makes Us Unique</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-dark/75 md:text-base">
            Our team shows up on time, treats your home with respect, and gets the job done right. We are trusted professionals who happen to be students.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {uniqueness.map((item) => (
              <article key={item.title} className="rounded-xl border border-brand-primary/10 bg-brand-light p-5">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary">
                  {item.icon} {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-brand-dark/80">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-8 md:py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-2xl border border-brand-primary/12 bg-white p-6 shadow-soft md:p-8">
            <h2 className="section-title">Our Story</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-brand-dark/80 md:text-base">
              <p>
                Iconic started with a few friends, Shanin, Ariston, and Josh, working landscaping jobs for Josh&apos;s dad. We launched a social page, took on small neighborhood projects, and grew through word of mouth.
              </p>
              <p>
                As momentum built, we reinvested in equipment, expanded services, and brought more friends into the crew. In March 2024, we officially registered the business, a major milestone in the journey.
              </p>
              <p>
                As founders headed to college, we built a leadership structure that keeps the mission moving: quality work, strong relationships, and meaningful local impact.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-brand-primary/12 bg-white p-6 shadow-soft md:p-8">
            <h2 className="section-title">The Difference We Bring to Every Job</h2>
            <div className="mt-5 space-y-4">
              {difference.map((item) => (
                <div key={item.title} className="rounded-xl border border-brand-primary/10 bg-brand-light p-4">
                  <p className="text-sm font-bold text-brand-dark">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-dark/75">{item.copy}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell py-14 md:py-16 lg:py-20">
        <h2 className="section-title">Our Team</h2>
        <p className="section-subtitle max-w-2xl">
          The people behind Iconic: field leaders, operators, and students building something meaningful together.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {teamMembers.map((member) => (
            <article key={member.name} className="overflow-hidden rounded-2xl border border-brand-primary/10 bg-white shadow-card">
              <div className="relative h-72 w-full">
                <Image src={member.image} alt={`${member.name} from Iconic Landscaping`} fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary">{member.role}</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-brand-dark">{member.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-dark/80">{member.bio}</p>
                <p className="mt-2 text-sm leading-relaxed text-brand-dark/75">{member.more}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 md:py-16 lg:py-20">
        <div className="rounded-2xl border border-brand-primary/12 bg-brand-dark p-7 text-white shadow-card md:p-10">
          <h2 className="font-display text-3xl font-extrabold md:text-5xl">Join Our Journey</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
            Looking for expert landscaping? We&apos;re excited to connect and build a plan that fits your property.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/contact#quote" ariaLabel="Open quote form">
              Get a Quote
            </Button>
            <Link
              href="/about-us/giving-back"
              className="inline-flex items-center gap-2 rounded-full border border-white/45 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              See Community Impact <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
