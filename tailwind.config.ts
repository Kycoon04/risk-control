import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    './node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(at bottom right, var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: '#232A3C',
        medium: '#293245',
        transparent: 'transparent',
        white: '#ffffff',
        black: '#000',
        gray: {
          1000: '#131313',
          900: '#0a0a0a',
          800: '#333539',
          600: '#494c4f',
          200: '#30363D',
          100: '#D9D9D9',
          50: '#B8B8B8'
        },
        blue: {
          1000: '#161B22',
        },
        orange: {
          600: '#e1500c',
          400: '#ff6117',
          500: '#F45C15',

        },
        purple: {
          1000: "#120D17",
          700: "#150f1a",
          500: "#27173F",
          450: '#3a1d63',
          400: '#422171'
        }
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
export default config;
