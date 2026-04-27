import { Service } from "@/data/services";
import { PremiumServicePage } from "@/components/PremiumServicePage";

export function PlantingServicePage({ service }: { service: Service }) {
  return (
    <PremiumServicePage
      service={service}
      config={{
        schemaName: "Planting in Pottstown, PA",
        heroImage: "/photos/services/planting/after.jpg",
        heroAlt: "Fresh planting installation by Iconic Landscaping",
        heroLines: ["Fresh Planting.", "Cleaner Beds.", "A Better First Impression."],
        heroSource: "planting_hero",
        includedHeading: "A more intentional bed refresh.",
        includedItems: [
          "Flowers and smaller plants installed",
          "Practical spacing and placement",
          "Clean bed preparation before install",
          "Watering at set-in",
          "Cleanup after planting is complete"
        ],
        includedNote: "Bed cleanup and mulch available if needed.",
        galleryMainImage: "/photos/services/planting/after.jpg",
        galleryMainAlt: "Finished planting result",
        galleryMainCaption: "Finished planting result",
        gallerySideImage: "/photos/services/planting/during.jpg",
        gallerySideAlt: "Planting in progress",
        gallerySideCaption: "Planting in progress",
        galleryCrewImage: "/photos/services/spring-cleanup/hero.jpg",
        galleryCrewAlt: "Iconic Landscaping local crew",
        galleryCrewCaption: "Local crew",
        processSource: "planting_process",
        processSteps: [
          { eyebrow: "01", title: "Send the bed details", body: "Send photos or a quick note about the beds you want refreshed." },
          { eyebrow: "02", title: "Confirm the planting plan", body: "We confirm the plants, spacing, and whether cleanup or mulch is included." },
          { eyebrow: "03", title: "Come home to refreshed beds", body: "The crew installs the planting and leaves the area cleaned up." }
        ],
        faqs: [
          { question: "Can I supply my own plants?", answer: "Yes. You can provide the plants and we will handle installation. We can also source plants if you prefer." },
          { question: "Do you install trees?", answer: "No. We specialize in flowers and smaller plants only. We do not install trees or saplings of any size." },
          { question: "Can you help with bed layout?", answer: "Yes. We can work with your vision or guide placement during the quote walkthrough so the finished bed looks intentional." },
          { question: "Should planting be combined with mulch?", answer: "Often yes. Fresh planting plus mulch usually creates the cleanest finished result." }
        ],
        areaHeading: "Planting across Chester and Montgomery Counties.",
        areaCopy: "Based in Pottstown and active in nearby neighborhoods where a simple planting refresh can completely change first impressions.",
        relatedImages: {
          "bed-cleanup": "/photos/home/bed-cleanup.jpg",
          mulching: "/photos/home/after/after-4.jpg",
          edging: "/photos/services/edging/during.jpg"
        },
        bottomImage: "/photos/services/planting/after.jpg",
        bottomAlt: "Finished planting after service",
        bottomTitle: "Ready to refresh the beds?",
        bottomBody: "Send the request now and we will respond within 24 hours with next steps.",
        bottomSource: "planting_bottom",
        bottomSeasonLabel: "Best time to book: spring through early fall"
      }}
    />
  );
}
