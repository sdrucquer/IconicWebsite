import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

type ServiceCompactCardProps = {
  name: string;
  desc: string;
  image: string;
  icon: ReactNode;
  href: string;
};

export function ServiceCompactCard({ name, desc, image, icon, href }: ServiceCompactCardProps) {
  return (
    <Link
      href={href}
      className="group flex overflow-hidden rounded bg-brand-bone transition-shadow hover:shadow-soft"
    >
      <div className="relative w-[110px] flex-none sm:w-[130px]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="130px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1.5 px-4 py-5 sm:px-5">
        <div className="text-brand-forest">{icon}</div>
        <p className="font-[var(--font-fraunces)] text-base font-medium leading-tight text-brand-ink sm:text-lg">
          {name}
        </p>
        <p className="text-xs leading-relaxed text-brand-ink/65 sm:text-sm">{desc}</p>
        <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand-forest transition-colors group-hover:text-brand-moss sm:text-sm">
          Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
