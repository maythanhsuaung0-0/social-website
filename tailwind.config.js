module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        '200': '200px',
        '250': '250px'
      },
      gridTemplateColumns: {
        'responsive': 'repeat(auto-fit,minmax(200px,1fr))',
      },
      spacing: {
        '17': '72px'
      },
      backgroundColor: {
        'theme': '#004583'
      },
      colors: {
        'theme': '#004583'
      },
      borderRadius: {
        'circle': '50%',
      },
      borderWidth: {
        '1': '1px',
      },
      zIndex: {
        '-1': '-1'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
