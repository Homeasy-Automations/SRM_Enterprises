import type { Config } from "tailwindcss";

/**
 * Every colour that needs to change at runtime (mood switcher + per-category accents)
 * is expressed as a CSS variable, so a single style update repaints the whole site.
 * Light-only theme: there is deliberately no `dark:` variant.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Channel form (rgb(var(--x-rgb) / <alpha-value>)) keeps Tailwind opacity
        // modifiers such as `border-accent/25` working with CSS-variable colours.
        accent: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          soft: "rgb(var(--accent-soft-rgb) / <alpha-value>)",
          contrast: "rgb(var(--accent-contrast-rgb) / <alpha-value>)",
          secondary: "rgb(var(--accent-secondary-rgb) / <alpha-value>)",
          highlight: "rgb(var(--accent-highlight-rgb) / <alpha-value>)",
          deep: "rgb(var(--accent-deep-rgb) / <alpha-value>)",
        },
        navy: {
          DEFAULT: "rgb(var(--navy-rgb) / <alpha-value>)",
          soft: "rgb(var(--navy-soft-rgb) / <alpha-value>)",
        },
        surface: {
          white: "#FFFFFF",
          sky: "#F3F9FF",
          cream: "#FFF9F0",
        },
        brand: {
          blue: "#1E6FFF",
          green: "#19B26B",
          yellow: "#FFC93C",
        },
        cat: {
          corrugated: "#FF8A2B",
          epe: "#19C3E6",
          bubble: "#8B5CF6",
          poly: "#10B981",
          accessories: "#FF5C8A",
        },
        industry: {
          automotive: "#1E6FFF",
          engineering: "#FF8A2B",
          electronics: "#8B5CF6",
          pharma: "#19B26B",
          food: "#FFC93C",
          logistics: "#19C3E6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        xl2: "20px",
        "2xl": "24px",
        "3xl": "28px",
        blob: "42% 58% 63% 37% / 41% 44% 56% 59%",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(18, 41, 74, 0.16)",
        card: "0 18px 45px -22px rgba(18, 41, 74, 0.28)",
        lift: "0 26px 60px -24px rgba(18, 41, 74, 0.34)",
        accent: "0 22px 55px -20px var(--accent-shadow)",
        glow: "0 0 0 6px var(--accent-soft)",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(120deg, var(--accent) 0%, var(--accent-secondary) 100%)",
        "mesh-light":
          "radial-gradient(at 12% 18%, var(--accent-soft) 0px, transparent 55%), radial-gradient(at 88% 8%, #FFF9F0 0px, transparent 50%), radial-gradient(at 70% 92%, #EAFBF4 0px, transparent 55%)",
        "dots-pattern":
          "radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)",
      },
      backgroundSize: {
        dots: "22px 22px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(0, -14px, 0) rotate(3deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, 20px, 0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        shine: {
          "0%": { transform: "translateX(-120%) skewX(-18deg)" },
          "100%": { transform: "translateX(220%) skewX(-18deg)" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "bob-x": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(8px)" },
        },
      },
      animation: {
        marquee: "marquee-left 32s linear infinite",
        "marquee-fast": "marquee-left 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
        shine: "shine 2.6s ease-in-out infinite",
        "gradient-pan": "gradient-pan 9s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        "bob-x": "bob-x 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
