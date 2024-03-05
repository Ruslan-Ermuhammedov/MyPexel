/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      md:"80rem",//1280
      xl:"102rem",//1640px
    },
    extend: {
      
    },
  },
  plugins: [],
}