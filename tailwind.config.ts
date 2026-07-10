import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: "#fbf3dd",
          100: "#f5e7b8",
          200: "#e9d086",
        },
        gold: {
          400: "#ffd66b",
          500: "#f5b53d",
          600: "#d99020",
          700: "#a06410",
        },
        royal: {
          50: "#f3edff",
          400: "#7a5af8",
          500: "#5b34d6",
          600: "#3f1fae",
          700: "#2c1488",
          900: "#160844",
        },
        ember: {
          400: "#ff8a3d",
          500: "#ef5b1f",
          600: "#c63d0e",
        },
        bark: {
          800: "#3a2616",
          900: "#241407",
        },
        moss: {
          400: "#7dd957",
          500: "#4fb026",
          600: "#358a18",
        },
      },
      fontFamily: {
        display: ["'Cinzel'", "Georgia", "serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        wood: "inset 0 0 0 4px #241407, 0 6px 0 0 #160844, 0 10px 30px rgba(0,0,0,0.4)",
        stamp: "inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -3px 0 rgba(0,0,0,0.3), 0 4px 0 rgba(0,0,0,0.35)",
        glow: "0 0 24px 6px rgba(245,181,61,0.5)",
      },
      animation: {
        bob: "bob 2.4s ease-in-out infinite",
        pulseGold: "pulseGold 1.8s ease-in-out infinite",
        shake: "shake 0.4s ease-in-out",
      },
      keyframes: {
        bob: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseGold: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(245,181,61,0.6)" },
          "50%": { boxShadow: "0 0 0 14px rgba(245,181,61,0)" },
        },
        shake: {
          "0%,100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-6px)" },
          "75%": { transform: "translateX(6px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
