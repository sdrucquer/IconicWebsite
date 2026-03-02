import type { Service } from "@/data/services";

type ServiceSlug = Service["slug"];

export type ServiceFAQ = {
  question: string;
  answer: string;
};

export type ServiceDetails = {
  heroImage: string;
  gallery: string[];
  idealFor: string[];
  expectations: string[];
  faqs: ServiceFAQ[];
  heroTitle?: string;
  heroSubtitle?: string;
  topSectionTitle?: string;
  topSectionSubtitle?: string;
  topCardLabel?: string;
  ctaTitle?: string;
  ctaCopy?: string;
  ctaButtonLabel?: string;
};

export const serviceDetails: Record<ServiceSlug, ServiceDetails> = {
  "bed-cleanup": {
    heroImage: "/photos/property-finish.jpg",
    gallery: ["/photos/property-finish.jpg", "/photos/leaf-cleanup-before.jpg", "/photos/leaf-cleanup-after.jpg"],
    heroTitle: "Professional Bed Cleanup in Pottstown and Surrounding Areas",
    heroSubtitle: "Transform your garden with expert bed cleanup services from Iconic Landscaping.",
    topSectionTitle: "Why Choose Our Bed Cleanup Service",
    topSectionSubtitle: "Focused, detail-first cleanup that improves curb appeal and sets your beds up for the season.",
    topCardLabel: "Benefit",
    idealFor: [
      "Beds that are overrun with debris, weeds, or old growth.",
      "Homeowners preparing for mulch, planting, or a spring reset.",
      "Properties that need immediate curb-appeal improvement."
    ],
    expectations: [
      "Enhanced Garden Appearance: We restore the visual appeal of your planting beds so your landscape looks clean, intentional, and inviting.",
      "Promotes Plant Health: Debris and overgrowth removal reduces pest pressure and disease risk, helping plants thrive.",
      "Prepares for Seasonal Changes: A thorough cleanup creates better growing conditions for upcoming seasons.",
      "Eco-Friendly Methods: We use responsible cleanup practices to keep your property and local environment protected."
    ],
    faqs: [
      {
        question: "How does Iconic Landscaping approach bed cleanup in the community?",
        answer:
          "We start with a detailed walkthrough, then complete debris removal, targeted pruning, and bed reset work. We finish with a final review to confirm scope and quality."
      },
      {
        question: "How often should I schedule bed cleanup services?",
        answer:
          "Most properties benefit from seasonal cleanups. Frequency depends on plant density, debris volume, and how quickly beds overgrow."
      },
      {
        question: "Will your team help with plant pruning during cleanup?",
        answer:
          "Yes. We include careful pruning of overgrown or damaged plant material when it supports bed health and appearance."
      },
      {
        question: "Is bed cleanup suitable for all types of gardens?",
        answer:
          "Yes. We tailor cleanup scope to your specific bed layout, plant types, and property goals."
      }
    ],
    ctaTitle: "Revitalize Your Garden Today",
    ctaCopy:
      "Contact Iconic Landscaping for expert bed cleanup services in Pottstown and nearby communities.",
    ctaButtonLabel: "Get an Estimate"
  },
  mulching: {
    heroImage: "/photos/property-finish.jpg",
    gallery: ["/photos/property-finish.jpg", "/photos/edging-trim.jpg", "/photos/team-crew.jpg"],
    idealFor: [
      "Beds with fading, thin, or uneven mulch coverage.",
      "Properties where weeds keep returning through old mulch.",
      "Homeowners wanting a clean, finished front-of-home look."
    ],
    expectations: [
      "Material planning and delivery coordination.",
      "Even mulch depth and clean transitions.",
      "Site cleanup so walkways and drives are left tidy."
    ],
    faqs: [
      {
        question: "How often should mulch be refreshed?",
        answer: "Most homes benefit from annual refreshes, especially after winter weather and heavy rain."
      },
      {
        question: "Do you offer black mulch?",
        answer: "Yes. Black mulch is our most requested finish for strong curb appeal."
      },
      {
        question: "Can I combine mulch with edging?",
        answer: "Yes. Edging before mulch gives the cleanest and longest-lasting visual result."
      }
    ]
  },
  "leaf-cleanup": {
    heroImage: "/photos/leaf-cleanup-working.jpg",
    gallery: ["/photos/leaf-cleanup-before.jpg", "/photos/leaf-cleanup-working.jpg", "/photos/leaf-cleanup-after.jpg"],
    idealFor: [
      "Yards with heavy seasonal leaf buildup.",
      "Properties with wooded edges and hard-to-clear corners.",
      "Homeowners who want lawn health protected before spring."
    ],
    expectations: [
      "Systematic cleanup across lawn, beds, and edges.",
      "Bagging and removal based on project scope.",
      "Final pass to leave the property clean and navigable."
    ],
    faqs: [
      {
        question: "Do you service one-time fall cleanups?",
        answer: "Yes. We handle one-time projects as well as recurring seasonal cleanup visits."
      },
      {
        question: "Will leaf cleanup help my lawn?",
        answer: "Yes. Removing leaf mats reduces moisture buildup and helps turf breathe and recover."
      },
      {
        question: "Can leaves be hauled away?",
        answer: "Yes. We can include off-site removal so you are not left with piles or bags."
      }
    ]
  },
  "bush-trimming": {
    heroImage: "/photos/bush-trimming.jpg",
    gallery: ["/photos/bush-trimming.jpg", "/photos/property-finish.jpg", "/photos/edging-trim.jpg"],
    idealFor: [
      "Overgrown shrubs affecting property appearance.",
      "Bushes blocking windows, walkways, or lighting.",
      "Homeowners who want cleaner shapes without overcutting."
    ],
    expectations: [
      "Selective trimming for shape and structure.",
      "Dead growth removal where needed.",
      "Debris cleanup and removal after trimming."
    ],
    faqs: [
      {
        question: "How aggressive is your trimming approach?",
        answer: "We focus on structure and health first, then refine for curb appeal. We avoid harsh overcutting."
      },
      {
        question: "Can you trim multiple shrub types?",
        answer: "Yes. We routinely trim mixed landscapes with different shrub species and growth patterns."
      },
      {
        question: "Do you haul away clippings?",
        answer: "Yes. Trimming service includes cleanup so the space is finished when we leave."
      }
    ]
  },
  "brush-cleanup": {
    heroImage: "/photos/brush-cleanup.jpg",
    gallery: ["/photos/brush-cleanup.jpg", "/photos/brush-cleanup-during.jpg", "/photos/property-finish.jpg"],
    idealFor: [
      "Areas with invasive growth and unmanaged brush.",
      "Fence lines and edges overtaken by vines.",
      "Properties being prepared for restoration work."
    ],
    expectations: [
      "Dense overgrowth clearing and cutback.",
      "Removal and haul-away of cleared material.",
      "Reset of previously unusable or hidden areas."
    ],
    faqs: [
      {
        question: "How do you price brush cleanup?",
        answer: "Pricing depends on density, access, and haul-away volume. We provide clear scope before start."
      },
      {
        question: "Can you clear overgrown fence lines?",
        answer: "Yes. Fence lines are one of the most common brush cleanup requests we receive."
      },
      {
        question: "Do you remove everything off-site?",
        answer: "Yes. We can fully remove brush and debris from the property when requested."
      }
    ]
  },
  edging: {
    heroImage: "/photos/edging-trim.jpg",
    gallery: ["/photos/edging-trim.jpg", "/photos/property-finish.jpg", "/photos/team-crew.jpg"],
    idealFor: [
      "Homes needing cleaner visual separation of beds and lawn.",
      "Properties where existing bed lines have softened.",
      "Homeowners pairing edging with mulch refreshes."
    ],
    expectations: [
      "Defined bed and hardscape edges.",
      "Consistent line cleanup across visible areas.",
      "Tidy final finish that improves overall curb appeal."
    ],
    faqs: [
      {
        question: "Should edging be done before mulch?",
        answer: "Yes. Edging first gives a cleaner border and helps mulch look intentional."
      },
      {
        question: "Does edging make a noticeable difference?",
        answer: "Yes. It is one of the fastest ways to sharpen a property’s appearance."
      },
      {
        question: "Can edging be done as a standalone service?",
        answer: "Yes, but many clients combine it with bed cleanup or mulching for best results."
      }
    ]
  },
  weeding: {
    heroImage: "/photos/property-finish.jpg",
    gallery: ["/photos/property-finish.jpg", "/photos/leaf-cleanup-before.jpg", "/photos/leaf-cleanup-after.jpg"],
    idealFor: [
      "Beds with recurring weed pressure.",
      "Properties where ornamentals are being crowded out.",
      "Homeowners trying to keep beds manageable all season."
    ],
    expectations: [
      "Hands-on removal focused on bed quality.",
      "Targeted cleanup around existing plantings.",
      "Debris removal and visual reset of bed areas."
    ],
    faqs: [
      {
        question: "Do you pull weeds by hand?",
        answer: "Yes. We prioritize manual removal in active beds, including roots when conditions allow."
      },
      {
        question: "Can weeding be scheduled regularly?",
        answer: "Yes. Recurring service is available for properties that need ongoing upkeep."
      },
      {
        question: "Is weeding included in spring cleanups?",
        answer: "It can be. Many spring projects include bed weeding as part of full reset work."
      }
    ]
  },
  planting: {
    heroImage: "/photos/property-finish.jpg",
    gallery: ["/photos/property-finish.jpg", "/photos/team-crew.jpg", "/photos/edging-trim.jpg"],
    idealFor: [
      "Homeowners refreshing curb appeal with new color and structure.",
      "Beds that need seasonal updates.",
      "Properties where plant spacing and layout need improvement."
    ],
    expectations: [
      "Practical placement and spacing recommendations.",
      "Clean install with watering at set-in.",
      "Post-install cleanup for a finished look."
    ],
    faqs: [
      {
        question: "Can you help pick plant types?",
        answer: "Yes. We help with placement and practical plant choices based on sun and layout."
      },
      {
        question: "Do you install both shrubs and seasonal color?",
        answer: "Yes. We install annuals, shrubs, and other accent plantings."
      },
      {
        question: "Can planting be bundled with bed cleanup?",
        answer: "Yes. Bed prep and planting is a common combo for faster transformation."
      }
    ]
  },
  "off-site-removal": {
    heroImage: "/photos/brush-cleanup-during.jpg",
    gallery: ["/photos/brush-cleanup-during.jpg", "/photos/leaf-cleanup-after.jpg", "/photos/brush-cleanup.jpg"],
    idealFor: [
      "Cleanup projects producing heavy debris volume.",
      "Properties where curb piles are not desired.",
      "Homeowners wanting fully finished job closeout."
    ],
    expectations: [
      "Debris loading from active work zones.",
      "Responsible transport and disposal.",
      "Final sweep to leave the site clean."
    ],
    faqs: [
      {
        question: "What material can be removed?",
        answer: "Leaves, brush, organic cleanup debris, and related landscaping waste from active projects."
      },
      {
        question: "Do you remove material from prior jobs?",
        answer: "Yes, depending on scope and access. We can review this during your quote."
      },
      {
        question: "Can this be added to any service?",
        answer: "Yes. Off-site removal can be bundled with most cleanup and reset services."
      }
    ]
  },
  "spring-cleanup": {
    heroImage: "/photos/mowing.jpg",
    gallery: ["/photos/mowing.jpg", "/photos/leaf-cleanup-after.jpg", "/photos/property-finish.jpg"],
    idealFor: [
      "Properties coming out of winter with debris and overgrowth.",
      "Homeowners preparing for regular seasonal maintenance.",
      "Yards needing a full reset before active growth."
    ],
    expectations: [
      "Full-property spring reset plan.",
      "Cleanup, trimming, and detail pass by area.",
      "Site left clean and ready for the season."
    ],
    faqs: [
      {
        question: "When should spring cleanup be scheduled?",
        answer: "Early to mid-spring is ideal, before growth accelerates and beds become harder to reset."
      },
      {
        question: "Is spring cleanup a one-day service?",
        answer: "Most are completed quickly, but larger properties may require additional crew time."
      },
      {
        question: "Can spring cleanup include mulch?",
        answer: "Yes. Cleanup plus edging and mulch is a common package for strong spring curb appeal."
      }
    ]
  }
};
