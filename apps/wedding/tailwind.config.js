const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ba9051',
        highlighted: '#a78148',
        outline: '#d0b388',
        text: 'rgb(18, 31, 56)',
      },
      fontSize: {
        base: '16px',
        lg: '18px',
        xl: '21px',
        '2xl': '24px',
        '3xl': ['30px', { lineHeight: '42px' }],
        '4xl': ['36px', { lineHeight: '54px' }],
        '5xl': ['48px', { lineHeight: '54px' }],
      },
      fontWeight: {
        normal: 300,
      },
      fontFamily: {
        sans: [
          'var(--font-lora)',
          'var(--font-noto-sans-thai)',
          ...fontFamily.sans,
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
