/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#111111',
          soft: '#2C2C2C',
          muted: '#6B6B6B',
        },
        paper: {
          DEFAULT: '#FAFAF8',
          warm: '#F5F2ED',
          dark: '#EAE7E0',
          line: '#DEDAD3',
        },
        gold: {
          DEFAULT: '#C9A96E',
          dark: '#A8894E',
          light: '#E2C99A',
        },
        charcoal: {
          DEFAULT: '#1C1C1C',
          soft: '#2A2A2A',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'subtle-grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
