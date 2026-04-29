import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { PHONE_DISPLAY, PHONE_LINK } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Iconic Landscaping",
  description:
    "Started by a few friends in high school. Now serving 500+ homeowners across Montgomery, Chester, and Berks County. Meet the team behind Iconic.",
  path: "/about-us",
  ogImagePath: "/team/team-hero.jpg"
});

const stats = [
  { label: "Founded", value: "2023" },
  { label: "Registered", value: "March '24" },
  { label: "Customers", value: "500+" },
  { label: "Based In", value: "Pottstown" }
];

const pillars = [
  {
    number: "No. 01",
    title: "Ambitious by design.",
    copy:
      "We're high school and college students who could be doing easier work and chose this instead. Iconic was built by people who actually wanted to be doing it, and that energy shows up in every yard we touch.",
    tag: "this is the flex"
  },
  {
    number: "No. 02",
    title: "Local on purpose.",
    copy:
      "We grew up around here. We work for our neighbors. We pay our crews, volunteer in our community, and put real money into youth-focused causes in the towns we serve.",
    tag: "Pottstown forever"
  },
  {
    number: "No. 03",
    title: "Quiet by choice.",
    copy:
      "We're transitioning to cleaner, quieter equipment because it is easier on your morning, your neighbors, and the air your kids breathe. It costs more upfront. We think it's worth it.",
    tag: "fewer loud mornings"
  }
];

const founders = [
  {
    name: "Shanin Drucquer",
    role: "Founder · Owner",
    note: "the one who started it all",
    image: "/team/shanin-drucquer.jpg",
    bio:
      "Shanin started Iconic during his junior year of high school, driven by a love for the outdoors and a stubborn habit of building things himself. He's now studying Mechanical Engineering at Penn State, where he applies the same systems thinking to how Iconic runs as he does to engineering problems.",
    quote:
      "I've always been the kid who'd rather build something than wait for someone else to. Iconic was just the version of that idea that took off.",
    details: [
      { label: "Studies", value: "Mechanical Engineering" },
      { label: "School", value: "Penn State" },
      { label: "Hometown", value: "Pottstown, PA" }
    ]
  },
  {
    name: "Dan Bower",
    role: "Founder · COO",
    note: "the operator",
    image: "/team/dan-bower.jpg",
    bio:
      "Dan handles the side of Iconic that customers actually feel: communication, quoting, scheduling, and day-to-day operations. He's the reason quotes come back fast, and the reason every customer gets the kind of attention you'd expect from a larger company.",
    quote:
      "If we're going to ask people to trust us with their property, the experience has to be tight from the first message to the final walkthrough.",
    details: [
      { label: "Studies", value: "Supply Chain & Info Systems" },
      { label: "School", value: "Penn State" },
      { label: "Specialty", value: "Operations" }
    ]
  }
];

const teamMembers = [
  {
    name: "Ryan D'Angelo",
    role: "Job Manager",
    image: "/team/ryan-dangelo.jpg",
    school: "Owen J. Roberts HS",
    bio:
      "Ryan handles scheduling and daily logistics, keeping crews coordinated and projects moving smoothly. He brings teamwork and discipline from varsity soccer to every day at Iconic."
  },
  {
    name: "Leila Azimov",
    role: "Marketing Manager",
    image: "/team/leila-azimov.jpg",
    school: "Penn State, Marketing",
    bio:
      "Leila runs social and brand for Iconic, making sure the way we show up online reflects the quality of the work in the field."
  },
  {
    name: "Max Collins",
    role: "Financial Manager",
    image: "/team/max-collins.jpg",
    school: "Penn State, Finance & Stats",
    bio:
      "Max keeps the business running quietly behind the scenes: invoicing, payroll, expense management, and the data that helps us make better calls as we grow."
  }
];

