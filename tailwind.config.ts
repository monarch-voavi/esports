import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          green: "#00FFA3",
          purple: "#8B6FFF",
          blue: "#00D4FF",
          pink: "#FF006E",
        },
        dark: {
          900: "#080B14",
          800: "#0D1117",
          700: "#111827",
          600: "#161D2C",
          500: "#1E2A3A",
          400: "#263347",
          300: "#2E3D56",
        },
      },
      backgroundImage: {
        "gradient-neon": "linear-gradient(135deg, #00FFA3 0%, #8B6FFF 100%)",
        "gradient-dark": "linear-gradient(180deg, #080B14 0%, #0D1117 100%)",
      },
      boxShadow: {
        "neon-green": "0 0 20px rgba(0, 255, 163, 0.3)",
        "neon-purple": "0 0 20px rgba(139, 111, 255, 0.3)",
        "neon-green-lg": "0 0 40px rgba(0, 255, 163, 0.4)",
        "neon-purple-lg": "0 0 40px rgba(139, 111, 255, 0.4)",
        "card": "0 4px 24px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        "pulse-neon": "pulseNeon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-in": "slideIn 0.3s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        pulseNeon: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        slideIn: {
          from: { transform: "translateX(-10px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
