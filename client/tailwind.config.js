const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          "0%": {
            opacity: 0,
            transform: 'translateX(-100%)',
          },
          "100%": {
            opacity: 1,
            transform: 'translateX(0%)',
          },
        },
      },
      animation: {
        appear: "appear 1s ease-in-out"
      },
      colors: {
        'light': {
          'text': '#365D63',
          'background': '#FBFFE4',
          'primary': '#B3D8A8',
          'secondary': '#FBFFE4',
          'accent': '#A3D1C6',
        },
        'dark': {
          'text': '#365D63',
          'background': '#FBFFE4',
          'primary': '#B3D8A8',
          'secondary': '#FBFFE4',
          'accent': '#A3D1C6',
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
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