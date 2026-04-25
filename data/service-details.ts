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
    heroImage: "/photos/services/bed-cleanup/hero.jpg",
    gallery: ["/photos/services/bed-cleanup/before.jpg", "/photos/services/bed-cleanup/during.jpg", "/photos/services/bed-cleanup/after.jpg"],
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
        question: "How long does bed cleanup take?",
        answer:
          "Most residential bed cleanup jobs take 1-4 hours. Larger or heavily overgrown properties take longer, and we quote accurately upfront so there are no surprises."
      },
      {
        question: "Will you haul everything away?",
        answer:
          "Yes. Off-site debris removal is available as an add-on, and it will be listed clearly on your quote."
      },
      {
        question: "How often should I get bed cleanup done?",
        answer:
          "Most clients schedule bed cleanup once or twice a season, usually spring and fall. Larger properties may benefit from a mid-summer visit too."
      }
    ],
    ctaTitle: "Revitalize Your Garden Today",
    ctaCopy:
      "Contact Iconic Landscaping for expert bed cleanup services in Pottstown and nearby communities.",
    ctaButtonLabel: "Get an Estimate"
  },
  mulching: {
    heroImage: "/photos/services/mulching/hero.jpg",
    gallery: ["/photos/services/mulching/before.jpg", "/photos/services/mulching/during.jpg", "/photos/services/mulching/after.jpg"],
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
        question: "Do you supply the mulch?",
        answer: "Yes. We handle ordering and delivery coordination so you do not need to source anything yourself."
      },
      {
        question: "How much mulch do I need?",
        answer: "We calculate mulch quantity during the quote process based on bed size and existing depth. There is no guesswork on your end."
      },
      {
        question: "Should I do bed cleanup before mulching?",
        answer: "Yes. We recommend cleaning beds first, then mulching in the same visit for a cleaner and longer-lasting result."
      }
    ]
  },
  "leaf-cleanup": {
    heroImage: "/photos/services/leaf-cleanup/hero.jpg",
    gallery: ["/photos/services/leaf-cleanup/before.jpg", "/photos/services/leaf-cleanup/during.jpg", "/photos/services/leaf-cleanup/after.jpg"],
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
        question: "Is leaf removal only available in fall?",
        answer: "No. Fall is peak season, but we offer leaf removal year-round when properties need it."
      },
      {
        question: "Where do the leaves go?",
        answer: "Leaves are hauled to Arborganic Acres in Pottstown, a commercial composting facility where they are naturally composted."
      },
      {
        question: "Is leaf removal part of fall cleanup?",
        answer: "Yes. Leaf removal is a core part of fall cleanup and can also be booked as a standalone service."
      }
    ]
  },
  "bush-trimming": {
    heroImage: "/photos/services/bush-trimming/hero.jpg",
    gallery: ["/photos/services/bush-trimming/before.jpg", "/photos/services/bush-trimming/during.jpg", "/photos/services/bush-trimming/after.jpg"],
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
        question: "Do you do tree trimming?",
        answer: "No. We specialize in shrubs and bushes only. We do not offer tree work of any kind."
      },
      {
        question: "How do I know if my bushes need trimming?",
        answer: "If they have grown past their natural shape, block windows or walkways, or have not been trimmed this season, it is probably time."
      },
      {
        question: "Do you haul away clippings?",
        answer: "Yes. Trimming service includes cleanup so the space is finished when we leave."
      }
    ]
  },
  "brush-cleanup": {
    heroImage: "/photos/services/brush-cleanup/hero.jpg",
    gallery: ["/photos/services/brush-cleanup/before.jpg", "/photos/services/brush-cleanup/during.jpg", "/photos/services/brush-cleanup/after.jpg"],
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
        question: "How overgrown is too overgrown?",
        answer: "We can handle large, heavily overgrown areas. The only limitation is trees, because we do not cut or remove trees of any size."
      },
      {
        question: "Do you haul away everything you clear?",
        answer: "Yes. Off-site removal to a composting facility is available as an add-on unless you prefer material left on site."
      },
      {
        question: "Can you create a walking path through a wooded area?",
        answer: "Yes. Path clearing and restoration is one of our specialties within brush cleanup."
      }
    ]
  },
  edging: {
    heroImage: "/photos/services/edging/hero.jpg",
    gallery: ["/photos/services/edging/before.jpg", "/photos/services/edging/during.jpg", "/photos/services/edging/after.jpg"],
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
        question: "Is edging included with other services?",
        answer: "Yes. Edging is included with spring cleanup and bed cleanup, and it can also be booked as a standalone service."
      },
      {
        question: "Why does edging make such a difference?",
        answer: "Clean edges give a property a finished, maintained look that makes everything else stand out. It is one of the fastest visual upgrades we offer."
      }
    ]
  },
  planting: {
    heroImage: "/photos/services/planting/hero.jpg",
    gallery: ["/photos/services/planting/before.jpg", "/photos/services/planting/during.jpg", "/photos/services/planting/after.jpg"],
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
        question: "Can I supply my own plants?",
        answer: "Yes. You can provide the plants and we will handle installation. We can also source plants if you prefer."
      },
      {
        question: "Do you install trees?",
        answer: "No. We specialize in flowers and smaller plants only. We do not install trees or saplings of any size."
      },
      {
        question: "Can you help with bed layout?",
        answer: "Yes. We can work with your vision or guide placement during the quote walkthrough so the finished bed looks intentional."
      }
    ]
  },
  "off-site-removal": {
    heroImage: "/photos/services/off-site-removal/hero.jpg",
    gallery: ["/photos/services/off-site-removal/before.jpg", "/photos/services/off-site-removal/during.jpg", "/photos/services/off-site-removal/after.jpg"],
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
        question: "Do I need to bag the debris myself?",
        answer: "No. We handle debris from the active job scope, so no prep is needed on your end."
      },
      {
        question: "Is off-site removal always included?",
        answer: "It is available as an add-on to any service. We note it clearly on your quote so you know exactly what is included."
      },
      {
        question: "Can this be added to any service?",
        answer: "Yes. Off-site removal can be bundled with most cleanup and reset services."
      }
    ]
  },
  "spring-cleanup": {
    heroImage: "/photos/services/spring-cleanup/hero.jpg",
    gallery: ["/photos/services/spring-cleanup/before.jpg", "/photos/services/spring-cleanup/during.jpg", "/photos/services/spring-cleanup/after.jpg"],
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
        question: "When should I book spring cleanup?",
        answer: "As early as February. Our spring schedule fills up fast, and early bookers get the best date options."
      },
      {
        question: "Do you haul away the debris?",
        answer: "Yes. Off-site removal is available as an add-on to any cleanup job."
      },
      {
        question: "Can spring cleanup include mulch?",
        answer: "Absolutely. It is one of our most popular combinations: we clean the beds first, then mulch in one crew visit."
      }
    ]
  }
};
