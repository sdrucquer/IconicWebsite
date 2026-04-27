import { Clock3, ShieldCheck, CheckCircle2 } from "lucide-react";

const items = [
  {
    icon: Clock3,
    title: "Within 24 hours",
    sub: "We respond quickly so you know the next step."
  },
  {
    icon: ShieldCheck,
    title: "Licensed & insured",
    sub: "Your property is protected."
  },
  {
    icon: CheckCircle2,
    title: "Final walkthrough",
    sub: "We review the work before leaving and make it right if needed."
  }
];

export function WhyChooseUs() {
  return (
    <section className="bg-brand-forest text-brand-cream">
      <div className="section-shell band-tight">
        <p className="meta text-brand-cream/65">Why Iconic</p>
        <h2 className="mt-6 max-w-4xl font-[var(--font-fraunces)] text-[clamp(2.2rem,6.2vw,4rem)] font-medium leading-[0.98] tracking-[-0.02em] text-brand-cream">
          Trusted by 500+ customers
        </h2>
        <ul className="mt-12 grid gap-9 md:mt-14 md:gap-10">
          {items.map(({ icon: Icon, title, sub }) => (
            <li key={title} className="grid grid-cols-[4.5rem_1fr] items-start gap-x-5 gap-y-0 md:grid-cols-[5rem_1fr] md:gap-x-6">
              <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-brand-cream/10 md:h-20 md:w-20">
                <Icon className="h-8 w-8 text-brand-tan md:h-9 md:w-9" />
              </div>
              <div className="pt-1 md:pt-2">
                <p className="text-[1.65rem] font-semibold leading-[1.06] text-brand-cream md:text-[2.1rem]">
                  {title}
                </p>
                <p className="mt-2 max-w-[28rem] text-[0.98rem] leading-[1.45] text-brand-cream/52 md:text-[1.02rem]">
                  {sub}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
