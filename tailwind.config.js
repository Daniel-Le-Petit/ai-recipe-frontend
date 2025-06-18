// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- TRÈS IMPORTANT : S'assurer que tous vos fichiers de composants sont inclus ici
  ],
  theme: {
    extend: {
      fontFamily: {
        // S'assurer que cette police est définie si vous l'utilisez dans body {}
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
