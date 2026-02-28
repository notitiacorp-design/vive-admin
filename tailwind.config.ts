import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import animatePlugin from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx,mdx}',
    './lib/**/*.{ts,tsx,js,jsx,mdx}',
    './pages/**/*.{ts,tsx,js,jsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        /* ── VIVE core tokens ── */
        vive: {
          bg: {
            DEFAULT: '#0A0A0F',
            secondary: '#111118',
          },
          surface: {
            DEFAULT: '#1C1C28',
            hover: '#22223200',
          },
          border: {
            DEFAULT: '#2A2A38',
            subtle: '#1F1F2C',
            strong: '#3A3A50',
          },
          text: {
            primary: '#F2F2F8',
            secondary: '#A8A8C0',
            muted: '#6B6B85',
            inverse: '#0A0A0F',
          },
          accent: {
            DEFAULT: '#3D8BFF',
            hover: '#5A9EFF',
            muted: '#1A3D70',
            foreground: '#FFFFFF',
          },
          success: {
            DEFAULT: '#22C55E',
            muted: '#14532D',
          },
          warning: {
            DEFAULT: '#F59E0B',
            muted: '#451A03',
          },
          danger: {
            DEFAULT: '#EF4444',
            muted: '#450A0A',
          },
          info: {
            DEFAULT: '#06B6D4',
            muted: '#083344',
          },
        },

        /* ── shadcn/ui semantic tokens (mapped to VIVE palette) ── */
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
      },

      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },

      boxShadow: {
        'vive-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
        'vive-md': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)',
        'vive-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -4px rgba(0, 0, 0, 0.6)',
        'vive-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.7)',
        'vive-accent': '0 0 0 1px rgba(61, 139, 255, 0.3), 0 4px 16px rgba(61, 139, 255, 0.15)',
        'vive-glow': '0 0 24px rgba(61, 139, 255, 0.25)',
        'vive-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'vive-grid': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 0h1v40H0zM40 0h1v40h-1zM0 0h40v1H0zM0 40h40v1H0z' fill='%232A2A38' fill-opacity='.4'/%3E%3C/svg%3E\")",
        'vive-noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
        'vive-surface-gradient': 'linear-gradient(135deg, #1C1C28 0%, #16161F 100%)',
        'vive-accent-gradient': 'linear-gradient(135deg, #3D8BFF 0%, #6A5AFF 100%)',
      },

      keyframes: {
        /* shadcn/ui built-ins */
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        /* VIVE custom */
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'slide-in-from-top': {
          from: { transform: 'translateY(-8px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-from-bottom': {
          from: { transform: 'translateY(8px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-8px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(8px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'scale-in': {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        'scale-out': {
          from: { transform: 'scale(1)', opacity: '1' },
          to: { transform: 'scale(0.95)', opacity: '0' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '0.4' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'count-up': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },

      animation: {
        /* shadcn/ui */
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        /* VIVE */
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.2s ease-in',
        'slide-in-from-top': 'slide-in-from-top 0.25s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.25s ease-out',
        'slide-in-from-left': 'slide-in-from-left 0.25s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.25s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'scale-out': 'scale-out 0.2s ease-in',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'count-up': 'count-up 0.4s ease-out',
      },

      transitionTimingFunction: {
        'vive': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'vive-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'vive-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },

      transitionDuration: {
        '50': '50ms',
        '250': '250ms',
        '400': '400ms',
      },

      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },

      typography: {
        vive: {
          css: {
            '--tw-prose-body': '#A8A8C0',
            '--tw-prose-headings': '#F2F2F8',
            '--tw-prose-links': '#3D8BFF',
            '--tw-prose-bold': '#F2F2F8',
            '--tw-prose-code': '#3D8BFF',
            '--tw-prose-borders': '#2A2A38',
          },
        },
      },
    },
  },
  plugins: [
    animatePlugin,
    /* Optional peer plugins — install as needed:
       require('@tailwindcss/typography'),
       require('@tailwindcss/forms'),
       require('@tailwindcss/aspect-ratio'),
    */
  ],
} satisfies Config

export default config
