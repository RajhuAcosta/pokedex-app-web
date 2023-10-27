/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "xxxs": "320px",
        "xxs": "360px",
        "xsm": "450px",
        "csm": "515px",
      }
    },
  },
  plugins: [],
}

