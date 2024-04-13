import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "main-bg": "#0B0B47",
        "sec-bg":"#0D192F",
        "3rd-bg": "#161C2C",
        "g-text": "#7A7A7A",
        "g-ancent-text": "#00B98E",
        "g-sec-text" : "#54595F",
        "g-pri-text": "#6EC1E4",
         "card-bg": "#14223C",
         "main-color":"#00B98E"
        
      },
        boxShadow: {
          '3xl': '0 40px 70px -15px rgba(0, 0, 0, 0.3)',
        },
      
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-poppins)'],
      },
    },

  },
  plugins: []
};
export default config;
