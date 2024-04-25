/** @type {import('tailwindcss').Config} */
// Custom colors created with tailwind css are stored here
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#3a3a3c',
        secondary: '#1c1c1e',
        sugold: '#FFCD00',
        borderclr: '#B3B3B3',
        cream: "#f8f1e5"
      }    
    },
  },
  plugins: []
}; 
