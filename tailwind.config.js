// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Assurez-vous que cette police est importée dans votre CSS ou via Google Fonts si vous l'utilisez
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};