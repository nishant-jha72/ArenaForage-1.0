import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1554F5',
          'blue-hover': '#0F3FC7',
          navy: '#0A1E4D',
          cyan: '#00D9FF',
        },
        ink: {
          950: '#080C16',
          900: '#0B1220',
          800: '#121A2E',
          700: '#1A2540',
          600: '#26314F',
        },
      },
      fontFamily: {
        display: ['"Rajdhani"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(rgba(21,84,245,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(21,84,245,0.06) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(rgba(0,217,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '32px 32px',
      },
      clipPath: {
        panel: 'polygon(0 0, 100% 0, 100% 88%, 96% 100%, 0 100%)',
      },
      animation: {
        'pulse-live': 'pulse-live 1.6s ease-in-out infinite',
        marquee: 'marquee 22s linear infinite',
      },
      keyframes: {
        'pulse-live': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
