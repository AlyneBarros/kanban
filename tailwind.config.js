/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require('tailwind-scrollbar'),
    require('@tailwindcss/forms'),
    
    
  ],
  resolve: {
    fallback: {
      "timers": false
    }
  }
};
