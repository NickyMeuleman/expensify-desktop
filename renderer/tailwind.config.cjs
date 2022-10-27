/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // paths here are from the project root somehow, not the renderer root
    "./renderer/index.html",
    "./renderer/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
