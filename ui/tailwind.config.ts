import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'facebook-blue': '#1877F2',
        'facebook-blue-hover': '#166FE5',
        'facebook-blue-active': '#1457B3',
      },
    },
  },
  plugins: [],
}
export default config

