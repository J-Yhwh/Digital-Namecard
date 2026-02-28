
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lilac: {
          50: '#f5f0ff',
          100: '#ede5ff',
          200: '#e0d4ff',
          300: '#d1c0ff',
          400: '#b9a0ff',
          500: '#a080ff',
          600: '#8c66ff',
          700: '#734F96',
          800: '#6633ff',
          900: '#4d1aff'
        }
      }
    }
  },
  plugins: [],
}