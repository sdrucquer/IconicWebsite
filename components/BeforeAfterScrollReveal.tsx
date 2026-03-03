"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";

type BeforeAfterScrollRevealProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  title?: string;
  subtitle?: string;
};

export function BeforeAfterScrollReveal({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  title = "See the Transformation as You Scroll",
  subtitle = "From cleanup needed to finished curb appeal."
}: BeforeAfterScrollRevealProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileImageRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileImageRef,
    offset: ["end 98%", "end 60%"]
  });

  const desktopProgress = useTransform(scrollYProgress, [0.08, 0.62], [0, 1]);
  const mobileProgress = useTransform(mobileScrollYProgress, [0, 1], [0, 1]);

  const clipLeftDesktop = useTransform(desktopProgress, [0, 1], ["100%", "0%"]);
  const clipLeftMobile = useTransform(mobileProgress, [0, 1], ["100%", "0%"]);
  const dividerDesktopX = useTransform(desktopProgress, [0, 1], ["100%", "0%"]);
  const dividerMobileX = useTransform(mobileProgress, [0, 1], ["100%", "0%"]);
  const clipPathDesktop = useMotionTemplate`inset(0 0 0 ${clipLeftDesktop})`;
  const clipPathMobile = useMotionTemplate`inset(0 0 0 ${clipLeftMobile})`;

  return (
    <section ref={sectionRef} className="section-shell py-10 md:py-14 lg:py-20">
      <div className="mb-5 md:mb-7">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
      </div>

      <div className="relative hidden lg:block lg:h-[160vh]">
        <div className="sticky top-20">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-brand-primary/15 bg-white shadow-card">
            <Image src={beforeSrc} alt={beforeAlt} fill className="object-cover" sizes="(max-width: 1280px) 92vw, 1200px" priority />

            <motion.div
              className="absolute inset-0"
              style={{
                clipPath: prefersReducedMotion ? "inset(0 50% 0 0)" : clipPathDesktop
              }}
            >
              <Image src={afterSrc} alt={afterAlt} fill className="object-cover" sizes="(max-width: 1280px) 92vw, 1200px" />
            </motion.div>

            {!prefersReducedMotion && (
              <motion.div
                className="pointer-events-none absolute bottom-0 top-0 w-0.5 bg-white/85 shadow-[0_0_18px_rgba(255,255,255,0.7)]"
                style={{ left: dividerDesktopX }}
              />
            )}

            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 md:p-5">
              <span className="rounded-full bg-black/55 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">Before</span>
              <span className="rounded-full bg-black/55 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">After</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={mobileImageRef} className="relative lg:hidden">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-primary/15 bg-white shadow-card">
          <Image src={beforeSrc} alt={beforeAlt} fill className="object-cover" sizes="92vw" />

          <motion.div
            className="absolute inset-0"
            style={{
              clipPath: prefersReducedMotion ? "inset(0 50% 0 0)" : clipPathMobile
            }}
          >
            <Image src={afterSrc} alt={afterAlt} fill className="object-cover" sizes="92vw" />
          </motion.div>

          {!prefersReducedMotion && (
            <motion.div
              className="pointer-events-none absolute bottom-0 top-0 w-0.5 bg-white/85 shadow-[0_0_14px_rgba(255,255,255,0.65)]"
              style={{ left: dividerMobileX }}
            />
          )}

          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-3">
            <span className="rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">Before</span>
            <span className="rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">After</span>
          </div>
        </div>
      </div>
    </section>
  );
}
