import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        light: '#fff',
        lighter: '#eaeef2',
        dark: '#000',
        darker: '#111',
      }
    },
  },

  plugins: [
    // require('daisyui'),
  ],
  darkMode: 'selector',
} satisfies Config;
