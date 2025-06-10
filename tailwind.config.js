// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // C'est la ligne la plus cruciale. Elle doit scanner tous vos fichiers JS, TS, JSX, TSX
    "./src/**/*.{js,ts,jsx,tsx}",
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