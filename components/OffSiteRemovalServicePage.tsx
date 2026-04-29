import { Service } from "@/data/services";
import { PremiumServicePage } from "@/components/PremiumServicePage";

export function OffSiteRemovalServicePage({ service }: { service: Service }) {
  return (
    <PremiumServicePage
      service={service}
      config={{
        schemaName: "Off-Site Debris Removal in Pottstown, PA",
        heroImage: "/photos/services/off-site-removal/after.jpg",
        heroAlt: "Clean property after debris removal",
        heroLines: ["We Haul It Away.", "No Debris Piles.", "A Cleaner Finish."],
        heroSource: "off_site_removal_hero",
        includedHeading: "A cleaner job closeout.",
        includedItems: [
          "Job debris loaded from active work areas",
          "No leftover piles along the lawn or driveway",
          "Transport to the proper disposal or compost site",
          "Cleaner closeout after seasonal work",
          "A more finished property when the crew leaves"
        ],
        includedNote: "Common add-on for cleanup, trimming, brush work, and leaf removal.",
        galleryMainImage: "/photos/services/off-site-removal/after.jpg",
        galleryMainAlt: "Finished property after debris removal",
        galleryMainCaption: "Finished cleanup result",
        gallerySideImage: "/photos/services/off-site-removal/during.jpg",
        gallerySideAlt: "Debris removal in progress",
        gallerySideCaption: "Debris haul-away in progress",
        galleryCrewImage: "/photos/services/spring-cleanup/hero.jpg",
        galleryCrewAlt: "Iconic Landscaping local crew",
        galleryCrewCaption: "Local crew",
        processSource: "off_site_removal_process",
        processSteps: [
          { eyebrow: "01", title: "Send the cleanup details", body: "Send photos or a quick note about the debris that needs to leave the property." },
          { eyebrow: "02", title: "Get a clear haul-away scope", body: "We confirm the volume, active work area, and whether it is bundled with another service." },
          { eyebrow: "03", title: "Come home to a cleaner finish", body: "The crew loads, hauls, and leaves the property without the leftover piles." }
        ],
        faqs: [
          { question: "Do I need to bag the debris myself?", answer: "No. We handle debris from the active job scope, so no prep is needed on your end." },
          { question: "Is off-site removal always included?", answer: "It is available as an add-on to any service. We note it clearly on your quote." },
          { question: "Can this be added to any service?", answer: "Yes. Off-site removal can be bundled with most cleanup and reset services." },
          { question: "Where does the debris go?", answer: "Organic debris is taken to the proper disposal or composting destination instead of being left on site." }
        ],
        areaHeading: "Off-site debris removal across Chester and Montgomery Counties.",
        areaCopy: "Based in Pottstown and active in nearby neighborhoods where cleanup is not really done until the debris is gone.",
        relatedImages: {
          "spring-cleanup": "/photos/home/after/after-2.jpg",
          "bed-cleanup": "/photos/home/bed-cleanup.jpg",
          "brush-cleanup": "/photos/services/brush-cleanup/after.jpg"
        },
        bottomImage: "/photos/services/off-site-removal/after.jpg",
        bottomAlt: "Clean property after debris haul-away",
        bottomTitle: "Need it hauled away?",
        bottomBody: "Send the request now and we will respond within 24 hours with next steps.",
        bottomSource: "off_site_removal_bottom",
        bottomSeasonLabel: "Available all season"
      }}
    />
  );
}
