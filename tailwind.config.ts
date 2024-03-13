import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
          600:'#494c4f',
          200: '#e1dede',
        },
        orange:{ 
          600: '#e1500c',
          400: '#ff6117',
          500:'#F45C15',
        },
      },
    },
  },
  plugins: [],
};
export default config;
