/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./route/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      main: "#57d382",
      secondary: "#57d382",
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      Emerald: {
        400: "#34d399",
      },
      stale: {
        100: "#f1f5f9",
      },
      gray: {
        50: "#f3f4f6",
        100: "#f7fafc",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        900: "#1a202c",
      },
      red: {
        400: "#f87171",
        500: "#ef4444",
      },
      sky: {
        500: "#0ea5e9",
        600: "#0284c7",
      },
      indigo: {
        500: "#6366f1",
      },
    },
    extend: {},
  },
  plugins: [],
};
