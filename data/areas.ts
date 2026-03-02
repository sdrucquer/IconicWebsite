import { services } from "@/data/services";

export type AreaFAQ = {
  question: string;
  answer: string;
};

export type Area = {
  slug: string;
  name: string;
  region: string;
  heroTitle: string;
  summary: string;
  serviceHighlights: string[];
  proofPoints: string[];
  faqs: AreaFAQ[];
  publishDate: string;
  updatedDate: string;
  featuredServiceSlugs: Array<(typeof services)[number]["slug"]>;
};

export const areas: Area[] = [
  {
    slug: "pottstown",
    name: "Pottstown",
    region: "PA",
    heroTitle: "Landscaping Services in Pottstown, PA",
    summary:
      "Our home base. Fast response times, clear communication, and dependable crews for cleanup, mulch, edging, and full seasonal resets.",
    serviceHighlights: [
      "Bed cleanup and mulch installs for curb appeal",
      "Spring and fall cleanup for seasonal transitions",
      "Brush clearing and off-site haul-away"
    ],
    proofPoints: [
      "All quote requests receive a response within 24 hours",
      "Local crews with dense route coverage in the borough and surrounding neighborhoods",
      "Transparent scope and pricing before work starts"
    ],
    faqs: [
      {
        question: "How quickly can you quote projects in Pottstown?",
        answer:
          "We respond to all quote requests within 24 hours, with project scope and complexity determining final scheduling."
      },
      {
        question: "Do you handle one-time cleanups or only recurring work?",
        answer:
          "Both. We handle one-time resets and can also recommend recurring maintenance based on property needs."
      }
    ],
    publishDate: "2026-03-02",
    updatedDate: "2026-03-02",
    featuredServiceSlugs: ["bed-cleanup", "mulching", "spring-cleanup", "leaf-cleanup"]
  },
  {
    slug: "royersford",
    name: "Royersford",
    region: "PA",
    heroTitle: "Landscaping Services in Royersford, PA",
    summary:
      "Detail-first landscaping and property cleanup for Royersford homeowners who want reliable crews and high-visibility curb appeal improvements.",
    serviceHighlights: [
      "Mulching and edging for clean front-of-home presentation",
      "Leaf cleanup and brush clearing in heavy tree zones",
      "Spring cleanup packages to reset properties after winter"
    ],
    proofPoints: [
      "Route scheduling coordinated with nearby service areas",
      "Licensed and insured crew coverage on every job",
      "Clear pre-job scope confirmation before tools hit the ground"
    ],
    faqs: [
      {
        question: "Do you bring materials for mulch jobs in Royersford?",
        answer:
          "Yes. We coordinate mulch sourcing, delivery, and install so you do not have to manage material logistics."
      },
      {
        question: "Can you combine brush cleanup with haul-away?",
        answer:
          "Yes. Brush cleanup can be bundled with off-site removal so your property is fully cleared before we leave."
      }
    ],
    publishDate: "2026-03-02",
    updatedDate: "2026-03-02",
    featuredServiceSlugs: ["mulching", "edging", "brush-cleanup", "off-site-removal"]
  },
  {
    slug: "spring-city",
    name: "Spring City",
    region: "PA",
    heroTitle: "Landscaping Services in Spring City, PA",
    summary:
      "Practical seasonal cleanup and curb-appeal upgrades for homes across Spring City, with straightforward quoting and consistent follow-through.",
    serviceHighlights: [
      "Leaf cleanup and spring reset services",
      "Bush trimming and overgrowth control",
      "Bed cleanup and planting bed redefinition"
    ],
    proofPoints: [
      "Efficient scheduling for high-leaf-volume neighborhoods",
      "Clean closeout process with optional off-site disposal",
      "Project walkthrough before and after service"
    ],
    faqs: [
      {
        question: "When should Spring City homes schedule spring cleanup?",
        answer:
          "Early to mid-spring is ideal, before growth accelerates and cleanup complexity rises."
      },
      {
        question: "Do you offer fall leaf cleanups in Spring City?",
        answer:
          "Yes. We handle one-time and recurring cleanup visits during high leaf season."
      }
    ],
    publishDate: "2026-03-02",
    updatedDate: "2026-03-02",
    featuredServiceSlugs: ["leaf-cleanup", "spring-cleanup", "bush-trimming", "bed-cleanup"]
  },
  {
    slug: "chester-springs",
    name: "Chester Springs",
    region: "PA",
    heroTitle: "Landscaping Services in Chester Springs, PA",
    summary:
      "Premium cleanup and detail work for Chester Springs properties with larger beds, mixed plantings, and high curb-appeal expectations.",
    serviceHighlights: [
      "Bed cleanup for dense ornamental planting zones",
      "Mulch refresh and edge definition",
      "Selective shrub trimming and shape refinement"
    ],
    proofPoints: [
      "Scope tailored to property layout and planting density",
      "Professional communication from quote to closeout",
      "Material and debris logistics handled by our team"
    ],
    faqs: [
      {
        question: "Can you handle larger front bed cleanups in Chester Springs?",
        answer:
          "Yes. We regularly quote and execute multi-zone bed cleanup projects with detailed scope breakdowns."
      },
      {
        question: "Do you recommend bundling edging with mulch?",
        answer:
          "Yes. Edging before mulch consistently creates the cleanest finished look and stronger visual definition."
      }
    ],
    publishDate: "2026-03-02",
    updatedDate: "2026-03-02",
    featuredServiceSlugs: ["bed-cleanup", "mulching", "edging", "bush-trimming"]
  },
  {
    slug: "douglassville",
    name: "Douglassville",
    region: "PA",
    heroTitle: "Landscaping Services in Douglassville, PA",
    summary:
      "Cleanup-focused landscaping for Douglassville properties, including brush removal, seasonal resets, and no-leftover-debris project closeouts.",
    serviceHighlights: [
      "Brush cleanup and invasive overgrowth clearing",
      "Leaf cleanup and spring reset services",
      "Off-site removal for full property closeout"
    ],
    proofPoints: [
      "Strong fit for overgrown zones and fence-line recovery",
      "Complete haul-away options available",
      "Local team with straightforward communication and scheduling"
    ],
    faqs: [
      {
        question: "Do you remove all debris after brush cleanup in Douglassville?",
        answer:
          "Yes. Off-site removal can be included so no brush or debris is left behind."
      },
      {
        question: "Can you quote overgrowth projects remotely?",
        answer:
          "In many cases yes, though denser or larger properties may require an in-person walkthrough for accurate pricing."
      }
    ],
    publishDate: "2026-03-02",
    updatedDate: "2026-03-02",
    featuredServiceSlugs: ["brush-cleanup", "off-site-removal", "leaf-cleanup", "spring-cleanup"]
  }
];

export const areaMap = Object.fromEntries(areas.map((area) => [area.slug, area]));

export const areaSlugs = areas.map((area) => area.slug);
