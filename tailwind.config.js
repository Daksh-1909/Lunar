/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // ── User Palette (Mapped to CSS variables) ──
        "shade-5": "var(--demo-surface)",
        primary: "var(--demo-primary)",
        secondary: "var(--demo-secondary)",
        accent: "var(--demo-accent)",
        background: "var(--demo-background)",

        // ── Semantic aliases (mapped to new palette) ──
        void: "var(--demo-background)",        // deepest background  → background
        cosmos: "var(--demo-surface)",          // card backgrounds    → surface
        nebula: "var(--demo-secondary)",        // secondary surfaces  → secondary
        stardust: "var(--demo-border)",         // borders, dividers   → border
        eclipse: "var(--demo-primary)",         // highlight color     → primary

        // ── Text & accent tokens (kept & integrated) ──
        moonbeam: "var(--demo-text)",
        silver: "var(--demo-text-muted)",
        aurora: "#00e5a0",
        supernova: "#ff6b6b",
        twilight: "#7c3aed",

        // ── Interactive (updated to palette accent) ──
        "primary-focus": "#3d52b5",
        "primary-on-dark": "#6A7FDB",
        ink: "#1d1d1f",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        ui: ["Montserrat", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "shimmer": "shimmer 1.5s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 40px rgba(244, 166, 35, 0.3)" },
          "50%": { boxShadow: "0 0 80px rgba(244, 166, 35, 0.7)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
}

