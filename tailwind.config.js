/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#808083',
        secondary: '#000000',
        inputclr: '#FFCD00',
        borderclr: '#23252F'
      }    
    },
  },
  plugins: []
};
