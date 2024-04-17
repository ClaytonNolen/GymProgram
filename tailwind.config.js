/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#333333', // #272732
        secondary: '#181818', // #2B2D38
        inputclr: '#ffbf00', // #23252F
        borderclr: '#ffbf00' // #464856
      }    
    },
  },
  plugins: []
};
