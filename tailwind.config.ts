import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#0B0D12',
        surface: '#12151C',
        surface2: '#181C25',
        steel: '#6E7480',
        mist: '#9AA0AC',
        signal: {
          DEFAULT: '#4C6FFF',
          dim: '#3450C4',
          glow: '#7C93FF',
        },
        ember: {
          DEFAULT: '#FF5A36',
          dim: '#C7431F',
        },
        paper: '#F3F4F7',
        line: 'rgba(243,244,247,0.08)',
        line2: 'rgba(243,244,247,0.14)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'clamp-hero': 'clamp(3rem, 9vw, 8.5rem)',
        'clamp-h1': 'clamp(2.25rem, 5vw, 4.5rem)',
        'clamp-h2': 'clamp(1.75rem, 3.2vw, 3rem)',
      },
      letterSpacing: {
        tightest2: '-0.045em',
        wide2: '0.22em',
      },
      backgroundImage: {
        'grid-fine':
          'linear-gradient(rgba(243,244,247,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(243,244,247,0.06) 1px, transparent 1px)',
        'radial-signal':
          'radial-gradient(circle at center, rgba(76,111,255,0.35) 0%, rgba(76,111,255,0) 70%)',
      },
      backgroundSize: {
        grid: '48px 48px',
        'grid-sm': '24px 24px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        marquee: 'marquee 32s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
