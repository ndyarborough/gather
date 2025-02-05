import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "primary-color": "var(--primary-color)",
      "secondary-color": "var(--secondary-color)",
      "accent-color": "var(--accent-color)",
      "pop-color": "var(--pop-color)",
      "action-color": "var(--action-color)",
    },
    extend: {
      
    },
  },
  plugins: [],
} satisfies Config;
