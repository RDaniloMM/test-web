import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        WhiteCalido: '#EAEAEB',
  			BlackCalido: '#141719',
  			BlackOscuro: '#0E0F11',
			  GrayPalido: '#6D6D6D',
  			GrayCalido: '#808284',
			  GrayOscuro: '#2A2C31',
  			BorderColor: '#262626',
  			VioletCalido: '#5A65CA',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
