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
    
      backgroundColor:{
        "lightgray":"var(--lightgray)",
        "muted":"#F4F5F6"
      },

      fontSize:{
        "title":"19px",
        "location":"17px"
      },
      textColor:{
    
        "dark":"var(--darkblue)",
        "muted":"var(--lightgray)"
      },

      borderColor:{
        "hovered":"var(--lightblue)"
      }
    },

  },
  plugins: [],
};
export default config;
