import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 0%)',
        foreground: 'hsl(0 0% 100%)',
        primary: {
          DEFAULT: 'hsl(262 83% 58%)',
          foreground: 'hsl(0 0% 100%)',
        },
        secondary: {
          DEFAULT: 'hsl(240 5% 15%)',
          foreground: 'hsl(0 0% 100%)',
        },
        accent: {
          DEFAULT: 'hsl(262 83% 58%)',
          foreground: 'hsl(0 0% 100%)',
        },
        muted: {
          DEFAULT: 'hsl(240 5% 10%)',
          foreground: 'hsl(240 5% 65%)',
        },
        border: 'hsl(240 6% 20%)',
        input: 'hsl(240 6% 20%)',
        ring: 'hsl(262 83% 58%)',
        card: {
          DEFAULT: 'hsl(240 5% 8%)',
          foreground: 'hsl(0 0% 100%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config