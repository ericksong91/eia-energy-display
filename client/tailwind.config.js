/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light': {
          'text': '#3a3230',
          'background': '#fcfbf8',
          'primary': '#81caa2',
          'secondary': '#94d297',
          'accent': '#81caa2',
        },
        'dark': {
          "main": "#12486B",
          "seco": "#419197",
          "tert": "#78D6C6",
          "quat": "#F5FCCD",
        },
      },
    },
  },
  plugins: [],
}

// colors: {
//   'light': {
//     "main": "#F6F4EB",
//     "seco": "#91C8E4",
//     "tert": "#749BC2",
//     "quat": "#4682A9",
//   },
//   'dark': {
//     "main": "#12486B",
//     "seco": "#419197",
//     "tert": "#78D6C6",
//     "quat": "#F5FCCD",
//   }, Old colors