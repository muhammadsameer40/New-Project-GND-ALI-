/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf8e7',
          100: '#faefc4',
          200: '#f4d878',
          300: '#ecc84a',
          400: '#e0b020',
          500: '#C9A84C',
          600: '#D4AF37',
          700: '#B8860B',
          800: '#8b6508',
          900: '#6b4e06',
        },
        cream: {
          50: '#fdfaf4',
          100: '#faf4e4',
          200: '#f5e9c8',
        },
        charcoal: {
          900: '#0d0d0d',
          800: '#1a1a1a',
          700: '#2a2a2a',
          600: '#3a3a3a',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        ticker: 'ticker 30s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
