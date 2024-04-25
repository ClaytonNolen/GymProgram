/** @type {import('tailwindcss').Config} */
// Custom colors created with tailwind css are stored here
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#181818',
        secondary: '#121212',
        sugold: '#FFCD00',
        borderclr: '#B3B3B3',
        cream: "#f8f1e5"
      }    
    },
  },
  plugins: []
};
