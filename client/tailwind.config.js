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
            transform: 'translateX(-20%)',
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
          'text': '#78edff',
          'background': '#00161a',
          'primary': '#313f64',
          'secondary': '#1b2b37',
          'accent': '#111924',
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}
