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
        // ── User Palette ──
        "shade-5": "#b0c4de",
        primary: "#0a0a0a",
        secondary: "#1a1a1a",
        accent: "#2d2d2d",
        background: "#4682b4",

        // ── Semantic aliases (mapped to new palette) ──
        void: "#b0c4de",           // deepest background  → shade-5
        cosmos: "#0a0a0a",         // card backgrounds    → primary
        nebula: "#1a1a1a",         // secondary surfaces  → secondary
        stardust: "#2d2d2d",       // borders, dividers   → accent

        // ── Text & accent tokens (kept) ──
        moonbeam: "#c8d8f0",
        silver: "#8899bb",
        eclipse: "#f4a623",
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

