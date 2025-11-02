/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        viora: {
          bg: "#0B0C10",
          cyan: "#00ffff",
          violet: "#9d00ff"
        }
      },
    },
  },
  plugins: [],
};
