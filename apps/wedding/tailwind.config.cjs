/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#015FB9",
      },
      fontSize: {
        base: "16px",
        lg: "18px",
        xl: "21px",
        "2xl": "24px",
        "3xl": ["30px", { lineHeight: "42px" }],
        "4xl": ["36px", { lineHeight: "54px" }],
        "5xl": ["48px", { lineHeight: "54px" }],
      },
      spacing: {
        15: "3.75rem",
        85: "21.25rem",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
