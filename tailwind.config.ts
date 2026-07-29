import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07060a",
          900: "#0c0a12",
          850: "#120f1a",
          800: "#181420",
        },
        mist: {
          100: "#f5f3fb",
          300: "#c9c3dd",
          500: "#8d84ab",
        },
        bloom: {
          400: "#b79bff",
          500: "#8f6bff",
          600: "#6f4cf5",
        },
        coral: {
          400: "#ff9d81",
          500: "#ff7a56",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "grain": "url('/assets/noise.png')",
        "radial-fade": "radial-gradient(circle at 50% 0%, rgba(143,107,255,0.25), transparent 60%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
        glow: "0 0 60px rgba(143,107,255,0.35)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 12s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
