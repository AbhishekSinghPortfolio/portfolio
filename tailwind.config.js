/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#060608',
          900: '#0a0a0f',
          800: '#111118',
          700: '#18181f',
          600: '#1e1e28',
          500: '#252530',
        },
        gold: {
          50:  '#fdf9ed',
          100: '#f9eecc',
          200: '#f2d98a',
          300: '#e8c04a',
          400: '#d4a827',
          500: '#b8911a',
          600: '#9a7614',
          700: '#7a5c0f',
          800: '#5e450c',
          900: '#3f2e08',
        },
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(184,145,26,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(184,145,26,0)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f2d98a 0%, #d4a827 40%, #b8911a 70%, #f2d98a 100%)',
        'gold-shine': 'linear-gradient(90deg, #b8911a, #f2d98a, #e8c04a, #b8911a)',
        'obsidian-gradient': 'linear-gradient(160deg, #0a0a0f 0%, #111118 50%, #060608 100%)',
        'card-gradient': 'linear-gradient(145deg, #111118 0%, #18181f 100%)',
      },
    },
  },
  plugins: [],
};
