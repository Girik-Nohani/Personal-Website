import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "page":      "#000300",
        "card":      "#1A1B1A",
        "teal":      "#00C6BE",
        "yellow":    "#F0E100",
        "divider":   "#F7F0F0",
        "gray-1":    "#FFFFFF",
        "gray-2":    "#E6E6E6",
        "gray-3":    "#CCCCCC",
        "gray-4":    "#B3B3B3",
        "gray-5":    "#999999",
        "gray-6":    "#333333",
      },
      fontFamily: {
        exo:  ["Exo 2", "sans-serif"],
        jost: ["Jost", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;