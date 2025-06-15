// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Important: notez le '/client'
import App from './App.jsx'; // Assurez-vous que le chemin vers App.jsx est correct

// Récupère l'élément HTML où l'application React sera montée
const rootElement = document.getElementById('root');

// Vérifie si l'élément root existe avant d'essayer de monter l'application
if (rootElement) {
  // Crée un root React et y rend l'application en mode strict pour le développement
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error("L'élément avec l'ID 'root' est introuvable dans le document HTML. L'application React ne peut pas être montée.");
}

