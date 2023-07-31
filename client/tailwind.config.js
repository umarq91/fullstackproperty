/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#F5385D',
        test: '#FDE8E9',
        form:'#D0CFCF'
      }
    },
  },
  plugins: [],
}