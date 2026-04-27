import { Service } from "@/data/services";
import { PremiumServicePage } from "@/components/PremiumServicePage";

export function BushTrimmingServicePage({ service }: { service: Service }) {
  return (
    <PremiumServicePage
      service={service}
      config={{
        schemaName: "Bush Trimming in Pottstown, PA",
        heroImage: "/photos/services/bush-trimming/after.jpg",
        heroAlt: "Freshly trimmed shrubs by Iconic Landscaping",
        heroLines: ["Trimmed Shrubs.", "Cleaner Shapes.", "A More Finished Yard."],
        heroSource: "bush_trimming_hero",
        includedHeading: "A cleaner shrub reset.",
        includedItems: [
          "Shrubs and bushes trimmed and shaped",
          "Overgrowth cleared away from windows and walks",
          "Dead growth removed where needed",
          "Intentional form through visible bed areas",
          "Trimmings cleaned up before we leave"
        ],
        includedNote: "Bed cleanup and debris haul-away available if needed.",
        galleryMainImage: "/photos/services/bush-trimming/after.jpg",
        galleryMainAlt: "Finished bush trimming result",
        galleryMainCaption: "Finished shrub trimming result",
        gallerySideImage: "/photos/bush-trimming.jpg",
        gallerySideAlt: "Bush trimming detail",
        gallerySideCaption: "Trim detail",
        galleryCrewImage: "/photos/services/spring-cleanup/hero.jpg",
        galleryCrewAlt: "Iconic Landscaping local crew",
        galleryCrewCaption: "Local crew",
        processSource: "bush_trimming_process",
        processSteps: [
          { eyebrow: "01", title: "Send the shrub details", body: "Send photos or a quick note about the shrubs that need trimming." },
          { eyebrow: "02", title: "Get a clear trim scope", body: "We confirm which shrubs are included and the shape you want." },
          { eyebrow: "03", title: "Come home to cleaner lines", body: "The crew trims, cleans up, and leaves the property tidy." }
        ],
        faqs: [
          { question: "Do you do tree trimming?", answer: "No. We specialize in shrubs and bushes only. We do not offer tree work of any kind." },
          { question: "How do I know if my bushes need trimming?", answer: "If they are overgrown, blocking windows or walks, or have grown past their shape, it is probably time." },
          { question: "Do you haul away clippings?", answer: "Yes. Trimming service includes cleanup so the space is finished when we leave." },
          { question: "Can trimming be combined with other work?", answer: "Yes. Bush trimming is commonly paired with bed cleanup, mulching, and debris removal." }
        ],
        areaHeading: "Bush trimming across Chester and Montgomery Counties.",
        areaCopy: "Based in Pottstown and active in nearby neighborhoods where clean shrub lines make the whole property feel more maintained.",
        relatedImages: {
          "spring-cleanup": "/photos/home/after/after-2.jpg",
          "bed-cleanup": "/photos/home/bed-cleanup.jpg",
          "off-site-removal": "/photos/services/off-site-removal/after.jpg"
        },
        bottomImage: "/photos/services/bush-trimming/after.jpg",
        bottomAlt: "Finished shrubs after trimming",
        bottomTitle: "Ready for cleaner shrubs?",
        bottomBody: "Send the request now and we will respond within 24 hours with next steps.",
        bottomSource: "bush_trimming_bottom",
        bottomSeasonLabel: "Best time to book: late spring and summer"
      }}
    />
  );
}
