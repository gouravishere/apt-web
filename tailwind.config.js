/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '320px',
      },
      colors: {
        primary: {
          50: '#FFF9EB',
          100: '#FFF2D6',
          200: '#FFE6AD',
          300: '#FED983',
          400: '#FECD5A',
          500: '#fedc60 ',
        },
        neutral: {
          0: '#F9FAFA',
          100: '#F9FAFB',
          200: '#E9EDF1',
          300: '#DFE5EC',
          400: '#CCD7E5',
          500: '#9FAFC6',
          600: '#64748B',
          700: '#475569',
          800: '#334155',
          900: '#051227',
        },
        semantic: {
          warning: {
            100: '#FEF0E7',
            200: '#F56F10',
          },
          error: {
            100: '#FFF1F2',
            200: '#E11D48',
          },
          success: {
            100: '#F0FDF4',
            200: '#22C55E',
          },
        },
      },
    },
  },
  plugins: [],
};
