/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'md': '6px 6px 20px 0px #00000070',
      },
      w:{
        'd6' : 'calc(100% / 6)'
      }
    },
    
  },
  plugins: [],
}