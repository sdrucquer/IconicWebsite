import Image from "next/image";

const galleryPhotos = [
  {
    src: "/photos/home/after/after-1.jpg",
    alt: "Completed landscaping after photo 1",
    label: "Spring Cleanup - Pottstown"
  },
  {
    src: "/photos/home/after/after-2.jpg",
    alt: "Completed landscaping after photo 2",
    label: "Bed Cleanup + Mulch - Pottstown"
  },
  {
    src: "/photos/home/after/after-3.jpg",
    alt: "Completed landscaping after photo 3",
    label: "Landscape Refresh - Royersford"
  },
  {
    src: "/photos/home/after/after-4.jpg",
    alt: "Completed landscaping after photo 4",
    label: "Property Cleanup - Douglassville"
  },
  {
    src: "/photos/home/after/after-5.jpg",
    alt: "Completed landscaping after photo 5",
    label: "Curb Appeal Upgrade - Chester Springs"
  }
];

export function WorkGallery() {
  return (
    <section id="work" className="home-shell py-16 md:py-20 lg:py-24 xl:py-28">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="section-title lg:text-5xl">Our Work Speaks for Itself</h2>
          <p className="section-subtitle max-w-2xl lg:text-xl">
            Real projects from local properties, captured in the field by our crew.
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-primary/70 md:hidden">
        Swipe to see more →
      </p>

      <div className="mt-5 grid auto-cols-[88%] grid-flow-col snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:mt-8 md:grid-flow-row md:grid-cols-3 md:snap-none md:overflow-visible lg:gap-6 xl:grid-cols-4 xl:gap-7">
        {galleryPhotos.map((photo) => (
          <article
            key={photo.src}
            className="group relative aspect-[4/3] snap-start overflow-hidden rounded-xl border border-brand-primary/12 bg-white shadow-soft lg:rounded-2xl"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 30vw"
            />
            <div className="absolute inset-0 bg-transparent transition-colors duration-300 group-hover:bg-[rgba(28,74,30,0.72)]" />
            <div className="absolute inset-x-0 bottom-0 p-3 lg:p-4">
              <p className="text-xs font-semibold text-white drop-shadow-sm lg:text-sm xl:text-base">{photo.label}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
