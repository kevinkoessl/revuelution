/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        artistic: ["itc-avant-garde-gothic-pro", "sans-serif"],
        sans: ["forma-djr-text", "sans-serif"],
      },
    },
  },
  plugins: [],
};
