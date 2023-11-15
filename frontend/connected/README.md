This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Dependencies to install
1. react-icons
2. tailwind-scrollbar-hide
3. axios
4. react-chartjs-2 
5. chart.js
6. browser-image-compression
7. body-parser
9. @headlessui/react
10. jsPDF


```bash
npm install axios tailwind-scrollbar-hide react-icons react-chartjs-2 chart.js browser-image-compression body-parser @headlessui/react jspdf --save
```


## Configuration Files

The following configuration files need to be added or modified:
1. next.config.js
2. tailwind.config.js


#### `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['dummyimage.com','upload.wikimedia.org','2456764.fs1.hubspotusercontent-na1.net', 'cdn-icons-png.flaticon.com']
    },
    reactStrictMode: false
}

module.exports = nextConfig
```

#### `tailwind.config.js`
```javascript
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
  plugins: [require('tailwind-scrollbar-hide')],
}
```