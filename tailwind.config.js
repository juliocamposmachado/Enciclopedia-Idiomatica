/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        night: {
          950: '#030712',
          900: '#060B18',
          850: '#0A1122',
          800: '#0E1630',
          700: '#16204a',
          600: '#1E2B5E',
        },
        cyan: {
          glow: '#22D3EE',
        },
      },
      boxShadow: {
        glow: '0 0 24px rgba(34,211,238,0.15)',
        card: '0 8px 32px rgba(0,0,0,0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 7s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
