/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff3131',
        secondary: 'orange',
        third: 'grey'
      }
    },
  },
  plugins: [],
}

