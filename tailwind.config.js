/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#181818',
        secondary: '#121212',
        inputclr: '#FFFFFF',
        borderclr: '#B3B3B3'
      }    
    },
  },
  plugins: []
}; 