const numberStats = [
  { value: "500", suffix: "+", label: "Yards we've shown up to since 2023" },
  { value: "4.8", suffix: "★", label: "Average rating across 56+ reviews" },
  { value: "3", suffix: "", label: "Counties served: Montgomery, Chester, and Berks" },
  { value: "100", suffix: "%", label: "Crews are local and hired from our own community" }
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

      <section className="relative overflow-hidden bg-brand-bone">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(184,146,61,0.09),transparent_28%),radial-gradient(circle_at_80%_75%,rgba(45,106,47,0.08),transparent_32%)]" />
        <div className="section-shell relative grid gap-14 py-20 md:py-24 lg:grid-cols-[1.35fr_0.9fr] lg:items-center lg:gap-20 lg:py-32">
          <div>
            <p className="meta flex items-center gap-3 text-brand-forest before:h-px before:w-8 before:bg-brand-forest">
              About Iconic
            </p>
            <h1 className="mt-7 max-w-5xl font-display text-[clamp(3.2rem,10vw,6.5rem)] font-normal leading-[0.94] tracking-[-0.03em] text-brand-ink">
              A few{" "}
              <span className="inline-block -rotate-2 font-[var(--font-caveat)] text-[0.9em] font-semibold text-brand-gold">
                friends
              </span>
              , <em className="font-light text-brand-forest">a lot of yards.</em>
            </h1>
            <p className="mt-8 max-w-2xl font-display text-[1.35rem] font-normal leading-[1.45] text-brand-ink/78 md:text-[1.55rem]">
              We started Iconic in high school because the landscaping in our neighborhood looked like nobody cared. Two years later, we&apos;re 500+ yards in, and still that&apos;s the whole point.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-brand-sage/35 pt-8 sm:flex sm:flex-wrap">
              {stats.map((item) => (
                <div key={item.label} className="min-w-28">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand-ink/45">{item.label}</p>
                  <p className="mt-1 font-display text-3xl font-medium tracking-[-0.02em] text-brand-ink">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-[26rem] rotate-2 bg-white p-4 pb-16 shadow-[0_8px_18px_rgba(20,26,20,0.08),0_28px_70px_rgba(20,26,20,0.16)] transition-transform duration-300 hover:rotate-0">
            <span className="absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 -rotate-3 bg-brand-tan/65 shadow-sm" />
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src="/photos/home/team.jpg" alt="Iconic Landscaping crew on the job" fill priority className="object-cover" />
            </div>
            <figcaption className="absolute inset-x-0 bottom-4 text-center font-[var(--font-caveat)] text-2xl font-semibold text-brand-ink/70">
              the crew, spring &apos;25
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-brand-bone py-24 text-center md:py-32">
        <div className="section-shell max-w-5xl">
          <p className="font-display text-8xl font-light leading-none text-brand-forest/20">&quot;</p>
          <p className="mx-auto mt-2 max-w-4xl font-display text-[clamp(1.9rem,4vw,3.1rem)] font-normal leading-[1.22] tracking-[-0.018em] text-brand-ink">
            Most landscaping companies got into this work because <em className="text-brand-forest">it was a job they ended up with.</em> We got into it because we love it, and we think you can{" "}
            <span className="relative inline-block after:absolute after:inset-x-0 after:bottom-1 after:-z-10 after:h-2 after:bg-brand-gold/30">
              tell the difference
            </span>{" "}
            when we leave your yard.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream py-24 md:py-32">
        <div className="section-shell max-w-6xl">
          <div className="text-center">
            <p className="meta text-brand-forest">Our Story</p>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,6vw,4.8rem)] font-normal leading-[1.03] tracking-[-0.025em] text-brand-ink">
              How <em className="text-brand-forest">Iconic</em> got started.
            </h2>
          </div>
          <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="space-y-7 font-display text-lg leading-[1.75] text-brand-ink/75 md:text-xl [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mr-3 [&>p:first-child]:first-letter:mt-2 [&>p:first-child]:first-letter:font-display [&>p:first-child]:first-letter:text-7xl [&>p:first-child]:first-letter:font-medium [&>p:first-child]:first-letter:leading-[0.8] [&>p:first-child]:first-letter:text-brand-forest">
              <p>
                Iconic started in 2023 with a few friends, Shanin, Ariston, and Josh, running landscaping jobs out of Shanin&apos;s dad&apos;s garage in Pottstown. No website, no business plan. Just neighborhood projects and a habit of doing them better than they needed to be done.
              </p>
              <p>
                We posted before-and-afters on social media. The local response surprised us. By the end of that first summer we&apos;d done dozens of yards, and people were starting to ask if we did this full-time.
              </p>
              <p>
                As things picked up, we reinvested in real equipment, brought more friends into the crew, and treated it like the business it was becoming. By the time we headed off to college, we had a real team and a structure that meant the work didn&apos;t slow down just because we did.
              </p>
              <p>
                In <strong className="font-semibold text-brand-ink">March 2024</strong>, we officially registered Iconic Landscaping LLC. A real milestone, but mostly it just made official what we&apos;d already been doing: showing up, doing the work right, and trying to make every yard better than we found it.
              </p>
            </div>
            <div className="relative min-h-[28rem] md:min-h-[34rem]">
              <figure className="absolute left-0 top-0 z-10 w-[65%] -rotate-3 bg-white p-3 shadow-[0_12px_32px_rgba(20,26,20,0.16)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src="/photos/home/before.jpg" alt="Early Iconic landscaping project" fill className="object-cover" />
                </div>
                <figcaption className="mt-2 text-center font-[var(--font-caveat)] text-xl font-semibold text-brand-ink/70">
                  first jobs, summer &apos;23
                </figcaption>
              </figure>
              <figure className="absolute bottom-0 right-0 w-[62%] rotate-3 bg-white p-3 shadow-[0_12px_32px_rgba(20,26,20,0.16)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/photos/home/after.jpg" alt="Finished Iconic landscaping project" fill className="object-cover" />
                </div>
                <figcaption className="mt-2 text-center font-[var(--font-caveat)] text-xl font-semibold text-brand-ink/70">
                  crew, fall &apos;24
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-bone py-24 md:py-32">
        <div className="section-shell max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
            <div>
              <p className="meta text-brand-forest">What We Believe</p>
              <h2 className="mt-5 font-display text-[clamp(2.35rem,5vw,4.2rem)] font-normal leading-[1.03] tracking-[-0.025em] text-brand-ink">
                Three things <em className="text-brand-forest">we won&apos;t budge on.</em>
              </h2>
            </div>
            <p className="max-w-xl font-display text-xl leading-[1.55] text-brand-ink/75">
              We&apos;re young, we&apos;re still figuring some things out, and we ask a lot of our team. But on these three? We don&apos;t compromise.
            </p>
          </div>
          <div className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-14">
            {pillars.map((pillar) => (
              <article key={pillar.number} className="border-t-2 border-brand-forest pt-8">
                <p className="font-display text-sm italic tracking-[0.05em] text-brand-forest">{pillar.number}</p>
                <h3 className="mt-6 font-display text-[1.85rem] font-medium leading-[1.12] tracking-[-0.015em] text-brand-ink">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-[0.98rem] leading-[1.7] text-brand-ink/72">{pillar.copy}</p>
                <p className="mt-6 inline-block -rotate-2 font-[var(--font-caveat)] text-2xl font-semibold text-brand-gold">
                  {pillar.tag}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream">
        {founders.map((founder, index) => (
          <article key={founder.name} className="grid min-h-[42rem] lg:grid-cols-2">
            <div className={`relative min-h-[28rem] lg:min-h-full ${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <Image src={founder.image} alt={`${founder.name} from Iconic Landscaping`} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-forest/20" />
            </div>
            <div className={`${index % 2 === 1 ? "bg-brand-bone" : "bg-brand-cream"} px-6 py-16 md:px-10 lg:px-20 lg:py-24`}>
              <div className="mx-auto flex h-full max-w-2xl flex-col justify-center">
                <p className="meta flex items-center gap-3 text-brand-forest before:h-px before:w-6 before:bg-brand-forest">{founder.role}</p>
                <h2 className="mt-5 font-display text-[clamp(3rem,6vw,5.7rem)] font-normal leading-[0.94] tracking-[-0.03em] text-brand-ink">
                  {founder.name}
                </h2>
                <p className="mt-3 font-display text-2xl italic text-brand-forest">{founder.note}</p>
                <p className="mt-8 font-display text-xl leading-[1.65] text-brand-ink/75">{founder.bio}</p>
                <blockquote className="mt-8 border-l-2 border-brand-gold py-4 pl-7">
                  <p className="font-display text-xl italic leading-[1.45] text-brand-ink">&quot;{founder.quote}&quot;</p>
                </blockquote>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5 border-t border-brand-sage/35 pt-6">
                  {founder.details.map((detail) => (
                    <div key={detail.label}>
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand-ink/45">{detail.label}</p>
                      <p className="mt-1 font-display text-lg text-brand-ink">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-brand-bone py-24 md:py-32">
        <div className="section-shell max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="meta text-brand-forest">The Crew</p>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,5.5vw,4.5rem)] font-normal leading-[1.03] tracking-[-0.025em] text-brand-ink">
              The people who <em className="text-brand-forest">keep it running.</em>
            </h2>
            <p className="mt-6 font-display text-xl leading-[1.55] text-brand-ink/72">
              Field leads, ops, marketing, finance: every part of Iconic is run by someone who actually cares about it.
            </p>
          </div>
          <div className="mt-16 grid gap-9 md:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.name}>
                <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream">
                  <Image src={member.image} alt={`${member.name} from Iconic Landscaping`} fill className="object-cover saturate-[0.96] transition duration-300 hover:saturate-105" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-ink/18 to-transparent" />
                </div>
                <p className="mt-6 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand-forest">{member.role}</p>
                <h3 className="mt-2 font-display text-3xl font-medium leading-[1.08] tracking-[-0.015em] text-brand-ink">{member.name}</h3>
                <p className="mt-3 font-display text-base italic text-brand-ink/48">{member.school}</p>
                <p className="mt-4 text-[0.95rem] leading-[1.65] text-brand-ink/72">{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1B3A2A] py-24 text-brand-cream md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_34%)]" />
        <div className="section-shell relative max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="meta text-brand-cream/60">By the Numbers</p>
            <h2 className="mt-5 font-display text-[clamp(2.35rem,5vw,4rem)] font-normal leading-[1.08] tracking-[-0.02em] text-brand-cream">
              Two years in, and <em className="text-brand-sage">still just getting started.</em>
            </h2>
          </div>
          <div className="mt-16 grid gap-10 border-t border-brand-cream/15 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {numberStats.map((item) => (
              <div key={item.label}>
                <p className="font-display text-[clamp(3.4rem,6vw,5rem)] font-light leading-none tracking-[-0.04em] text-brand-cream">
                  {item.value}
                  <em className="text-brand-sage">{item.suffix}</em>
                </p>
                <p className="mt-4 max-w-48 text-sm leading-[1.55] text-brand-cream/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-24 md:py-32">
        <div className="section-shell max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="meta text-brand-forest">Inside Iconic</p>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,5.5vw,4.5rem)] font-normal leading-[1.03] tracking-[-0.025em] text-brand-ink">
              How we <em className="text-brand-forest">actually run things.</em>
            </h2>
            <p className="mt-6 font-display text-xl leading-[1.55] text-brand-ink/72">
              A few traditions we&apos;ve built in. None of this is marketing. It&apos;s just how we want this place to feel for the team and the towns we work in.
            </p>
          </div>

          <div className="mt-20 grid gap-14 lg:grid-cols-[0.95fr_1fr] lg:items-center lg:gap-20">
            <div>
              <p className="-rotate-2 font-[var(--font-caveat)] text-3xl font-semibold text-brand-gold">every December</p>
              <p className="mt-3 font-display text-[clamp(5.7rem,13vw,11rem)] font-light leading-[0.86] tracking-[-0.05em] text-brand-forest">
                250<em className="text-brand-gold">+</em>
              </p>
              <h3 className="mt-4 font-display text-3xl font-medium tracking-[-0.01em] text-brand-ink">coats collected last year alone.</h3>
              <p className="mt-7 max-w-xl font-display text-xl leading-[1.7] text-brand-ink/72">
                Every December, the whole team runs a coat drive across our service area, collecting from neighbors, schools, and customers, then donating to local families before the worst of winter hits.
              </p>
            </div>
            <figure className="relative mx-auto w-full max-w-[30rem] -rotate-2 bg-white p-4 pb-16 shadow-[0_8px_18px_rgba(20,26,20,0.08),0_28px_70px_rgba(20,26,20,0.16)] transition-transform duration-300 hover:rotate-0">
              <span className="absolute -top-3 left-8 h-7 w-24 -rotate-6 bg-brand-tan/65 shadow-sm" />
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src="/community/coat-drive-team.jpg" alt="Iconic Landscaping annual coat drive" fill className="object-cover" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-4 text-center font-[var(--font-caveat)] text-2xl font-semibold text-brand-ink/70">
                coat drive, Dec &apos;24
              </figcaption>
            </figure>
          </div>

          <div className="mx-auto my-20 flex max-w-xl items-center gap-6 text-center">
            <span className="h-px flex-1 bg-brand-sage/40" />
            <span className="font-[var(--font-caveat)] text-2xl text-brand-ink/45">x</span>
            <span className="h-px flex-1 bg-brand-sage/40" />
          </div>

          <div className="grid gap-14 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-20">
            <figure className="relative mx-auto w-full max-w-[32rem] rotate-2 bg-white p-4 pb-16 shadow-[0_8px_18px_rgba(20,26,20,0.08),0_28px_70px_rgba(20,26,20,0.16)] transition-transform duration-300 hover:rotate-0">
              <span className="absolute -top-3 right-10 h-7 w-28 rotate-6 bg-brand-forest/20 shadow-sm" />
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image src="/team/team-hero.jpg" alt="Iconic Landscaping crew together" fill className="object-cover" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-4 text-center font-[var(--font-caveat)] text-2xl font-semibold text-brand-ink/70">
                year-end crew moment
              </figcaption>
            </figure>
            <div>
              <p className="-rotate-2 font-[var(--font-caveat)] text-3xl font-semibold text-brand-gold">end of every season</p>
              <h3 className="mt-4 max-w-xl font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.02em] text-brand-ink">
                One night, <em className="text-brand-forest">schedule down,</em> whole crew at the table.
              </h3>
              <p className="mt-7 max-w-xl font-display text-xl leading-[1.7] text-brand-ink/72">
                At the end of every year we shut everything down for one night, take the entire crew out to dinner, and recognize the people who showed up the hardest. It&apos;s small, it&apos;s not for show, and it matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-bone py-24 md:py-36">
        <div className="section-shell max-w-3xl">
          <p className="meta text-center text-brand-forest">A Note From Us</p>
          <h2 className="mt-6 text-center font-display text-[clamp(2.4rem,5vw,4rem)] font-normal leading-[1.08] tracking-[-0.025em] text-brand-ink">
            Why we still do <em className="text-brand-forest">every walkthrough.</em>
          </h2>
          <div className="mt-12 space-y-7 font-display text-xl leading-[1.72] text-brand-ink/75 md:text-[1.35rem]">
            <p>We&apos;re young. We know that. Some homeowners pause when they find out the crew pulling into their driveway is mostly college students. We get it.</p>
            <p>
              So here&apos;s what we&apos;ll say: <strong className="font-semibold text-brand-ink">we chose this work.</strong> We didn&apos;t end up in landscaping because we couldn&apos;t find anything else. We&apos;re doing it because we love being outside, we love the satisfaction of a job done right, and we love that what we do shows up the moment someone pulls into their driveway.
            </p>
            <p>That&apos;s why we still do every final walkthrough. Why we won&apos;t leave a job until it&apos;s right. And why we&apos;d rather grow slower and keep the work tight than scale fast and let it slip.</p>
            <p>If you give us a yard, we&apos;ll give you our best work. That&apos;s the deal.</p>
          </div>
          <div className="mt-12 border-t border-brand-sage/35 pt-9">
            <p className="-rotate-2 font-[var(--font-caveat)] text-4xl font-semibold text-brand-ink">The Iconic team</p>
            <p className="mt-2 text-sm tracking-[0.05em] text-brand-ink/45">Pottstown, PA · 2026</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#142C20] py-24 text-center text-brand-cream md:py-32">
        <Image src="/photos/property-finish.jpg" alt="Finished landscaping by Iconic Landscaping" fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-[#142C20]/88" />
        <div className="section-shell relative max-w-4xl">
          <p className="font-[var(--font-caveat)] text-3xl font-semibold text-brand-sage">come work with us</p>
          <h2 className="mt-4 font-display text-[clamp(2.7rem,6vw,5rem)] font-normal leading-[1.03] tracking-[-0.025em] text-brand-cream">
            Got a yard that <em className="text-brand-sage">needs us?</em>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl font-display text-xl leading-[1.55] text-brand-cream/82">
            Free quote. Usually responds within 24 hours. We&apos;d love to take a look.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              href="/contact#quote"
              ariaLabel="Get a free quote from Iconic Landscaping"
              className="border-brand-cream bg-brand-cream px-8 py-4 text-brand-forest hover:border-brand-tan hover:bg-brand-tan"
            >
              Get a Free Quote
            </Button>
            <a
              href={`tel:${PHONE_LINK}`}
              className="inline-flex items-center justify-center rounded-full border border-brand-cream/45 px-8 py-4 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-cream/10"
            >
              Call {PHONE_DISPLAY}
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-cream/45 px-8 py-4 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-cream/10"
            >
              See Our Work <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
