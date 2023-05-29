/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "@blue": "#0BBBCC",
        "@orange": "#E4572E",
        "@light-blue": "#F2FBFC",
        "@dark": "#2D2D2A",
      },
    },
  },
  plugins: [],
};
