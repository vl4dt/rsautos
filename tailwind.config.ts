import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        "panel-strong": "var(--panel-strong)",
        border: "var(--border)",
        muted: "var(--muted)",
        brandRed: "var(--red)",
        brandBlue: "var(--blue)",
        silver: "var(--silver)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      boxShadow: {
        glass: "0 18px 44px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.045)",
        redGlow: "0 10px 24px rgba(0, 0, 0, 0.24)",
        blueGlow: "0 10px 24px rgba(0, 0, 0, 0.2)"
      }
    }
  },
  plugins: []
};

export default config;
