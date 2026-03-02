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
          primary: "#2D6A2F",
          accent: "#4CAF50",
          dark: "#1A1A1A",
          light: "#F5F5F0",
          white: "#FFFFFF"
        }
      },
      fontFamily: {
        sans: ["Canva Sans", "Nunito Sans", "Avenir Next", "Segoe UI", "sans-serif"],
        display: ["Canva Sans", "Nunito Sans", "Avenir Next", "Segoe UI", "sans-serif"]
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
