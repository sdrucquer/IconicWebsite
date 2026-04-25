import { services } from "@/data/services";

export type AreaFAQ = {
  question: string;
  answer: string;
};

export type AreaReview = {
  quote: string;
  author: string;
};

export type Area = {
  slug: string;
  name: string;
  region: string;
  county: string;
  tier: "primary" | "secondary";
  heroTitle: string;
  summary: string;
  whyCustomersHireUs: string;
  serviceHighlights: string[];
  proofPoints: string[];
  propertyTypes: string;
  seasonalNeeds: string;
  landmarks: string[];
  reviews: AreaReview[];
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
    county: "Montgomery County",
    tier: "primary",
    heroTitle: "Landscaping Services in Pottstown, PA",
    summary:
      "Iconic Landscaping is based in Pottstown, with our highest job volume and full service menu available locally.",
    whyCustomersHireUs:
      "We know these neighborhoods, work here every week, and built our reputation through local Facebook groups, word of mouth, and repeat clients. Pottstown homeowners trust us because their neighbors do too.",
    serviceHighlights: ["Spring Cleanup", "Bed Cleanup", "Mulching", "Planting", "Edging", "Bush Trimming", "Brush Cleanup", "Leaf Removal", "Off-Site Debris Removal"],
    proofPoints: [
      "Home base with fastest route coverage",
      "All quote requests receive a response within 24 hours",
      "Start and final walkthrough standards on every job"
    ],
    propertyTypes:
      "Established residential homes, older properties with mature landscaping, larger lots, HOA neighborhoods, and commercial properties.",
    seasonalNeeds:
      "Spring cleanup after winter, mulch refreshes in spring and fall, leaf removal before winter, and curb appeal work for homes going on the market.",
    landmarks: ["Owen J. Roberts school district area", "Sanatoga", "North End", "South End"],
    reviews: [
      {
        quote:
          "Iconic did a wonderful job with our spring clean up and mulching. They were professional, dependable and hardworking.",
        author: "Zoe Baker"
      },
      {
        quote: "I needed clearing out of weeds and new mulch. The guys were friendly, professional and did a really nice job.",
        author: "Kathy J. Schaffer"
      },
      {
        quote:
          "Absolutely phenomenal work and customer service that is second to none. They pay attention to even the smallest details and communication is always prompt.",
        author: "Bethany Martin"
      }
    ],
    faqs: [
      {
        question: "Do you serve all parts of Pottstown?",
        answer: "Yes. Pottstown is our home base, and we serve neighborhoods throughout the borough and surrounding areas."
      },
      {
        question: "How quickly can you schedule a job in Pottstown?",
        answer:
          "We respond to quote requests within 24 hours. Many customers schedule within about three days, and some jobs can be scheduled as quickly as 24 hours depending on scope and season."
      }
    ],
    publishDate: "2026-03-02",
    updatedDate: "2026-04-25",
    featuredServiceSlugs: [
      "spring-cleanup",
      "bed-cleanup",
      "mulching",
      "planting",
      "edging",
      "bush-trimming",
      "brush-cleanup",
      "leaf-cleanup",
      "off-site-removal"
    ]
  },
  {
    slug: "chester-springs",
    name: "Chester Springs",
    region: "PA",
    county: "Chester County",
    tier: "primary",
    heroTitle: "Landscaping Services in Chester Springs, PA",
    summary:
      "Premium landscaping for larger Chester Springs properties with high curb appeal standards and annual repeat clients.",
    whyCustomersHireUs:
      "Chester Springs homeowners tend to have larger properties and high standards. We show up prepared, communicate every step of the way, and deliver results that hold up season after season.",
    serviceHighlights: ["Spring Cleanup", "Bed Cleanup", "Mulching", "Planting", "Bush Trimming", "Leaf Removal"],
    proofPoints: [
      "Strong client base in a premium residential market",
      "Larger property scopes quoted with care",
      "Cleanup and mulching often completed in one organized visit"
    ],
    propertyTypes: "Larger residential lots, well-maintained properties, wooded acreage, and Upper Uwchlan Township homes.",
    seasonalNeeds: "Spring bed prep and mulching, mid-season bush trimming, and fall leaf removal on larger wooded lots.",
    landmarks: ["Upper Uwchlan Township", "Ludwig's Corner", "Exton area"],
    reviews: [
      {
        quote:
          "Crew did a fantastic job - arrived on time, got the work done, and even asked us to review their work before they left.",
        author: "Allen Cleaver"
      },
      {
        quote:
          "Highly recommend Iconic Cleanup Landscaping. They are very professional and communication was great.",
        author: "Karen Michaels"
      },
      {
        quote:
          "These guys were on point! They arrived early, had everything they needed, asked questions about what exactly we wanted and made our lives 100 times easier.",
        author: "Philip Brady"
      }
    ],
    faqs: [
      {
        question: "Do you work on larger properties in Chester Springs?",
        answer:
          "Yes. We regularly service larger lots in Chester Springs and Upper Uwchlan, and larger jobs are quoted carefully so the scope is clear."
      },
      {
        question: "Can you handle cleanup and mulching in one visit?",
        answer:
          "Yes. Many Chester Springs projects combine bed cleanup and mulching in one crew visit for better results and less disruption."
      }
    ],
    publishDate: "2026-03-02",
    updatedDate: "2026-04-25",
    featuredServiceSlugs: ["spring-cleanup", "bed-cleanup", "mulching", "planting", "bush-trimming", "leaf-cleanup"]
  },
  {
    slug: "royersford",
    name: "Royersford",
    region: "PA",
    county: "Montgomery County",
    tier: "primary",
    heroTitle: "Landscaping Services in Royersford, PA",
    summary:
      "Reliable cleanup, mulching, and edging for Royersford homeowners who value quick communication and respectful crews.",
    whyCustomersHireUs:
      "Royersford clients often find us through Facebook or a neighbor's recommendation, then come back because we do what we say we will do.",
    serviceHighlights: ["Spring Cleanup", "Bed Cleanup", "Mulching", "Edging", "Leaf Removal"],
    proofPoints: [
      "Active repeat-client market",
      "Strong word-of-mouth growth",
      "Detailed quotes and updates from scheduling through completion"
    ],
    propertyTypes: "Suburban residential properties, with a mix of established and newer homes in the Spring-Ford area.",
    seasonalNeeds: "Spring cleanup and mulching in March and April, edging through the season, and fall leaf removal.",
    landmarks: ["Spring-Ford school district", "Limerick Township nearby"],
    reviews: [
      {
        quote:
          "I was very impressed with response times, scheduling and updates. The crew was polite, respectful and went above and beyond my expectations.",
        author: "Wendy Hanna"
      },
      {
        quote: "The entire crew was quick, professional and they did an amazing job with my landscaping.",
        author: "Bridget Palazzolo"
      }
    ],
    faqs: [
      {
        question: "Do you offer free quotes in Royersford?",
        answer: "Yes. We review your scope and send a detailed quote within 24 hours. There is no commitment required."
      },
      {
        question: "When should I book spring landscaping in Royersford?",
        answer: "As early as February. Spring slots fill quickly, and early bookers get the best date options."
      }
    ],
    publishDate: "2026-03-02",
    updatedDate: "2026-04-25",
    featuredServiceSlugs: ["spring-cleanup", "bed-cleanup", "mulching", "edging", "leaf-cleanup"]
  },
  {
    slug: "douglassville",
    name: "Douglassville",
    region: "PA",
    county: "Berks County",
    tier: "primary",
    heroTitle: "Landscaping Services in Douglassville, PA",
    summary:
      "Professional, easy-to-schedule landscaping for Douglassville homeowners along the Route 422 corridor.",
    whyCustomersHireUs:
      "Douglassville homeowners hire Iconic because they want a crew that is professional, on time, and easy to work with from quote to closeout.",
    serviceHighlights: ["Spring Cleanup", "Bed Cleanup", "Mulching", "Leaf Removal"],
    proofPoints: [
      "Consistent job volume in a further-out but valuable market",
      "Convenient quote process and concise communication",
      "Strong fit for cleanup and mulching scopes"
    ],
    propertyTypes: "Residential homes in the Amity Township area and along the Route 422 corridor.",
    seasonalNeeds: "Spring cleanup and mulching, plus fall leaf removal.",
    landmarks: ["Amity Township", "Route 422 corridor"],
    reviews: [
      {
        quote:
          "Great experience from start to finish! Quote process was easy and communication was convenient and concise the whole way.",
        author: "Matt Umstead"
      }
    ],
    faqs: [
      {
        question: "Do you serve Douglassville for all job sizes?",
        answer:
          "We serve Douglassville for most residential landscaping jobs. Send us the scope and we will confirm availability."
      },
      {
        question: "How does the Douglassville quote process work?",
        answer:
          "We review the property, confirm scope, and send a detailed quote within 24 hours. There is no pressure or commitment until you approve."
      }
    ],
    publishDate: "2026-03-02",
    updatedDate: "2026-04-25",
    featuredServiceSlugs: ["spring-cleanup", "bed-cleanup", "mulching", "leaf-cleanup"]
  },
  {
    slug: "spring-city",
    name: "Spring City",
    region: "PA",
    county: "Chester County",
    tier: "primary",
    heroTitle: "Landscaping Services in Spring City, PA",
    summary:
      "Core-service-zone landscaping for Spring City homeowners who want a crew that shows up and takes pride in the work.",
    whyCustomersHireUs:
      "Spring City is part of our core service zone. We have worked here since the beginning and built lasting relationships with homeowners across the area.",
    serviceHighlights: ["Spring Cleanup", "Bed Cleanup", "Mulching", "Leaf Removal"],
    proofPoints: [
      "Close to our Pottstown home base",
      "Part of the OJR-area reputation that helped Iconic grow",
      "Strong repeat-client fit for cleanup and mulching"
    ],
    propertyTypes: "Residential homes in Spring City Borough and nearby established neighborhoods.",
    seasonalNeeds: "Spring bed cleanup and mulching, plus fall leaf removal.",
    landmarks: ["Spring City Borough", "Adjacent to Royersford", "Chester County border area"],
    reviews: [
      {
        quote:
          "They were communicative, hardworking, and great. You can tell they care about what they're doing and that they are doing work that they are proud of.",
        author: "Amanda Yoder"
      },
      {
        quote:
          "These gentlemen are some of the best people I know. They go the extra mile, they are meticulous and work well together.",
        author: "Maryjane Piede"
      }
    ],
    faqs: [
      {
        question: "Do you serve Spring City year-round?",
        answer: "We are active March through November. Contact us in late winter to get on the spring schedule before spots fill."
      },
      {
        question: "Can I bundle services in one Spring City visit?",
        answer:
          "Yes. Most clients combine bed cleanup and mulching in a single visit because it is more efficient and creates a better finished result."
      }
    ],
    publishDate: "2026-03-02",
    updatedDate: "2026-04-25",
    featuredServiceSlugs: ["spring-cleanup", "bed-cleanup", "mulching", "leaf-cleanup"]
  },
  {
    slug: "phoenixville",
    name: "Phoenixville",
    region: "PA",
    county: "Chester County",
    tier: "secondary",
    heroTitle: "Landscaping Services in Phoenixville, PA",
    summary:
      "Responsive landscaping for larger Phoenixville jobs, with the same communication standards Iconic is known for.",
    whyCustomersHireUs:
      "Phoenixville clients choose Iconic when they want a professional crew that responds quickly and gets the job done right. We prioritize larger residential scopes in this area.",
    serviceHighlights: ["Bed Cleanup", "Mulching", "Spring Cleanup", "Bush Trimming"],
    proofPoints: [
      "Secondary market prioritized for larger residential jobs",
      "Efficient debris routing with Phoenixville compost drop-off nearby",
      "Friendly, polite crews with strong customer feedback"
    ],
    propertyTypes: "Residential homes in Phoenixville Borough and surrounding neighborhoods.",
    seasonalNeeds: "Spring cleanup and mulching, plus mid-season bush trimming.",
    landmarks: ["Borough of Phoenixville", "Schuylkill River Trail area"],
    reviews: [
      {
        quote: "The team did a fabulous job! Friendly, polite, very hard workers. I'm completely satisfied.",
        author: "Robin Adamson-Wanner"
      },
      {
        quote: "The entire crew was quick, professional and did an amazing job.",
        author: "Bridget Palazzolo"
      }
    ],
    faqs: [
      {
        question: "Do you take all job sizes in Phoenixville?",
        answer: "We prioritize larger residential jobs in Phoenixville. Reach out with your scope and we will confirm if it is a fit."
      },
      {
        question: "How do I get a Phoenixville landscaping quote?",
        answer: "Fill out the quote request form and we will follow up within 24 hours to schedule the next step."
      }
    ],
    publishDate: "2026-04-25",
    updatedDate: "2026-04-25",
    featuredServiceSlugs: ["bed-cleanup", "mulching", "spring-cleanup", "bush-trimming"]
  },
  {
    slug: "collegeville",
    name: "Collegeville",
    region: "PA",
    county: "Montgomery County",
    tier: "secondary",
    heroTitle: "Landscaping Services in Collegeville, PA",
    summary:
      "Seasonal cleanup and leaf removal for Collegeville homeowners who want the full job handled cleanly.",
    whyCustomersHireUs:
      "Collegeville homeowners hire Iconic when they want a crew that works hard, communicates clearly, and finishes the scope completely.",
    serviceHighlights: ["Leaf Removal", "Spring Cleanup", "Bed Cleanup", "Mulching"],
    proofPoints: [
      "Strong leaf removal proof from Collegeville clients",
      "Clear communication throughout the job",
      "Leaves hauled away for natural composting"
    ],
    propertyTypes: "Suburban residential properties in Montgomery County, from established homes to newer developments.",
    seasonalNeeds: "Fall leaf removal, spring cleanup, and mulching.",
    landmarks: ["Collegeville Borough", "Providence Township area", "Trappe nearby"],
    reviews: [
      {
        quote:
          "They cleared a TON of leaves around my property and somehow managed to do it on a cold and windy day. They are a hard working crew that I would not hesitate to hire again.",
        author: "Susan Westington"
      }
    ],
    faqs: [
      {
        question: "Do you offer fall leaf removal in Collegeville?",
        answer:
          "Yes. Leaf removal is one of our most requested Collegeville services. Book early in fall because October schedules fill quickly."
      },
      {
        question: "Do you haul Collegeville leaves away?",
        answer:
          "Yes. Leaves are hauled to Arborganic Acres in Pottstown for natural composting, with nothing left on your property."
      }
    ],
    publishDate: "2026-04-25",
    updatedDate: "2026-04-25",
    featuredServiceSlugs: ["leaf-cleanup", "spring-cleanup", "bed-cleanup", "mulching"]
  }
];

export const mentionedSecondaryAreas = [
  {
    name: "Glenmoore",
    region: "PA",
    note: "Larger jobs prioritized",
    review:
      "Their communication via text was prompt, and when they needed an additional day the estimate remained unchanged.",
    author: "Chris Saitta"
  },
  {
    name: "Birdsboro",
    region: "PA",
    note: "Larger jobs prioritized",
    review: "These young men did a wonderful job on our yard. Will come back sometime in the near future.",
    author: "Renee D."
  }
];

export const areaMap = Object.fromEntries(areas.map((area) => [area.slug, area]));

export const areaSlugs = areas.map((area) => area.slug);
