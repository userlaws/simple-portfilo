/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(249, 250, 251)', // Background color
        foreground: 'rgb(17, 24, 39)', // Foreground color
      },
    },
  },
  plugins: [],
}
