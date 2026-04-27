"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

type AfterGalleryProps = {
  items: GalleryItem[];
  perPage?: number;
};

export function AfterGallery({ items, perPage = 1 }: AfterGalleryProps) {
  const totalPages = Math.ceil(items.length / perPage);
  const [page, setPage] = useState(0);

  const visible = items.slice(page * perPage, page * perPage + perPage);

  return (
    <div>
      <div className="grid grid-cols-1 gap-3">
        {visible.map((item) => (
          <figure key={item.src} className="group overflow-hidden rounded">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            {item.caption ? (
              <figcaption className="meta mt-2">{item.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous photo"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border hairline bg-brand-cream text-brand-ink transition-colors hover:border-brand-forest hover:text-brand-forest disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="meta text-brand-sage">
            {page + 1} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            aria-label="Next photo"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border hairline bg-brand-cream text-brand-ink transition-colors hover:border-brand-forest hover:text-brand-forest disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
