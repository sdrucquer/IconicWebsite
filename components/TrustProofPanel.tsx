const trustPoints = [
  {
    label: "Google Rating",
    value: "4.6 stars",
    detail: "40+ verifiable reviews"
  },
  {
    label: "Customers Served",
    value: "500+",
    detail: "Across the Greater Pottstown area"
  },
  {
    label: "Response Time",
    value: "Within 24 hours",
    detail: "All quote requests receive a response"
  }
];

export function TrustProofPanel({ title = "Why homeowners trust Iconic" }: { title?: string }) {
  return (
    <section className="rounded-2xl border border-brand-primary/15 bg-white p-6 shadow-soft md:p-7">
      <h2 className="font-display text-2xl font-extrabold text-brand-dark md:text-3xl">{title}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {trustPoints.map((point) => (
          <article key={point.label} className="rounded-xl border border-brand-primary/10 bg-brand-light p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary/75">{point.label}</p>
            <p className="mt-1 text-xl font-extrabold text-brand-dark">{point.value}</p>
            <p className="mt-2 text-sm text-brand-dark/75">{point.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
