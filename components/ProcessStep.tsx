import { ReactNode } from "react";

type ProcessStepProps = {
  step: number;
  title: string;
  description: string;
  icon: ReactNode;
};

export function ProcessStep({ step, title, description, icon }: ProcessStepProps) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-brand-primary/12 bg-white p-6 shadow-card lg:p-9 xl:p-10">
      <span className="pointer-events-none absolute -right-2 top-0 font-display text-8xl font-extrabold leading-none text-brand-primary/10">
        {step}
      </span>
      <span className="inline-flex rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-white shadow-sm lg:text-sm">
        Step {step}
      </span>
      <div className="mt-4 inline-flex rounded-xl border border-brand-primary/10 bg-brand-light p-3 text-brand-primary lg:p-3.5">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-xl font-bold text-brand-dark lg:text-[1.65rem]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-dark/75 lg:text-[1.05rem]">{description}</p>
    </article>
  );
}
