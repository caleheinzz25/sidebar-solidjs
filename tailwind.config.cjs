/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        nav: "#67e8f9", // cyan 300 
        navHover: "#a5f3fc", // cyan 200
        textHover: "#334155"
      }
    }
  },
  plugins: []
};
