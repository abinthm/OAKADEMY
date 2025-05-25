/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Cormorant Garamond', 'serif'],
      },
      colors: {
        'primary': {
          50: '#F5F5FA',
          100: '#E8E9F4',
          200: '#D1D2E9',
          300: '#A7A9D4',
          400: '#7D80BE',
          500: '#3B3D87', // main color
          600: '#2F3169',
          700: '#23244C',
          800: '#17182F',
          900: '#0B0C17',
        },
      },
    },
  },
  plugins: [],
};