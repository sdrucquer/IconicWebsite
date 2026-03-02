import Image from "next/image";

const galleryPhotos = [
  {
    src: "/photos/edging-trim.jpg",
    alt: "Clean edging and trim detail around planting beds",
    label: "Edging - Pottstown"
  },
  {
    src: "/photos/bush-trimming.jpg",
    alt: "Bush trimming and structure reset in front landscaping",
    label: "Bush Trimming - Royersford"
  },
  {
    src: "/photos/leaf-cleanup-before.jpg",
    alt: "Property before leaf cleanup with heavy coverage",
    label: "Leaf Cleanup (Before) - Spring City"
  },
  {
    src: "/photos/leaf-cleanup-after.jpg",
    alt: "Property after leaf cleanup and final pass",
    label: "Leaf Cleanup (After) - Spring City"
  },
  {
    src: "/photos/brush-cleanup.jpg",
    alt: "Brush cleanup and overgrowth clearing",
    label: "Brush Cleanup - Douglassville"
  },
  {
    src: "/photos/property-finish.jpg",
    alt: "Finished bed cleanup and edging at a residential property",
    label: "Bed Cleanup - Chester Springs"
  }
];

export function WorkGallery() {
  return (
    <section id="work" className="section-shell py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="section-title">Our Work Speaks for Itself</h2>
          <p className="section-subtitle max-w-2xl">
            Real projects from local properties, captured in the field by our crew.
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-primary/70 md:hidden">
        Swipe to see more →
      </p>

      <div className="mt-5 grid auto-cols-[88%] grid-flow-col snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:mt-8 md:grid-flow-row md:grid-cols-3 md:snap-none md:overflow-visible">
        {galleryPhotos.map((photo) => (
          <article
            key={photo.src}
            className="group relative aspect-[4/3] snap-start overflow-hidden rounded-xl border border-brand-primary/12 bg-white shadow-soft"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-transparent transition-colors duration-300 group-hover:bg-[rgba(28,74,30,0.72)]" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="text-xs font-semibold text-white drop-shadow-sm">{photo.label}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
