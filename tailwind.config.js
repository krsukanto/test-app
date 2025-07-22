/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./styles/**/*.{js,jsx,ts,tsx,css}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#181C2E',
        success: '#078807',
        error: '#D32F2F',
        'dark-100': '#141414',
        'gray-100': '#757575',
        'white-100': '#F5F5F5',
      },
      fontFamily: {
        'quicksand': ['Quicksand'],
        'quicksand-medium': ['Quicksand-Medium'],
        'quicksand-bold': ['Quicksand-Bold'],
      },
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
}
