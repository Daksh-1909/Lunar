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
        void: "#020408",
        cosmos: "#060d1a",
        nebula: "#0a1628",
        stardust: "#1a2a4a",
        moonbeam: "#c8d8f0",
        silver: "#8899bb",
        eclipse: "#f4a623",
        aurora: "#00e5a0",
        supernova: "#ff6b6b",
        twilight: "#7c3aed",
        // Apple Design System Interactive Colors
        primary: "#0066cc",
        "primary-focus": "#0071e3",
        "primary-on-dark": "#2997ff",
        ink: "#1d1d1f",
        "canvas-parchment": "#f5f5f7",
        "surface-pearl": "#fafafc",
        "surface-tile-1": "#272729",
        "surface-tile-2": "#2a2a2c",
        "surface-tile-3": "#252527",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        ui: ["Inter", "sans-serif"],
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

