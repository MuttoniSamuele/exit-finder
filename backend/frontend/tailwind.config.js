/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "xs": "580px"
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dim"],
  },
}
