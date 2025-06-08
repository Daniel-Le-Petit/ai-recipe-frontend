// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // Liste des fichiers où Tailwind doit chercher les classes CSS
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ceci est crucial pour scanner vos composants React
  ],
  theme: {
    extend: {}, // Ici, vous pouvez étendre les thèmes de Tailwind
  },
  plugins: [], // Ici, vous pouvez ajouter des plugins Tailwind
}