type TestimonialCardProps = {
  name: string;
  quote: string;
};

export function TestimonialCard({ name, quote }: TestimonialCardProps) {
  return (
    <article className="rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-soft">
      <p className="text-lg text-brand-accent">★★★★★</p>
      <p className="mt-4 text-sm leading-relaxed text-brand-dark/80">&ldquo;{quote}&rdquo;</p>
      <p className="mt-5 text-sm font-semibold text-brand-dark">{name}</p>
    </article>
  );
}
