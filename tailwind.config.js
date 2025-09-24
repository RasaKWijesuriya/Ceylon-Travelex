/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0b0b0b",
          gold: "#F4C048",
          white: "#F6F6F6",
          slate: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
      letterSpacing: {
        wide2: ".08em",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.25)",
      },
    },
  },
  plugins: [],
};
