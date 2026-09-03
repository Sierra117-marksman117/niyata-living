import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mineral: {
          50: '#FAF9F6',
          100: '#F5F3EF',
          200: '#EAE6DF',
          300: '#DDD7CC',
          400: '#C7BEAF',
          500: '#A99D8B',
          600: '#7F7464',
          700: '#5A5144',
          800: '#38322A',
          900: '#1C1915',
        },
        charcoal: {
          DEFAULT: '#191919',
          light: '#2B2B2B',
          muted: '#525252',
          subtle: '#787878',
        },
        teak: {
          light: '#C49A6C',
          DEFAULT: '#9E6D38',
          dark: '#68451F',
        },
        walnut: {
          light: '#7A5B43',
          DEFAULT: '#4E3625',
          dark: '#2E1E13',
        },
        moss: {
          light: '#A3B18A',
          DEFAULT: '#588157',
          dark: '#344E41',
        },
        terracotta: {
          light: '#E07A5F',
          DEFAULT: '#C85A32',
          dark: '#933D1E',
        },
        accent: {
          vermilion: '#D33E2A',
          cobalt: '#1D4ED8',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
