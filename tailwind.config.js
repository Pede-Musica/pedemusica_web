/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E9A632',
        secondary: '#260d11',
        third: 'grey',
        background: '#f3ebea'
      }
    },
  },
  plugins: [],
}

