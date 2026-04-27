import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ServiceFeatureProps = {
  meta: string;
  headline: string;
  copy: string;
  href: string;
  image: { src: string; alt: string };
  imageSide?: "left" | "right";
};

export function ServiceFeature({
  meta,
  headline,
  copy,
  href,
  image,
  imageSide = "right"
}: ServiceFeatureProps) {
  const isLeft = imageSide === "left";

  return (
    <article className="grid items-center gap-6 md:gap-10 lg:grid-cols-12 lg:gap-14">
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden lg:col-span-7 lg:aspect-[5/4] ${
          isLeft ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
        />
      </div>

      <div
        className={`lg:col-span-5 ${
          isLeft ? "lg:order-2 lg:pl-2" : "lg:order-1 lg:pr-2"
        }`}
      >
        <p className="meta">{meta}</p>
        <h3 className="mt-3 font-[var(--font-fraunces)] text-3xl font-medium leading-[1.05] tracking-[-0.01em] text-brand-ink md:text-4xl lg:text-[2.6rem]">
          {headline}
        </h3>
        <p className="lede mt-4 max-w-prose">{copy}</p>
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-forest underline-offset-4 hover:underline"
        >
          Read about {meta.toLowerCase()} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
