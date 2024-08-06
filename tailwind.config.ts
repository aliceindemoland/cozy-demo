// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default <Config>{
  content: [
    './**/*.vue',
    './node_modules/@storefront-ui/vue/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf7f2',
          100: '#f4ede0',
          200: '#e7d8c1',
          300: '#d8be99',
          400: '#cda87e',
          500: '#bc8753',
          600: '#ae7348',
          700: '#915d3d',
          800: '#754b37',
          900: '#5f3f2f',
        },
      },
    },
  },
};
