import { areaSlugs } from "@/data/areas";
import type { Service } from "@/data/services";

export type ResourceFAQ = {
  question: string;
  answer: string;
};

export type ResourceArticle = {
  slug: string;
  title: string;
  summary: string;
  heroImage: string;
  publishDate: string;
  updatedDate: string;
  author: string;
  readTime: string;
  intro: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
  processSteps: string[];
  costRange: string;
  relatedServiceSlugs: Service["slug"][];
  relatedAreaSlugs: string[];
  faqs: ResourceFAQ[];
};

export const resourceArticles: ResourceArticle[] = [
  {
    slug: "spring-cleanup-checklist-pottstown",
    title: "Spring Cleanup Checklist for Pottstown Homeowners",
    summary:
      "A practical spring cleanup plan for suburban properties in and around Pottstown, including timing, priorities, and common mistakes.",
    heroImage: "/photos/home/hero.jpg",
    publishDate: "2026-03-02",
    updatedDate: "2026-03-02",
    author: "Iconic Landscaping Team",
    readTime: "6 min",
    intro:
      "The best spring cleanups are sequence-driven. Start in the wrong order and you lose time, miss debris zones, and pay twice for labor. This checklist is how local crews keep projects efficient and clean.",
    sections: [
      {
        heading: "Start with debris and access",
        body: [
          "Walk the full property first. Flag downed limbs, soft turf zones, and access bottlenecks.",
          "Clear heavy debris before fine-detail work so your team is not retracing the same areas."
        ]
      },
      {
        heading: "Reset bed edges before mulch",
        body: [
          "Edge lines define the final look. If edging is skipped, fresh mulch still looks unfinished.",
          "Complete bed cleanup before installing any new material so weeds and dead growth are not trapped under mulch."
        ]
      },
      {
        heading: "Close out with haul-away and walkthrough",
        body: [
          "Cleanup is incomplete until debris leaves the site.",
          "A short final walkthrough catches missed corners and ensures expectations match the finished result."
        ]
      }
    ],
    processSteps: [
      "Property walkthrough and scope confirmation",
      "Debris removal and initial blow-out",
      "Bed cleanup and edge definition",
      "Selective trimming and detail pass",
      "Final cleanup with optional off-site removal"
    ],
    costRange: "$350-$1,600+ depending on lot size, debris volume, and add-on services",
    relatedServiceSlugs: ["spring-cleanup", "leaf-cleanup", "bed-cleanup", "off-site-removal"],
    relatedAreaSlugs: ["pottstown", "spring-city"],
    faqs: [
      {
        question: "When should spring cleanup happen in Southeast PA?",
        answer:
          "Most homes should be scheduled from early March through late April before growth accelerates and cleanup gets more labor intensive."
      },
      {
        question: "Is spring cleanup the same as weekly maintenance?",
        answer:
          "No. Spring cleanup is a reset service. Weekly maintenance keeps the property in that improved state afterward."
      }
    ]
  },
  {
    slug: "mulch-pricing-guide-pottstown",
    title: "Mulch Pricing Guide: What Drives Cost in Pottstown-Area Projects",
    summary:
      "Understand what actually moves mulch project pricing so you can compare quotes accurately and avoid hidden scope gaps.",
    heroImage: "/photos/property-finish.jpg",
    publishDate: "2026-03-02",
    updatedDate: "2026-03-02",
    author: "Iconic Landscaping Team",
    readTime: "5 min",
    intro:
      "Mulch quotes can look similar on paper but deliver very different outcomes. The difference is usually scope detail, prep depth, and cleanup discipline.",
    sections: [
      {
        heading: "Material is only part of the price",
        body: [
          "Delivery coordination, spread depth consistency, and edge detail are major labor drivers.",
          "Low bids often assume limited prep and minimal cleanup."
        ]
      },
      {
        heading: "Prep work affects final quality",
        body: [
          "Mulch installed over weeds or debris fails quickly and looks uneven.",
          "Bed cleanup and edging prior to mulch consistently produce better longevity and curb appeal."
        ]
      }
    ],
    processSteps: [
      "Confirm desired finish and mulch color",
      "Measure bed zones and plan material quantity",
      "Complete cleanup and edging",
      "Install mulch with even depth",
      "Final detail pass and hardscape cleanup"
    ],
    costRange: "Installed projects commonly range from $350-$2,000+ based on volume and prep requirements",
    relatedServiceSlugs: ["mulching", "bed-cleanup", "edging", "weeding"],
    relatedAreaSlugs: ["pottstown", "royersford", "chester-springs"],
    faqs: [
      {
        question: "How often should mulch be refreshed?",
        answer: "Most properties benefit from one refresh per year with periodic touch-ups in high-traffic zones."
      },
      {
        question: "Should I choose mulch-only or prep plus mulch?",
        answer:
          "Prep plus mulch usually delivers better visual quality and longer-lasting results, especially on beds with weed pressure."
      }
    ]
  },
  {
    slug: "leaf-cleanup-timing-pennsylvania",
    title: "Leaf Cleanup Timing in Pennsylvania: When to Book and Why",
    summary:
      "A local timing framework for fall and late-season leaf cleanup so turf and beds are protected before winter damage sets in.",
    heroImage: "/photos/leaf-cleanup-working.jpg",
    publishDate: "2026-03-02",
    updatedDate: "2026-03-02",
    author: "Iconic Landscaping Team",
    readTime: "4 min",
    intro:
      "The best leaf cleanup plan is not one visit at the end. Properties with heavy tree cover often need staged cleanup windows to avoid lawn matting.",
    sections: [
      {
        heading: "Why delayed cleanup causes problems",
        body: [
          "Leaf mats trap moisture and reduce airflow at the turf surface.",
          "Heavy accumulation in beds also increases mold and pest pressure."
        ]
      },
      {
        heading: "Set a two-visit strategy for dense tree zones",
        body: [
          "Mid-season cleanup controls bulk volume.",
          "Late-season cleanup handles final drop and gets properties winter-ready."
        ]
      }
    ],
    processSteps: [
      "Evaluate tree density and leaf load",
      "Book first cleanup before peak accumulation",
      "Schedule final cleanup after major drop",
      "Bundle off-site removal when curb piles are not desired"
    ],
    costRange: "$250-$1,200+ based on lot size, access, and removal volume",
    relatedServiceSlugs: ["leaf-cleanup", "off-site-removal", "spring-cleanup"],
    relatedAreaSlugs: ["spring-city", "douglassville", "pottstown"],
    faqs: [
      {
        question: "Do I need more than one cleanup each fall?",
        answer:
          "Many homes with moderate to heavy tree cover do. A two-visit plan usually protects lawn health and avoids extreme end-of-season buildup."
      },
      {
        question: "Can leaf cleanup include bed detail work?",
        answer: "Yes. Cleanup can include beds, fence lines, and transitions so the property has a complete finish."
      }
    ]
  },
  {
    slug: "before-after-landscaping-photos-that-build-trust",
    title: "Before-and-After Landscaping Photos That Actually Build Trust",
    summary:
      "How to use authentic field photos to improve conversion rates and support local SEO performance across service pages.",
    heroImage: "/photos/leaf-cleanup-before.jpg",
    publishDate: "2026-03-02",
    updatedDate: "2026-03-02",
    author: "Iconic Landscaping Team",
    readTime: "5 min",
    intro:
      "Homeowners decide quickly based on visual proof. Real before-and-after sets outperform generic portfolio shots because they show process, not just outcomes.",
    sections: [
      {
        heading: "Capture the full job arc",
        body: [
          "Take photos before work, during execution, and after closeout.",
          "Use consistent angles so visitors can compare results honestly."
        ]
      },
      {
        heading: "Pair photos with scope details",
        body: [
          "Add short captions covering service type, location, and what changed.",
          "This context improves both user trust and semantic relevance for SEO."
        ]
      }
    ],
    processSteps: [
      "Shot list prepared before arrival",
      "Capture baseline condition",
      "Document in-progress transformation",
      "Photograph final state and detail work",
      "Publish with service and location context"
    ],
    costRange: "Not a billable service line; improves marketing performance and quote conversion",
    relatedServiceSlugs: ["bed-cleanup", "mulching", "spring-cleanup"],
    relatedAreaSlugs: ["pottstown", "chester-springs", "royersford"],
    faqs: [
      {
        question: "Should every service page include local project photos?",
        answer: "Yes. Real project imagery with location context materially increases trust and engagement."
      },
      {
        question: "How many photos are ideal per page?",
        answer: "Three to six high-quality images per service page is usually enough for clarity without slowing page performance."
      }
    ]
  },
  {
    slug: "how-to-choose-landscaper-pottstown",
    title: "How to Choose a Landscaping Company in Pottstown",
    summary:
      "A practical buyer checklist for comparing local landscaping companies based on communication, scope clarity, and execution standards.",
    heroImage: "/team/team-hero.jpg",
    publishDate: "2026-03-02",
    updatedDate: "2026-03-02",
    author: "Iconic Landscaping Team",
    readTime: "6 min",
    intro:
      "Most homeowners compare price first, but project success usually depends on process discipline and communication standards. Here is what to evaluate before hiring.",
    sections: [
      {
        heading: "Ask for scope detail, not just a number",
        body: [
          "A reliable quote lists included tasks and closeout standards.",
          "Vague one-line estimates increase surprise charges and quality variance."
        ]
      },
      {
        heading: "Verify communication expectations",
        body: [
          "Confirm response times, scheduling windows, and change-order process.",
          "Good communication reduces nearly all project friction."
        ]
      }
    ],
    processSteps: [
      "Collect 2-3 quotes",
      "Compare scope inclusions line by line",
      "Validate licensing/insurance and review history",
      "Confirm timeline and closeout expectations",
      "Choose based on value, not headline price alone"
    ],
    costRange: "Use this framework before approving projects from a few hundred to several thousand dollars",
    relatedServiceSlugs: ["bed-cleanup", "mulching", "brush-cleanup", "spring-cleanup"],
    relatedAreaSlugs: ["pottstown", "royersford", "douglassville"],
    faqs: [
      {
        question: "What is the biggest red flag when comparing landscapers?",
        answer: "Unclear scope and weak communication standards are the most common sources of bad outcomes."
      },
      {
        question: "Should I always choose the lowest quote?",
        answer:
          "Not necessarily. Lower quotes often exclude prep, detail work, or haul-away that materially affect results."
      }
    ]
  },
  {
    slug: "brush-cleanup-overgrowth-guide",
    title: "Overgrowth and Brush Cleanup Guide for Suburban Properties",
    summary:
      "What to expect when reclaiming overgrown fence lines, unmanaged corners, and vine-heavy sections around homes in Southeast PA.",
    heroImage: "/photos/brush-cleanup.jpg",
    publishDate: "2026-03-02",
    updatedDate: "2026-03-02",
    author: "Iconic Landscaping Team",
    readTime: "5 min",
    intro:
      "Brush cleanup is often underestimated. Dense growth can hide access issues and dramatically increase disposal volume if not scoped correctly.",
    sections: [
      {
        heading: "Scope starts with density and access",
        body: [
          "Two similar-sized areas can require very different labor based on vine density and debris extraction path.",
          "Early walkthroughs help avoid underquoting and schedule overruns."
        ]
      },
      {
        heading: "Closeout quality matters",
        body: [
          "A proper finish includes hauling material and cleaning transitions.",
          "Leaving debris piles undermines both safety and curb appeal."
        ]
      }
    ],
    processSteps: [
      "Walk and flag overgrowth zones",
      "Cut back dense brush in stages",
      "Separate debris for efficient loading",
      "Haul away material",
      "Final pass to restore usability and visibility"
    ],
    costRange: "$450-$2,500+ depending on growth density, access, and disposal volume",
    relatedServiceSlugs: ["brush-cleanup", "off-site-removal", "bush-trimming"],
    relatedAreaSlugs: ["douglassville", "spring-city", "royersford"],
    faqs: [
      {
        question: "Can brush cleanup be completed in one day?",
        answer: "Many projects can, but dense or large zones may require additional crew time."
      },
      {
        question: "Do I need off-site removal for brush cleanup?",
        answer:
          "If you do not want curb piles or on-property debris stacks, off-site removal is the best closeout option."
      }
    ]
  }
];

export const resourceMap = Object.fromEntries(resourceArticles.map((article) => [article.slug, article]));

export const resourceSlugs = resourceArticles.map((article) => article.slug);

export function isAreaSlug(value: string): value is (typeof areaSlugs)[number] {
  return areaSlugs.includes(value);
}
