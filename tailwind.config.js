// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default { // <-- Assurez-vous que c'est bien 'export default'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- TRÈS IMPORTANT : vérifier ce chemin
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], // ou autre police
        heading: ['"Playfair Display"', 'serif']
      }
    }
  },
  plugins: [],
}
