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
          DEFAULT: '#1B2430',
          soft: '#2B3645',
        },
        paper: {
          DEFAULT: '#F2EEE4',
          dark: '#E8E1D1',
          line: '#C9C2AC',
        },
        oxblood: {
          DEFAULT: '#8B2635',
          dark: '#6E1E2A',
          light: '#A8394A',
        },
        slate: {
          accent: '#3F5C5A',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['"Source Sans 3"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(27,36,48,0.04) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
