/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:       "#0d0f14",
        surface:  "#13151c",
        surface2: "#1a1d26",
        border:   "#252836",
        accent:   "#6366f1",
        "accent-hover": "#4f46e5",
        "accent-dim": "rgba(99,102,241,0.12)",
        green:    "#22c55e",
        "green-dim": "rgba(34,197,94,0.12)",
        red:      "#ef4444",
        "red-dim": "rgba(239,68,68,0.12)",
        text1:    "#f1f5f9",
        text2:    "#a8b4c8",
        text3:    "#545970",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body:    ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        accent:  "0 4px 20px rgba(99,102,241,0.3)",
        "accent-lg": "0 8px 32px rgba(99,102,241,0.4)",
        glow:    "0 0 24px rgba(99,102,241,0.35)",
      },
      animation: {
        "slide-in":   "slideIn 0.2s ease",
        "fade-up":    "fadeUp 0.4s ease",
        "fade-in":    "fadeIn 0.3s ease",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        slideIn: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}
