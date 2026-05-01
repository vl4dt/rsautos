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
        glass: "0 24px 60px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        redGlow: "0 0 22px rgba(227, 6, 19, 0.32)",
        blueGlow: "0 0 22px rgba(11, 83, 215, 0.32)"
      }
    }
  },
  plugins: []
};

export default config;
