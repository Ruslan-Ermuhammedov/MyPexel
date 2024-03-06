/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm:"30rem",//480px
      md:"80rem",//1280
      xl:"102rem",//1640px
      xl2:"120rem",//1920px
    },
    extend: {
      
    },
  },
  plugins: [],
}