export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  tagline: string;
  included: string[];
  whyItMatters: string[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: "bed-cleanup",
    name: "Bed Cleanup",
    shortDescription: "Debris out, weeds handled, edges reset and beds prepped for mulch.",
    tagline: "Reset your planting beds so the rest of your property looks intentional.",
    included: [
      "Removal of sticks, dead plants, and seasonal debris",
      "Targeted weeding with roots pulled whenever possible",
      "Fresh bed edging to define borders",
      "Final prep so beds are ready for mulch or planting"
    ],
    whyItMatters: [
      "Most yards look messy because the beds are neglected, not because the whole property is in bad shape. A proper cleanup instantly sharpens curb appeal and makes maintenance easier the rest of the season.",
      "Our bed cleanups are priced by section based on labor and difficulty, so you get a fair quote tied to actual work instead of a vague flat number."
    ],
    related: ["mulching", "weeding", "edging"]
  },
  {
    slug: "mulching",
    name: "Mulching",
    shortDescription: "Installed mulch that locks in moisture, suppresses weeds, and finishes the property.",
    tagline: "The clean, finished look every well-kept property needs.",
    included: [
      "Mulch quantity planning and full delivery coordination",
      "Installation with even coverage and clean transitions",
      "Black mulch option (our most requested color)",
      "Complete install process handled by our crew"
    ],
    whyItMatters: [
      "Fresh mulch does more than look good. It keeps soil moisture stable, reduces weed pressure, and protects plant roots through weather swings.",
      "Our installed base rate starts at $130 per yard. We source, coordinate, and install, so you do not have to manage deliveries or materials."
    ],
    related: ["bed-cleanup", "edging", "planting"]
  },
  {
    slug: "leaf-cleanup",
    name: "Leaf Cleanup",
    shortDescription: "Seasonal leaf clearing to keep turf healthy and properties tidy.",
    tagline: "Clear leaves before they smother your lawn and beds.",
    included: [
      "Blow-out and collection from lawn and beds",
      "Detailed cleanup around fences, shrubs, and walkways",
      "Bagging and removal from site when needed",
      "Final pass for a clean, even finish"
    ],
    whyItMatters: [
      "Leaf buildup traps moisture and blocks light, which can stress turf and create muddy, matted sections in spring.",
      "Regular cleanup protects lawn health and keeps your home looking maintained even in heavy leaf season."
    ],
    related: ["spring-cleanup", "off-site-removal", "bed-cleanup"]
  },
  {
    slug: "bush-trimming",
    name: "Bush Trimming",
    shortDescription: "Structured trimming that keeps shrubs healthy and visually balanced.",
    tagline: "Shape overgrowth into clean lines without overcutting.",
    included: [
      "Selective trimming for shape and structure",
      "Height and spread control around windows and walkways",
      "Dead growth removal to promote healthier regrowth",
      "Debris cleanup after trimming"
    ],
    whyItMatters: [
      "Overgrown bushes quickly make a property look neglected and can block light, paths, and visibility.",
      "A proper trim keeps shrubs clean and full while preserving the natural look of your landscape design."
    ],
    related: ["spring-cleanup", "bed-cleanup", "brush-cleanup"]
  },
  {
    slug: "brush-cleanup",
    name: "Brush Cleanup",
    shortDescription: "Cutback and removal of invasive plants, dense overgrowth, and tangled vines.",
    tagline: "Take back areas that have become too overgrown to maintain.",
    included: [
      "Removal of invasive brush and dense growth",
      "Cutting back unmanaged vines and thickets",
      "Clearing fence lines, bed edges, and transitions",
      "Haul-away and off-site disposal of all cleared material"
    ],
    whyItMatters: [
      "Brush spreads fast and can overwhelm beds, trees, and fence lines if left alone for even one season.",
      "We clear it fully and haul everything off-site so the area is usable, visible, and ready for future improvements."
    ],
    related: ["off-site-removal", "spring-cleanup", "bush-trimming"]
  },
  {
    slug: "edging",
    name: "Edging",
    shortDescription: "Crisp bed and hardscape lines that make the whole property look finished.",
    tagline: "One of the highest-impact upgrades for immediate curb appeal.",
    included: [
      "Fresh edge creation along planting beds",
      "Re-cutting and cleaning up existing edges",
      "Hardscape transitions around paths and patios",
      "Final detail pass for consistent line quality"
    ],
    whyItMatters: [
      "Clean edging creates definition between lawn, beds, and hardscaping. It is one of the fastest ways to make a property look professionally maintained.",
      "When paired with bed cleanup and mulch, edging gives your landscape sharp lines that hold the overall look together."
    ],
    related: ["mulching", "bed-cleanup", "weeding"]
  },
  {
    slug: "weeding",
    name: "Weeding",
    shortDescription: "Hands-on weed removal that restores beds without damaging valuable plants.",
    tagline: "Keep weed pressure down before it takes over your landscape.",
    included: [
      "Hand pulling throughout planting beds",
      "Root removal when conditions allow",
      "Targeted cleanup around ornamentals and perennials",
      "Debris collection and disposal"
    ],
    whyItMatters: [
      "Weeds compete with ornamentals for nutrients and water, and they quickly turn good beds into patchy, overgrown areas.",
      "Consistent weeding protects your investment in mulch and plantings while keeping the property looking cared for week to week."
    ],
    related: ["bed-cleanup", "mulching", "planting"]
  },
  {
    slug: "planting",
    name: "Planting",
    shortDescription: "Seasonal planting to add color, structure, and long-term curb appeal.",
    tagline: "Install the right plants in the right places for lasting results.",
    included: [
      "Plant placement guidance based on sunlight and spacing",
      "Installation of annuals, shrubs, and accent plants",
      "Bed prep and set-in watering",
      "Site cleanup after installation"
    ],
    whyItMatters: [
      "Strategic planting adds depth and personality to a property and helps create a polished first impression.",
      "We focus on practical placement so your landscape still looks good weeks and months later, not just on day one."
    ],
    related: ["mulching", "bed-cleanup", "weeding"]
  },
  {
    slug: "off-site-removal",
    name: "Off-Site Removal",
    shortDescription: "Reliable haul-away for debris, brush, and organic waste from cleanup jobs.",
    tagline: "No leftover piles. We remove and dispose of everything responsibly.",
    included: [
      "Loading and haul-away of leaves, brush, and debris",
      "Removal after bed cleanups and seasonal resets",
      "Responsible disposal at approved facilities",
      "Final sweep so the site is left clean"
    ],
    whyItMatters: [
      "Cleanup is not complete until the material is gone. Piles left at curb or in corners can undo the look you paid for.",
      "Our crew handles the full removal process so your property is actually finished when we leave."
    ],
    related: ["brush-cleanup", "leaf-cleanup", "spring-cleanup"]
  },
  {
    slug: "spring-cleanup",
    name: "Spring Cleanup",
    shortDescription: "A full-property reset to launch the season looking clean and maintained.",
    tagline: "Start spring with everything cleaned, trimmed, and ready to grow.",
    included: [
      "Leaf and storm debris cleanup across the property",
      "Bed cleanup and weed control",
      "Light bush trimming and shape-up work",
      "Final detail pass and haul-away"
    ],
    whyItMatters: [
      "Winter leaves behind debris, overgrowth, and tired beds. A spring cleanup gives your entire property a clean slate before growth season begins.",
      "This is our most complete seasonal service and the fastest path to getting your landscape back in shape."
    ],
    related: ["leaf-cleanup", "bed-cleanup", "bush-trimming"]
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
  "Birdsboro",
  "Gilbertsville",
  "Elverson",
  "Glenmore",
  "Downingtown",
  "Boyertown"
];

export const allServiceAreas = [
  ...serviceAreasPrimary,
  ...serviceAreasSecondary
];
