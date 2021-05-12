module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'binus-blue': '#00a9e2',
      },
      maxWidth: {
        'screen-2xl': '1460px'
      },
      keyframes: {
        blink: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 0.5s linear infinite alternate',
      },
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
