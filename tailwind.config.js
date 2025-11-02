/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'vio-bg': '#0B0C10',
        'vio-accent': '#00ffff',
        'vio-purple': '#9d00ff'
      }
    },
  },
  plugins: [],
}
