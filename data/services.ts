export type ServiceReview = {
  quote: string;
  author: string;
  location?: string;
};

export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  tagline: string;
  included: string[];
  notIncluded?: string[];
  whyItMatters: string[];
  whoNeedsIt: string;
  bestSeason: string;
  pricingGuidance: string;
  addOns: string[];
  related: string[];
  reviews: ServiceReview[];
  mulchTypes?: string[];
};

export const services: Service[] = [
  {
    slug: "spring-cleanup",
    name: "Spring Cleanup",
    shortDescription:
      "Clear winter debris, dead growth, and messy beds so your property is ready for spring and summer.",
    tagline: "Get your property ready for the season with one clean, organized reset.",
    included: [
      "Removal of dead plant material, leaves, and winter debris from beds",
      "Bed edging to redefine clean borders",
      "Final walkthrough before the crew leaves",
      "Off-site debris removal available as an add-on"
    ],
    notIncluded: ["Planting", "Sod work", "Mowing"],
    whyItMatters: [
      "Winter leaves behind matted leaves, dead growth, and tired bed edges. A spring cleanup resets the property before growth accelerates.",
      "Homeowners often combine spring cleanup with mulching, edging, and bush trimming so the property is handled in one efficient visit."
    ],
    whoNeedsIt:
      "Homeowners who want their property looking sharp after winter, especially people listing homes, HOA neighborhoods, and annual seasonal clients.",
    bestSeason: "March through April. Spring books fast, so early scheduling matters.",
    pricingGuidance:
      "Contact us for a free quote. Pricing depends on property size, debris volume, bed count, and add-on services.",
    addOns: ["Mulching", "Edging", "Bush Trimming", "Off-Site Debris Removal"],
    related: ["bed-cleanup", "mulching", "leaf-cleanup"],
    reviews: [
      {
        quote:
          "Iconic did a wonderful job with our spring clean up and mulching. They were professional, dependable and hardworking.",
        author: "Zoe Baker",
        location: "Pottstown"
      },
      {
        quote: "Everyone was professional, hard working, and great with communication. I will definitely use again!",
        author: "Jody March"
      },
      {
        quote: "They worked during a torrential downpour and still managed to do an excellent job.",
        author: "Lisa Hickey"
      }
    ]
  },
  {
    slug: "bed-cleanup",
    name: "Bed Cleanup",
    shortDescription: "Weed removal, debris removal, and clean bed edges for flower beds that look sharp again.",
    tagline: "Overgrown beds, messy edges, and weeds taking over? We handle the reset.",
    included: [
      "Weed removal and clearing of unwanted growth",
      "Clean edging along all bed borders",
      "Debris removal from beds",
      "Final walkthrough before the crew leaves"
    ],
    whyItMatters: [
      "Most yards look messy because the beds are neglected, not because the entire property is in bad shape. A proper bed cleanup quickly improves curb appeal.",
      "When bed cleanup is paired with mulch, clients usually need far less weeding throughout the season."
    ],
    whoNeedsIt:
      "Homeowners with established beds that need seasonal maintenance or a reset, especially mid-season when beds get ahead of people.",
    bestSeason: "Spring and fall, with availability throughout the active season.",
    pricingGuidance:
      "Contact us for a free quote. Pricing depends on buildup, bed complexity, property size, and whether it is bundled with other services.",
    addOns: ["Mulching", "Edging", "Off-Site Debris Removal", "Bush Trimming"],
    related: ["mulching", "edging", "spring-cleanup"],
    reviews: [
      {
        quote:
          "I needed clearing out of weeds and new mulch. The guys were friendly, professional and did a really nice job.",
        author: "Kathy J. Schaffer",
        location: "Pottstown"
      },
      {
        quote: "Iconic was prompt in communicating through texts and emails. Group followed instructions, worked carefully, and cleaned up well.",
        author: "Jean Herbranson"
      },
      {
        quote:
          "They were communicative, hardworking, and great. You can tell they care about what they're doing and that they are doing work that they are proud of.",
        author: "Amanda Yoder",
        location: "Spring City"
      }
    ]
  },
  {
    slug: "mulching",
    name: "Mulching",
    shortDescription:
      "Fresh mulch installed to the right depth for cleaner beds, better moisture retention, and instant curb appeal.",
    tagline: "Our most popular service because the before and after is immediate.",
    included: [
      "Bulk mulch delivery coordinated with the client",
      "Existing mulch depth checked before ordering",
      "Installation to a clean, proper finished depth",
      "Clean edges around all mulched areas",
      "Debris cleared before install"
    ],
    notIncluded: ["Grading", "Drainage work"],
    whyItMatters: [
      "Fresh mulch protects beds, retains moisture, suppresses weeds, and gives the property a finished look.",
      "We measure existing mulch first and only add what is needed, so clients are not overcharged for unnecessary material."
    ],
    whoNeedsIt: "Any homeowner with garden beds, especially after cleanup in spring or before winter protection in fall.",
    bestSeason: "March through May and September through October.",
    pricingGuidance:
      "Contact us for a free quote. Smaller jobs start around $250. Larger jobs with 3+ yards often run about $130-$140 per yard for materials and labor combined. Most bundled cleanup and mulch jobs are $500+.",
    addOns: ["Bed Cleanup", "Edging", "Off-Site Debris Removal"],
    related: ["bed-cleanup", "edging", "planting"],
    reviews: [
      {
        quote:
          "I reached out to Iconic Landscaping to clean and mulch my flowerbeds. I was very impressed with response times, scheduling and updates.",
        author: "Wendy Hanna",
        location: "Royersford"
      },
      {
        quote:
          "They are very professional and communication was great. They did an awesome job creating a new flower bed and mulching all existing beds.",
        author: "Karen Michaels",
        location: "Chester Springs"
      },
      {
        quote:
          "My yard looks great. They cleared away 12 bags of debris, edged, trimmed and mulched. They were professional, respectful and worked really hard.",
        author: "Denise Schmidt",
        location: "Pottstown"
      }
    ],
    mulchTypes: [
      "Black dyed mulch",
      "Brown dyed mulch",
      "Red dyed mulch",
      "Double shredded hardwood mulch",
      "Triple shredded hardwood mulch",
      "Premium hardwood mulch",
      "Natural hardwood mulch",
      "Pine bark mulch",
      "Mini pine bark nuggets",
      "Large pine bark nuggets",
      "Hemlock bark mulch",
      "Hardwood bark mulch",
      "Cedar mulch",
      "Cedar chips",
      "Wood chips",
      "Playground mulch",
      "Leaf compost",
      "Leaf mulch",
      "Mushroom compost",
      "Compost blends",
      "Garden soil and compost mix",
      "Pine straw",
      "Straw mulch"
    ]
  },
  {
    slug: "edging",
    name: "Edging",
    shortDescription: "Crisp bed, walkway, and driveway lines that make the whole property look intentional.",
    tagline: "Sharp edges separate a yard that looks okay from one that looks finished.",
    included: [
      "Precision edging along bed borders, walkways, and driveways",
      "Cleanup of edging debris",
      "Clean visual definition before mulch or after cleanup"
    ],
    whyItMatters: [
      "Clean edges create definition between beds, turf, and hardscaping. It is one of the fastest visual upgrades on a property.",
      "Edging is included with spring cleanup and bed cleanup, and it can be booked as a standalone service when a property needs a polished finish."
    ],
    whoNeedsIt: "Homeowners who want a polished look, usually as part of cleanup or mulching.",
    bestSeason: "Spring through fall.",
    pricingGuidance:
      "Contact us for a free quote. Edging is included with spring cleanup and bed cleanup. Standalone pricing depends on linear footage and property size.",
    addOns: ["Bed Cleanup", "Mulching", "Spring Cleanup"],
    related: ["mulching", "bed-cleanup", "spring-cleanup"],
    reviews: [
      {
        quote:
          "My yard looks great. They cleared away 12 bags of debris, edged, trimmed and mulched. They were professional, respectful and worked really hard.",
        author: "Denise Schmidt",
        location: "Pottstown"
      },
      {
        quote: "Guys did an excellent job of edging and mulching. Clean, polite and hard working students! Recommend!",
        author: "D.",
        location: "Google Review"
      }
    ]
  },
  {
    slug: "bush-trimming",
    name: "Bush Trimming",
    shortDescription: "Shrub and bush shaping that cleans up overgrowth without getting into tree work.",
    tagline: "Overgrown shrubs can make an otherwise clean property look neglected.",
    included: [
      "Trimming and shaping of shrubs and bushes",
      "Cleanup and removal of all trimmings",
      "Intentional form around windows, walkways, and beds"
    ],
    notIncluded: ["Tree trimming", "Tree removal", "Climbing", "Tree work of any kind"],
    whyItMatters: [
      "Overgrown bushes block windows, walkways, and sightlines. A good trim makes the landscape look maintained again.",
      "We specialize in shrubs and bushes only, which keeps the scope clear and prevents confusion with tree work."
    ],
    whoNeedsIt: "Homeowners with established shrubs that need seasonal shaping, especially in late spring and summer.",
    bestSeason: "Late spring and summer.",
    pricingGuidance:
      "Contact us for a free quote. Pricing depends on the number of bushes, size, and complexity of the trim.",
    addOns: ["Bed Cleanup", "Off-Site Debris Removal"],
    related: ["spring-cleanup", "bed-cleanup", "off-site-removal"],
    reviews: [
      {
        quote: "Boys did a wonderful job trimming very tall bushes in front of my home. Thank you very much.",
        author: "Jennifer Jeschke"
      },
      {
        quote:
          "These guys were on point! They arrived early, had everything they needed, asked questions about what exactly we wanted and made our lives 100 times easier.",
        author: "Philip Brady",
        location: "Chester Springs"
      }
    ]
  },
  {
    slug: "off-site-removal",
    name: "Off-Site Debris Removal",
    shortDescription: "Job debris hauled away and composted so no piles are left behind.",
    tagline: "We haul it away so you do not have to.",
    included: [
      "Full removal of job debris from the property",
      "Transport to proper disposal or composting facility",
      "No piles left on the lawn, walkway, or driveway"
    ],
    whyItMatters: [
      "Cleanup is not complete until the debris is gone. Off-site removal creates a cleaner finish and saves the client a dump run.",
      "Organic debris is hauled to local partners like Arborganic Acres where it is naturally composted instead of going to a landfill."
    ],
    whoNeedsIt: "Clients who want a fully clean finish after spring cleanup, bed cleanup, trimming, brush cleanup, or leaf removal.",
    bestSeason: "Available all season.",
    pricingGuidance: "Contact us for a free quote. Pricing depends on debris volume and load size.",
    addOns: ["Spring Cleanup", "Bed Cleanup", "Bush Trimming", "Leaf Removal", "Brush Cleanup"],
    related: ["brush-cleanup", "leaf-cleanup", "spring-cleanup"],
    reviews: [
      {
        quote: "My yard looks great. They cleared away 12 bags of debris, edged, trimmed and mulched.",
        author: "Denise Schmidt",
        location: "Pottstown"
      },
      {
        quote: "They cleared a TON of leaves around my property and somehow managed to do it on a cold and windy day.",
        author: "Susan Westington",
        location: "Collegeville"
      }
    ]
  },
  {
    slug: "planting",
    name: "Planting",
    shortDescription: "Flower and small-plant installation for existing beds, new beds, and tired-looking areas.",
    tagline: "Add color and structure without guessing where everything should go.",
    included: [
      "Installation of flowers and smaller plants",
      "Full bed installations and single plant installs",
      "Client-supplied plants installed with care",
      "Iconic-sourced plants available upon request",
      "Final walkthrough before the crew leaves"
    ],
    notIncluded: ["Large tree installation", "Sapling installation", "Trees of any size"],
    whyItMatters: [
      "Planting brings color, depth, and personality to a property, especially after beds have been cleaned and edged.",
      "We can work with client-supplied plants or source plants for the project, then guide placement during the quote walkthrough."
    ],
    whoNeedsIt: "Homeowners adding flowers or smaller plants to existing beds, starting a new bed, or refreshing a tired area.",
    bestSeason: "Spring and early summer for best establishment.",
    pricingGuidance:
      "Contact us for a free quote. Pricing depends on number of plants, bed size, and whether sourcing is required.",
    addOns: ["Bed Cleanup", "Mulching", "Edging"],
    related: ["mulching", "bed-cleanup", "edging"],
    reviews: [
      {
        quote:
          "They are very professional and communication was great. They did an awesome job creating a new flower bed and mulching all existing beds.",
        author: "Karen Michaels",
        location: "Chester Springs"
      },
      {
        quote:
          "Courteous, hard-working students who know and respect my property. They tackle a variety of yard work tasks from weeding and cultivating flower beds to leaf removal and more.",
        author: "Andrew Lohan"
      }
    ]
  },
  {
    slug: "brush-cleanup",
    name: "Brush Cleanup",
    shortDescription: "Dense brush, bramble, and overgrowth cleared from wooded edges and neglected areas.",
    tagline: "One of our most dramatic before-and-after services.",
    included: [
      "Clearing of overgrown brush, bramble, and dense undergrowth",
      "Path creation and restoration",
      "Removal of debris from cleared areas",
      "Off-site debris removal available as an add-on"
    ],
    notIncluded: ["Tree removal", "Tree cutting", "Tree work of any kind"],
    whyItMatters: [
      "Brush can take over property edges, wooded zones, and fence lines until the space becomes unusable.",
      "We clear undergrowth and brush, reveal clean sightlines, and can haul everything away for a complete reset."
    ],
    whoNeedsIt:
      "Homeowners with overgrown property edges, wooded sections, neglected areas, or properties being prepared for sale or renovation.",
    bestSeason: "Spring through fall.",
    pricingGuidance:
      "Contact us for a free quote. Brush cleanup is priced by scope and usually assessed in person before quoting.",
    addOns: ["Off-Site Debris Removal", "Bed Cleanup"],
    related: ["off-site-removal", "bed-cleanup", "bush-trimming"],
    reviews: [
      {
        quote:
          "Their communication via text was prompt, and when they needed an additional day the estimate remained unchanged. They do not simply complete a job and move on, but ensure every detail is addressed.",
        author: "Chris Saitta",
        location: "Glenmoore"
      }
    ]
  },
  {
    slug: "leaf-cleanup",
    name: "Leaf Removal",
    shortDescription:
      "Leaf removal from lawns, beds, and property edges with off-site composting instead of landfill disposal.",
    tagline: "We handle leaf removal all season long, not just in fall.",
    included: [
      "Full leaf removal from lawn, beds, and property edges",
      "Bagging and off-site haul to composting facility",
      "Available standalone or as part of fall cleanup"
    ],
    whyItMatters: [
      "Heavy leaf buildup traps moisture, blocks light, and can stress turf if it sits too long.",
      "Leaves are hauled to Arborganic Acres in Pottstown where they are naturally composted. Nothing goes to a landfill."
    ],
    whoNeedsIt:
      "Homeowners who do not want to spend their weekend raking, especially before winter or on wooded properties with heavy leaf volume.",
    bestSeason: "Peak demand is October through November, with availability all season.",
    pricingGuidance: "Contact us for a free quote. Pricing depends on property size and leaf volume.",
    addOns: ["Fall Cleanup", "Off-Site Debris Removal", "Bush Trimming"],
    related: ["off-site-removal", "spring-cleanup", "bed-cleanup"],
    reviews: [
      {
        quote:
          "They cleared a TON of leaves around my property and somehow managed to do it on a cold and windy day. They are a hard working crew that I would not hesitate to hire again.",
        author: "Susan Westington",
        location: "Collegeville"
      },
      {
        quote:
          "We just recently had fall cleanup done by Iconic Cleanup Landscaping. They kept me well informed the entire time. They do a great job.",
        author: "Susan Smith"
      },
      {
        quote:
          "Courteous, hard-working students who know and respect my property. They tackle a variety of yard work tasks from weeding and cultivating flower beds to leaf removal and more.",
        author: "Andrew Lohan"
      }
    ]
  }
];

export const serviceMap = Object.fromEntries(services.map((service) => [service.slug, service]));

export const serviceAreasPrimary = [
  "Pottstown",
  "Chester Springs",
  "Royersford",
  "Douglassville",
  "Spring City"
];

export const serviceAreasSecondary = [
  "Phoenixville",
  "Collegeville",
  "Glenmoore",
  "Birdsboro"
];

export const proofBackedServiceAreas = [
  ...serviceAreasPrimary,
  ...serviceAreasSecondary
];

export const allServiceAreas = proofBackedServiceAreas;
