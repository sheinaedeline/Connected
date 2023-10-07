/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        blue: {
          100: '#DCECF6',
          300: "#B1D1E6",
          500: "#57A2D4",
          600: "#4095CF",
          900: '#137DC5',
        },
        teal: {
          900: '#42D5F3',
        },
        green: {
          900: "#24D193",
        },
      },
    },
  },
  plugins: [],
}
