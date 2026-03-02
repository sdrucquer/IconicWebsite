import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="section-shell py-24 text-center">
      <h1 className="text-4xl font-extrabold text-brand-dark">Page Not Found</h1>
      <p className="mx-auto mt-4 max-w-xl text-brand-dark/75">The page you are looking for may have moved or no longer exists.</p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-accent" aria-label="Return to Iconic Landscaping homepage">
        Back to Home
      </Link>
    </section>
  );
}
