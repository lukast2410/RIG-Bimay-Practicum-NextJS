module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'binus-blue': '#00a9e2',
        'binus-blue-100': 'rgba(0, 169, 226, 0.15)',
        'grey': '#ced4da'
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
    extend: {
      animation: ['motion-safe'],
      transform: ['hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  important: true
}
