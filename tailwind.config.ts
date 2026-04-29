import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // New tokens (design-system v2)
          forest: "#1F4A22",
          moss: "#2D6A2F",
          sage: "#8FA98C",
          tan: "#D8C7A6",
          cream: "#F5F1E8",
          ink: "#141A14",
          bone: "#FAF8F2",
          gold: "#B8923D",
          // Legacy aliases — kept so the existing site renders unchanged during migration.
          // Will be removed once every page is on the new system.
          primary: "#2D6A2F",
          accent: "#4CAF50",
          dark: "#1A1A1A",
          light: "#F5F5F0",
          white: "#FFFFFF"
        }
      },
      fontFamily: {
        // New voices — wired in app/layout.tsx via next/font/google
        display: ["var(--font-fraunces)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
        // Legacy alias kept for any leftover `font-display` usages that expected the old stack.
        legacy: ["Canva Sans", "Nunito Sans", "Avenir Next", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        soft: "0 12px 36px rgba(26, 26, 26, 0.08)",
        card: "0 18px 34px rgba(17, 24, 39, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
