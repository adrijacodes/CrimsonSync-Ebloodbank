/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Alkatra: ["Alkatra","system-ui"],
        Itim: ["Itim", "cursive"]
      }
    },
  },
  plugins: [],
}