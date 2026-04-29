"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Copy, Facebook, Twitter } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ResourceArticle } from "@/data/resources";

type ResourceArticleExperienceProps = {
  article: ResourceArticle;
  relatedArticles: ResourceArticle[];
};

type ArticleSection = {
  id: string;
  title: ReactNode;
  tocTitle: string;
  paragraphs: ReactNode[];
  list?: string[];
  orderedList?: ReactNode[];
  image?: {
    src: string;
    alt: string;
    caption: string;
  };
};

const springSections: ArticleSection[] = [
  {
    id: "sequence",
    title: (
      <>
        Why <em className="italic text-[#2D5440]">sequence</em> matters more than effort.
      </>
    ),
    tocTitle: "Why sequence matters",
    paragraphs: [
      "Most yards in Pottstown, Royersford, and the surrounding area share the same shape after winter: leaves lodged against fences, broken stick debris in beds, mulch that's been thinned by snow and wind, and bed edges that have softened or disappeared.",
      <>
        You can attack any of these first. But each one constrains the next.{" "}
        <Link href="/services/mulching" className="text-[#2D5440] underline decoration-[#2D5440]/30 underline-offset-4 hover:decoration-[#2D5440]">
          Fresh mulch
        </Link>{" "}
        over an unedged bed looks like it was applied by someone who didn&apos;t care. Bed cleanup over leaves still on the lawn means you&apos;ll redo bed work twice. Trim a hedge first and the clippings end up in the beds you cleaned yesterday.
      </>,
      "The fix is a fixed sequence. Five steps, every property, regardless of size."
    ]
  },
  {
    id: "debris",
    title: "Start with debris and access.",
    tocTitle: "Start with debris and access",
    paragraphs: [
      "Walk the full property before you do anything. Flag downed limbs, soft turf zones, and anywhere the truck or equipment will struggle to reach. This walk takes ten minutes and saves the day.",
      "Then clear heavy debris first: fallen branches, large stick clusters, anything the blower can't move. Cleanup of fine leaf debris and bed work both produce dust and small particles you don't want resettling on a lawn that's still being raked."
    ],
    list: [
      "Branches and large limbs, either hauled or chipped on-site",
      "Leaf accumulation in corners, against fences, and in window wells",
      "Decomposing matter from last fall in low spots",
      "Trash and yard signs left over from winter",
      "Old mulch fragments in pathways and lawn edges"
    ]
  },
  {
    id: "beds",
    title: (
      <>
        Reset bed <em className="italic text-[#2D5440]">edges</em> before mulch.
      </>
    ),
    tocTitle: "Reset bed edges before mulch",
    paragraphs: [
      "This is the step that separates a real cleanup from a surface job. Edges define how the entire property reads. If edging is skipped, fresh mulch will still look unfinished because the boundary between bed and lawn is the visual signal that someone owns this space.",
      "Complete bed cleanup before installing any new material. That means weeding, debris removal, and re-cutting the edge lines. Skipping the weeding step means weeds and dead growth get trapped under mulch, then come back through within weeks."
    ],
    image: {
      src: "/photos/services/edging/after.jpg",
      alt: "Newly defined bed edges with fresh hardwood mulch on a Pottstown-area property",
      caption: "A redefined bed edge, the visual signal that says this property is taken care of."
    }
  },
  {
    id: "trim",
    title: "Selective trimming and detail pass.",
    tocTitle: "Selective trimming and detail",
    paragraphs: [
      "Hedges, shrubs, and ornamentals often look fine in winter and rough by April. A spring cleanup is the right time to do a selective pass, not a full shape, that takes off winter damage, dead branches, and the most obvious overgrowth.",
      "Save the major shape work for late spring or early summer when you can see the new growth pattern. Cutting too aggressively in March can stress plants right when they're trying to push."
    ]
  },
  {
    id: "walkthrough",
    title: "Close out with haul-away and walkthrough.",
    tocTitle: "Close out with a walkthrough",
    paragraphs: [
      "A cleanup isn't done until the debris leaves the property. This is where some homeowners get burned: a crew finishes the visible work, leaves piles of debris in the back corner, and considers it a job. It's not.",
      "A short final walkthrough with the homeowner, even a five-minute one, catches missed corners and ensures expectations match the finished result. We do this on every job. It's the cheapest insurance policy in the business."
    ]
  },
  {
    id: "mistakes",
    title: (
      <>
        Common <em className="italic text-[#2D5440]">Pottstown-area</em> mistakes.
      </>
    ),
    tocTitle: "Common Pottstown mistakes",
    paragraphs: [
      "A few things we see consistently across Montgomery, Chester, and Berks County properties, usually from DIY work or from quick-flip crews moving too fast:"
    ],
    orderedList: [
      <>
        <strong className="font-semibold text-[#1A1A1A]">Mulching too early.</strong> Beds aren&apos;t fully cleaned, weeds get sealed in, and the property looks finished for two weeks before everything pushes through.
      </>,
      <>
        <strong className="font-semibold text-[#1A1A1A]">Skipping edges.</strong> The single highest-impact, lowest-effort step. Skipping it makes everything else look worse.
      </>,
      <>
        <strong className="font-semibold text-[#1A1A1A]">Over-trimming in March.</strong> Stress before the growth window means dead-looking shrubs through May.
      </>,
      <>
        <strong className="font-semibold text-[#1A1A1A]">Leaving debris on-site.</strong> Saves the crew an hour. Costs the homeowner the satisfaction of a finished result.
      </>
    ]
  }
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatMetaDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    timeZone: "UTC"
  }).format(new Date(value));
}

