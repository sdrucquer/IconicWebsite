"use client";

import { useState } from "react";

const mulchOptions = [
  {
    name: "Black dyed",
    group: "Dyed",
    detail: "Bold contrast for clean, modern-looking beds.",
    swatch: "bg-[radial-gradient(circle_at_30%_25%,#4a4a42_0,#171913_42%,#050604_100%)]"
  },
  {
    name: "Brown dyed",
    group: "Dyed",
    detail: "Classic, warm finish that works with most homes.",
    swatch: "bg-[radial-gradient(circle_at_30%_25%,#9a6a3d_0,#5c351f_48%,#2e1b11_100%)]"
  },
  {
    name: "Red dyed",
    group: "Dyed",
    detail: "A stronger color choice for beds that need definition.",
    swatch: "bg-[radial-gradient(circle_at_30%_25%,#b85b3d_0,#74301f_48%,#35140e_100%)]"
  },
  {
    name: "Hardwood",
    group: "Natural",
    detail: "Natural, understated, and easy to pair with established beds.",
    swatch: "bg-[radial-gradient(circle_at_30%_25%,#b58a58_0,#76512f_48%,#3e2b1c_100%)]"
  },
  {
    name: "Cedar",
    group: "Natural",
    detail: "Lighter, aromatic finish with a softer natural tone.",
    swatch: "bg-[radial-gradient(circle_at_30%_25%,#d29d62_0,#986031_48%,#553119_100%)]"
  },
  {
    name: "Pine bark",
    group: "Natural",
    detail: "Chunkier texture for a more rustic bed finish.",
    swatch: "bg-[radial-gradient(circle_at_30%_25%,#8a5b37_0,#4d3020_48%,#24150d_100%)]"
  },
  {
    name: "Compost blend",
    group: "Compost",
    detail: "Useful when beds need a soil-building refresh.",
    swatch: "bg-[radial-gradient(circle_at_30%_25%,#5f4b35_0,#342a1f_48%,#17120d_100%)]"
  }
];

export function MulchOptionsSelector() {
  const [selectedName, setSelectedName] = useState(mulchOptions[0].name);
  const selected = mulchOptions.find((option) => option.name === selectedName) ?? mulchOptions[0];

  return (
    <div className="border-y hairline py-5">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {mulchOptions.map((option) => {
          const isSelected = option.name === selected.name;

          return (
            <button
              key={option.name}
              type="button"
              onClick={() => setSelectedName(option.name)}
              className={`group flex items-center gap-3 rounded border px-3 py-3 text-left outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-brand-forest/40 ${
                isSelected
                  ? "border-brand-forest bg-brand-bone"
                  : "hairline bg-brand-cream hover:border-brand-sage hover:bg-brand-bone"
              }`}
            >
              <span
                className={`h-8 w-8 flex-none rounded-full border border-white/70 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)] transition duration-300 ${option.swatch} ${
                  isSelected ? "scale-110" : "group-hover:scale-105"
                }`}
                aria-hidden
              />
              <span className="text-sm font-bold leading-tight text-brand-ink">{option.name}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded bg-brand-bone px-4 py-3 transition-all duration-300">
        <p className="text-sm leading-relaxed text-brand-ink/70">
          <span className="font-bold text-brand-forest">{selected.name}:</span>{" "}
          {selected.detail}
        </p>
      </div>
    </div>
  );
}
