const colors = require('tailwindcss/colors')


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'mainColor' : '#6D9EEB',
      'darkColor' : '#0D1117',
      'secondColor' : '#1155CC',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      red: colors.red,
      green: colors.green,
      yellow: colors.yellow,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    }
  },
  plugins: [],
}