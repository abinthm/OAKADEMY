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
        'day-pink': {
          50: '#fdf6f6',
          100: '#f9e8e8',
          200: '#f4d1d1', // primary light pink
          300: '#e6bcbc',
          400: '#d69999',
          500: '#c07878',
          600: '#a55a5a',
          700: '#7b3737', // primary burgundy
          800: '#561f1f',
          900: '#3d1616',
        },
      },
    },
  },
  plugins: [],
};