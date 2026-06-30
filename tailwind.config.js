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
          DEFAULT: '#000000',
          soft: '#262626',
          muted: '#737373',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          warm: '#F5F5F5',
          dark: '#E5E5E5',
          line: '#E5E5E5',
        },
        gold: {
          DEFAULT: '#000000',
          dark: '#000000',
          light: '#737373',
        },
        oxblood: {
          DEFAULT: '#000000',
          dark: '#171717',
          light: '#737373',
        },
        charcoal: {
          DEFAULT: '#000000',
          soft: '#171717',
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
