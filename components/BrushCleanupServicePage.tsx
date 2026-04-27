import { Service } from "@/data/services";
import { PremiumServicePage } from "@/components/PremiumServicePage";

export function BrushCleanupServicePage({ service }: { service: Service }) {
  return (
    <PremiumServicePage
      service={service}
      config={{
        schemaName: "Brush Cleanup in Pottstown, PA",
        heroImage: "/photos/services/brush-cleanup/after.jpg",
        heroAlt: "Brush cleanup result by Iconic Landscaping",
        heroLines: ["Overgrowth Cleared.", "Brush Cut Back.", "Usable Space Restored."],
        heroSource: "brush_cleanup_hero",
        includedHeading: "A fuller property reset.",
        includedItems: [
          "Dense overgrowth cut back",
          "Brush cleared from overrun areas",
          "Fence lines and edges opened up",
          "Debris gathered and cleared from the work zone",
          "Space reset so the area feels usable again"
        ],
        includedNote: "Off-site debris removal available if needed.",
        galleryMainImage: "/photos/services/brush-cleanup/after.jpg",
        galleryMainAlt: "Finished brush cleanup result",
        galleryMainCaption: "Finished brush cleanup result",
        gallerySideImage: "/photos/brush-cleanup-during.jpg",
        gallerySideAlt: "Brush cleanup in progress",
        gallerySideCaption: "Brush cleanup in progress",
        galleryCrewImage: "/photos/services/spring-cleanup/hero.jpg",
        galleryCrewAlt: "Iconic Landscaping local crew",
        galleryCrewCaption: "Local crew",
        processSource: "brush_cleanup_process",
        processSteps: [
          { eyebrow: "01", title: "Send the area details", body: "Send photos or a quick note about the overgrown area that needs to be cleared." },
          { eyebrow: "02", title: "Get a clear cleanup scope", body: "We confirm what gets cut back, what stays, and whether haul-away is included." },
          { eyebrow: "03", title: "Come home to restored space", body: "The crew clears the area and leaves the work zone more usable and more open." }
        ],
        faqs: [
          { question: "How overgrown is too overgrown?", answer: "We can handle large, heavily overgrown areas. The only limitation is trees, because we do not cut or remove trees." },
          { question: "Do you haul away everything you clear?", answer: "Yes. Off-site removal is available as an add-on unless you prefer material left on site." },
          { question: "Can you create a walking path through a wooded area?", answer: "Yes. Path clearing and restoration is one of our specialties within brush cleanup." },
          { question: "Is brush cleanup the same as tree work?", answer: "No. We handle brush, invasive growth, and overrun edges, but not tree trimming or tree removal." }
        ],
        areaHeading: "Brush cleanup across Chester and Montgomery Counties.",
        areaCopy: "Based in Pottstown and active in nearby neighborhoods where overgrown edges, fence lines, and brushy corners need a proper reset.",
        relatedImages: {
          "spring-cleanup": "/photos/home/after/after-2.jpg",
          "off-site-removal": "/photos/services/off-site-removal/after.jpg",
          "bush-trimming": "/photos/services/bush-trimming/after.jpg"
        },
        bottomImage: "/photos/services/brush-cleanup/after.jpg",
        bottomAlt: "Restored brush cleanup area after service",
        bottomTitle: "Ready to clear it back?",
        bottomBody: "Send the request now and we will respond within 24 hours with next steps.",
        bottomSource: "brush_cleanup_bottom",
        bottomSeasonLabel: "Available spring through fall"
      }}
    />
  );
}
