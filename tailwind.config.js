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
        "shade-5": "#05081A",
        primary: "#090E23",
        secondary: "#2B4B7A",
        accent: "#5BB8FF",
        background: "#A5DBFF",

        // ── Semantic aliases (mapped to new palette) ──
        void: "#05081A",           // deepest background  → shade-5
        cosmos: "#090E23",         // card backgrounds    → primary
        nebula: "#2B4B7A",         // secondary surfaces  → secondary
        stardust: "#5BB8FF",       // borders, dividers   → accent

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

