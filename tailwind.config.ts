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
        "gradient-radial": "radial-gradient(at bottom right, var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
          200: '#30363D',
          100:'#D9D9D9'
        },
        orange:{ 
          600: '#e1500c',
          400: '#ff6117',
          500:'#F45C15',
          
        },
        purple:{
          1000:"#120D17",
          700:"#150f1a",
          500:"#27173F",
          400:'#422171'
        }
      },
    },
  },
  plugins: [],
};
export default config;
