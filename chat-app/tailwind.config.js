module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        'md-2': {'raw': 'screen and (min-width: 720px) and (max-width: 1080px)'}
      }
    },
  },
  plugins: [],
};
