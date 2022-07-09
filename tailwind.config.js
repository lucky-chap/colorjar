/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#15202B",
        secondary: "#192734",
        tertiary: "#121826",
        accent: "#1D9BF0",
        card: "#273340"
      },
      fontFamily: {
        inter: ["Inter"],
        raleway: ["Raleway"]
      }
    }
  },
  plugins: []
};