function articleCategory(article: ResourceArticle) {
  if (article.slug.includes("spring") || article.slug.includes("leaf")) return "Spring & Fall";
  if (article.slug.includes("choose")) return "Hiring";
  if (article.slug.includes("photo")) return "Local Wisdom";
  return "Bed Work";
}

function buildSections(article: ResourceArticle): ArticleSection[] {
  if (article.slug === "spring-cleanup-checklist-pottstown") {
    return springSections;
  }

  return article.sections.map((section) => ({
    id: slugify(section.heading),
    title: section.heading,
    tocTitle: section.heading,
    paragraphs: section.body
  }));
}

export function ResourceArticleExperience({ article, relatedArticles }: ResourceArticleExperienceProps) {
  const sections = useMemo(() => buildSections(article), [article]);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(() => new Set([0]));
  const isSpring = article.slug === "spring-cleanup-checklist-pottstown";
  const introParagraphs: ReactNode[] = isSpring
    ? [
        <>
          The best spring cleanups are <strong className="font-semibold text-[#1A1A1A]">sequence-driven</strong>. Start in the wrong order and you lose time, miss debris zones, and pay twice for labor: once for the cleanup and once for the re-do. This guide is how local crews actually work through a Pottstown-area property in early spring, and why each step matters.
        </>,
        <>
          If you&apos;re hiring a crew or planning to tackle it yourself, the most useful thing isn&apos;t a list of tasks. It&apos;s the{" "}
          <em className="italic text-[#1A1A1A]">order</em>. Get that right and the rest follows.
        </>
      ]
    : [article.intro];

  useEffect(() => {
    function updateChrome() {
      const articleBody = document.getElementById("article-body");
      if (articleBody) {
        const start = articleBody.offsetTop;
        const end = start + articleBody.offsetHeight;
        const scroll = window.scrollY;
        const winH = window.innerHeight;
        const percent = scroll < start ? 0 : scroll + winH > end ? 100 : ((scroll - start) / Math.max(1, end - start - winH)) * 100;
        setProgress(Math.max(0, Math.min(100, percent)));
      }

      const scrollPos = window.scrollY + 140;
      let nextActive = sections[0]?.id ?? "";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPos) {
          nextActive = section.id;
        }
      }
      setActiveId(nextActive);
    }

    updateChrome();
    window.addEventListener("scroll", updateChrome, { passive: true });
    window.addEventListener("resize", updateChrome);
    return () => {
      window.removeEventListener("scroll", updateChrome);
      window.removeEventListener("resize", updateChrome);
    };
  }, [sections]);

  function toggleFaq(index: number) {
    setOpenFaqs((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function copyLink() {
    void navigator.clipboard?.writeText(window.location.href);
  }

  return (
    <>
      <div className="fixed left-0 top-0 z-[70] h-[3px] bg-[#2D5440] transition-[width] duration-100" style={{ width: `${progress}%` }} />

      <nav className="border-b border-[#D8D2C2] bg-[#FAF6EC] px-4 py-5 md:px-8" aria-label="Breadcrumb">
        <div className="mx-auto flex max-w-[82.5rem] flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] text-[#1A1A1A]/45">
          <Link href="/" className="hover:text-[#2D5440]">Home</Link>
          <span>/</span>
          <Link href="/resources" className="hover:text-[#2D5440]">Resources</Link>
          <span>/</span>
          <span className="text-[#1A1A1A]/75">{article.title}</span>
        </div>
      </nav>

      <header className="bg-[#FAF6EC] px-4 pb-10 pt-14 text-center md:px-8 md:pb-14 md:pt-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]/45">
            <span className="text-[#2D5440]">{articleCategory(article)}</span>
            <span className="h-1 w-1 rounded-full bg-[#1A1A1A]/30" />
            <span>{article.readTime} read</span>
            <span className="h-1 w-1 rounded-full bg-[#1A1A1A]/30" />
            <span>{formatMetaDate(article.publishDate)}</span>
          </div>

          <h1 className="font-display text-[clamp(2.5rem,6vw,4.75rem)] font-normal leading-none tracking-normal text-[#1A1A1A]">
            {isSpring ? (
              <>
                Spring Cleanup Checklist for <em className="italic text-[#2D5440]">Pottstown</em> Homeowners.
              </>
            ) : (
              article.title
            )}
          </h1>

          <p className="mx-auto mt-7 max-w-3xl font-display text-[clamp(1.25rem,2vw,1.55rem)] leading-relaxed tracking-normal text-[#1A1A1A]/75">
            {isSpring ? (
              <>
                A sequence-driven plan for suburban properties: <em className="italic text-[#1A1A1A]">what to do first, what to skip,</em> and the small decisions that separate a yard that looks fine from one that looks intentional.
              </>
            ) : (
              article.summary
            )}
          </p>

          <div className="mx-auto mt-9 flex max-w-md items-center justify-center gap-4 border-t border-[#D8D2C2] pt-8 text-left">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1B3A2A] font-display text-sm font-medium text-[#F5F1E8]">
              IL
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#1A1A1A]">{article.author.replace(" Landscaping", "")}</span>
              <span className="block text-xs italic leading-relaxed text-[#1A1A1A]/50">
                Field-tested across Pottstown, Royersford &amp; Phoenixville
              </span>
            </span>
          </div>
        </div>
      </header>

      <section className="bg-[#FAF6EC] px-4 md:px-8">
        <div className="mx-auto max-w-[82.5rem]">
          <div className="relative aspect-[16/8] min-h-[240px] overflow-hidden rounded-lg">
            <Image src={article.heroImage} alt={article.title} fill priority className="object-cover" sizes="(min-width: 1320px) 1320px, 100vw" />
          </div>
          <p className="mt-4 text-xs italic tracking-normal text-[#1A1A1A]/45">
            {isSpring
              ? "A finished spring cleanup in Pottstown, PA: defined edges, cleared beds, and a property ready for the season."
              : article.summary}
          </p>
        </div>
      </section>

      <section id="article-body" className="bg-[#FAF6EC] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[82.5rem] justify-center gap-12 lg:grid-cols-[13.75rem_minmax(0,42.5rem)_17.5rem] lg:gap-16 xl:gap-20">
          <aside className="hidden lg:block">
            <div className="sticky top-10">
              <p className="border-b border-[#D8D2C2] pb-4 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#1A1A1A]/45">
                In this guide
              </p>
              <ol className="mt-5 space-y-3">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className={`block border-l-2 py-1 pl-3 font-display text-sm leading-snug transition ${
                        activeId === section.id ? "border-[#2D5440] text-[#2D5440]" : "border-transparent text-[#1A1A1A]/45 hover:text-[#1A1A1A]"
                      }`}
                    >
                      {section.tocTitle}
                    </Link>
                  </li>
                ))}
              </ol>

              <div className="mt-8 border-t border-[#D8D2C2] pt-6">
                <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#1A1A1A]/45">Share</p>
                <div className="flex gap-2">
                  <button type="button" onClick={copyLink} aria-label="Copy link" className="grid h-9 w-9 place-items-center rounded-full border border-[#D8D2C2] text-[#1A1A1A]/70 transition hover:border-[#2D5440] hover:text-[#2D5440]">
                    <Copy className="h-4 w-4" />
                  </button>
                  <Link href={`https://www.facebook.com/sharer/sharer.php?u=https://iconic.land/resources/${article.slug}`} aria-label="Share on Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-[#D8D2C2] text-[#1A1A1A]/70 transition hover:border-[#2D5440] hover:text-[#2D5440]">
                    <Facebook className="h-4 w-4" />
                  </Link>
                  <Link href={`https://twitter.com/intent/tweet?url=https://iconic.land/resources/${article.slug}&text=${encodeURIComponent(article.title)}`} aria-label="Share on X" className="grid h-9 w-9 place-items-center rounded-full border border-[#D8D2C2] text-[#1A1A1A]/70 transition hover:border-[#2D5440] hover:text-[#2D5440]">
                    <Twitter className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          <article className="mx-auto w-full max-w-[42.5rem]">
            <div className="space-y-7 font-display text-[1.12rem] leading-loose tracking-normal text-[#1A1A1A] md:text-[1.2rem]">
              {introParagraphs.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "first-letter:float-left first-letter:mr-4 first-letter:mt-3 first-letter:font-display first-letter:text-7xl first-letter:font-medium first-letter:leading-[0.8] first-letter:text-[#2D5440]" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>

            {isSpring ? (
              <blockquote className="my-14 border-y border-[#D8D2C2] px-4 py-10 text-center font-display text-[clamp(1.55rem,3vw,2rem)] italic leading-snug tracking-normal text-[#2D5440] md:-mx-10 md:px-10">
                <span className="mb-6 block text-6xl leading-none text-[#2D5440]/30">&quot;</span>
                A spring cleanup isn&apos;t really about cleaning. It&apos;s about <em className="italic">resetting</em> the property to a state weekly maintenance can keep up with.
              </blockquote>
            ) : null}

            <div className="space-y-14">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="font-display text-[clamp(1.9rem,4vw,2.35rem)] font-medium leading-tight tracking-normal text-[#1A1A1A]">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-6 font-display text-[1.12rem] leading-loose tracking-normal text-[#1A1A1A] md:text-[1.18rem]">
                    {section.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                  {section.list ? (
                    <ul className="mt-6 list-disc space-y-2 pl-6 font-display text-[1.08rem] leading-relaxed text-[#1A1A1A] marker:text-[#2D5440]">
                      {section.list.map((item) => (
                        <li key={item} className="pl-2">{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.orderedList ? (
                    <ol className="mt-6 list-decimal space-y-3 pl-6 font-display text-[1.08rem] leading-relaxed text-[#1A1A1A] marker:font-medium marker:text-[#2D5440]">
                      {section.orderedList.map((item, index) => (
                        <li key={index} className="pl-2">{item}</li>
                      ))}
                    </ol>
                  ) : null}
                  {section.image ? (
                    <figure className="my-12 overflow-hidden md:-mx-10">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                        <Image src={section.image.src} alt={section.image.alt} fill className="object-cover" sizes="(min-width: 1024px) 760px, 100vw" />
                      </div>
                      <figcaption className="mt-3 px-1 text-sm italic text-[#1A1A1A]/50 md:px-10">{section.image.caption}</figcaption>
                    </figure>
                  ) : null}
                </section>
              ))}
            </div>

            {isSpring ? (
              <p className="mt-8 font-display text-[1.18rem] leading-loose text-[#1A1A1A]">
                If you&apos;re getting quotes from local crews, ask how each of these is handled. Anyone who can answer concretely is probably worth the conversation. Anyone who waves it off probably isn&apos;t.
              </p>
            ) : null}
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-10 space-y-4">
              <div className="rounded-lg border border-[#D8D2C2] bg-[#EFE9DC] p-6">
                <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#2D5440]">Recommended Process</p>
                <h2 className="mb-5 font-display text-xl font-medium leading-tight text-[#1A1A1A]">The five-step order.</h2>
                <ol className="space-y-3">
                  {article.processSteps.map((step, index) => (
                    <li key={step} className="flex gap-3 border-b border-[#E8E2D2] pb-3 font-display text-sm leading-snug text-[#1A1A1A]/72 last:border-0 last:pb-0">
                      <span className="shrink-0 italic text-[#2D5440]">{String(index + 1).padStart(2, "0")}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-lg border border-[#1B3A2A] bg-[#1B3A2A] p-6 text-[#F5F1E8]">
                <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#B8D4C0]">Typical Cost Range</p>
                <div className="font-display text-3xl leading-none tracking-normal">
                  {isSpring ? (
                    <>
                      $350<em className="italic text-[#B8D4C0]">-</em>$1,600<em className="italic text-[#B8D4C0]">+</em>
                    </>
                  ) : (
                    "Scope-based"
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#F5F1E8]/80">{article.costRange}</p>
                <Link href="/contact#quote" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F5F1E8] px-5 py-3 text-sm font-semibold text-[#1B3A2A] transition hover:translate-y-[-1px]">
                  Request a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-[#D8D2C2] bg-[#EFE9DC] px-4 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-[#2D5440]">Frequently Asked Questions</p>
          <h2 className="mt-4 text-center font-display text-[clamp(2rem,5vw,3rem)] font-normal leading-none tracking-normal text-[#1A1A1A]">
            A few <em className="italic text-[#2D5440]">asks.</em>
          </h2>
          <div className="mt-12 border-t border-[#D8D2C2]">
            {article.faqs.map((faq, index) => {
              const isOpen = openFaqs.has(index);
              return (
                <div key={faq.question} className="border-b border-[#D8D2C2]">
                  <button type="button" onClick={() => toggleFaq(index)} className="flex w-full items-center justify-between gap-6 py-7 text-left font-display text-lg font-medium text-[#1A1A1A] transition hover:text-[#2D5440]">
                    <span>{faq.question}</span>
                    <span className={`text-2xl font-light text-[#2D5440] transition ${isOpen ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60 pb-7" : "max-h-0"}`}>
                    <p className="font-display text-base leading-relaxed text-[#1A1A1A]/70">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF6EC] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-3xl gap-6 rounded-lg bg-[#EFE9DC] p-7 md:grid-cols-[6.25rem_1fr] md:items-center md:p-10">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1B3A2A] font-display text-2xl font-medium text-[#F5F1E8] md:h-24 md:w-24">
            IL
          </div>
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#2D5440]">Written By</p>
            <h2 className="mt-2 font-display text-2xl font-medium text-[#1A1A1A]">{article.author.replace(" Landscaping", "")}</h2>
            <p className="mt-2 font-display text-base leading-relaxed text-[#1A1A1A]/70">
              Field-tested guides from a local Pottstown landscaping crew working across Montgomery, Chester, and Berks Counties. We write these because customers keep asking the same questions in our quotes, and we&apos;d rather give thorough answers than rushed ones.
            </p>
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 ? (
        <section className="bg-[#FAF6EC] px-4 pb-20 md:px-8 md:pb-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-[#2D5440]">Keep Reading</p>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.5rem)] font-normal leading-none tracking-normal text-[#1A1A1A]">
                If you found this <em className="italic text-[#2D5440]">useful.</em>
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {relatedArticles.map((related) => (
                <Link href={`/resources/${related.slug}`} key={related.slug} className="group flex flex-col">
                  <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-md">
                    <Image src={related.heroImage} alt={related.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(min-width: 768px) 33vw, 100vw" />
                  </div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#2D5440]">{articleCategory(related)} · {related.readTime}</p>
                  <h3 className="mt-3 font-display text-[1.4rem] font-medium leading-tight tracking-normal text-[#1A1A1A] transition group-hover:text-[#2D5440]">{related.title}</h3>
                  <p className="mt-3 text-xs italic text-[#1A1A1A]/45">{related.author}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="quote" className="relative overflow-hidden bg-[#1B3A2A] px-4 py-24 text-center text-[#F5F1E8] md:px-8 md:py-32">
        <div className="relative mx-auto max-w-4xl">
          <p
            className="inline-block -rotate-2 text-[clamp(1.6rem,2.1vw,2rem)] font-semibold leading-none text-[#B8D4C0]"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
          >
            ↳ rather skip the homework?
          </p>
          <h2 className="mt-9 font-display text-[clamp(3rem,5.2vw,4.75rem)] font-normal leading-[1.05] tracking-normal">
            Let us <em className="italic text-[#B8D4C0]">handle the cleanup.</em>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl font-display text-[clamp(1.25rem,2.1vw,1.85rem)] leading-relaxed text-[#F5F1E8]/90">
            If you&apos;d rather have us assess the yard ourselves, we&apos;re happy to come take a look. Free quote, usually back the same day.
          </p>
          <Link href="/contact#quote" className="mt-16 inline-flex min-h-[5.25rem] min-w-[20rem] items-center justify-center gap-5 rounded-full bg-[#F5F1E8] px-10 py-6 text-xl font-semibold text-[#1B3A2A] transition hover:translate-y-[-2px] max-sm:min-h-16 max-sm:min-w-0 max-sm:px-8 max-sm:text-base">
            Get a Free Quote
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </section>
    </>
  );
}
