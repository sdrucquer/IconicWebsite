import { Service } from "@/data/services";
import { PremiumServicePage } from "@/components/PremiumServicePage";

export function LeafCleanupServicePage({ service }: { service: Service }) {
  return (
    <PremiumServicePage
      service={service}
      config={{
        schemaName: "Leaf Cleanup in Pottstown, PA",
        heroImage: "/photos/leaf-cleanup-working.jpg",
        heroAlt: "Leaf cleanup by Iconic Landscaping",
        heroLines: ["Leaves Cleared.", "Lawn Opened Up.", "A Cleaner Property."],
        heroSource: "leaf_cleanup_hero",
        includedHeading: "A cleaner seasonal leaf reset.",
        includedItems: [
          "Leaf buildup cleared from lawn areas",
          "Leaves removed from beds and edges",
          "Cleanup through hard-to-reach corners",
          "Bagging or haul-away based on scope",
          "A final pass so the property feels navigable again"
        ],
        includedNote: "Off-site debris removal and seasonal cleanup available if needed.",
        galleryMainImage: "/photos/leaf-cleanup-after.jpg",
        galleryMainAlt: "Finished leaf cleanup result",
        galleryMainCaption: "Finished leaf cleanup result",
        gallerySideImage: "/photos/leaf-cleanup-working.jpg",
        gallerySideAlt: "Leaf cleanup in progress",
        gallerySideCaption: "Leaf cleanup in progress",
        galleryCrewImage: "/photos/services/spring-cleanup/hero.jpg",
        galleryCrewAlt: "Iconic Landscaping local crew",
        galleryCrewCaption: "Local crew",
        processSource: "leaf_cleanup_process",
        processSteps: [
          { eyebrow: "01", title: "Send the leaf details", body: "Send photos or a quick note about the leaf buildup on the property." },
          { eyebrow: "02", title: "Get a clear cleanup scope", body: "We confirm the lawn, bed, edge, and haul-away scope before scheduling." },
          { eyebrow: "03", title: "Come home to a cleaner yard", body: "The crew clears the leaves and leaves the property easier to maintain." }
        ],
        faqs: [
          { question: "Is leaf removal only available in fall?", answer: "No. Fall is peak season, but we offer leaf removal year-round when properties need it." },
          { question: "Where do the leaves go?", answer: "Leaves are hauled to a composting facility where they are naturally composted." },
          { question: "Is leaf removal part of fall cleanup?", answer: "Yes. Leaf removal is a core part of fall cleanup and can also be booked as a standalone service." },
          { question: "Can you clear wooded edges and corners too?", answer: "Yes. We handle the visible buildup across lawn, beds, edges, and difficult corners based on the property." }
        ],
        areaHeading: "Leaf cleanup across Chester and Montgomery Counties.",
        areaCopy: "Based in Pottstown and active in nearby neighborhoods where heavy seasonal leaf buildup can make a property feel buried fast.",
        relatedImages: {
          "spring-cleanup": "/photos/home/after/after-2.jpg",
          "off-site-removal": "/photos/services/off-site-removal/after.jpg",
          "brush-cleanup": "/photos/services/brush-cleanup/after.jpg"
        },
        bottomImage: "/photos/leaf-cleanup-after.jpg",
        bottomAlt: "Leaf cleanup after service",
        bottomTitle: "Ready to clear the leaves?",
        bottomBody: "Send the request now and we will respond within 24 hours with next steps.",
        bottomSource: "leaf_cleanup_bottom",
        bottomSeasonLabel: "Peak season: fall"
      }}
    />
  );
}
