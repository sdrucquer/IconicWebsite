import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  ctaLabel?: string;
  meta?: string;
};

export function ServiceCard({
  title,
  description,
  href,
  icon,
  ctaLabel = "Learn More",
  meta
}: ServiceCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-brand-primary/10 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_8px_30px_rgba(45,106,47,0.15)] lg:p-9 xl:p-10">
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-brand-primary/20 via-brand-accent to-brand-primary/20 opacity-80" />
      <div className="mb-5 inline-flex rounded-full border border-brand-primary/10 bg-[#ebf5ec] p-3.5 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white lg:p-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-brand-dark lg:text-[1.72rem]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-dark/75 lg:text-[1.05rem]">{description}</p>
      {meta ? <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-brand-primary lg:text-sm">{meta}</p> : null}
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition-colors hover:text-brand-accent lg:text-base"
        aria-label={`Learn more about ${title}`}
      >
        {ctaLabel} <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
