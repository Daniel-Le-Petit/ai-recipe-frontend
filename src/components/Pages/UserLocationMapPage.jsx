// src/components/Pages/UserLocationMapPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate
import { GlobeIcon } from '../Common/Icons'; // Importez les icônes

const UserLocationMapPage = () => { // Plus besoin de handleNavigate en prop
  const navigate = useNavigate(); // Initialisation du hook navigate

  return (
    <section id="user-location-map-section" className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/profile')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">Localisation des Utilisateurs</h2>
      </div>
      <div className="max-w-6xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
        <p className="text-center text-gray-600 mb-6">Visualisez l'origine géographique de vos utilisateurs.</p>
        <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 overflow-hidden relative">
            <img
              src="https://placehold.co/800x400/D1D5DB/6B7280?text=Carte+du+Monde+(Placeholder)"
              alt="Carte du monde"
              className="w-full h-full object-cover"
            />
            <div className="absolute w-4 h-4 bg-red-500 rounded-full animate-pulse" style={{top: '30%', left: '20%'}} title="Utilisateurs en Amérique du Nord"></div>
            <div className="absolute w-4 h-4 bg-red-500 rounded-full animate-pulse" style={{top: '50%', left: '50%'}} title="Utilisateurs en Europe"></div>
            <div className="absolute w-4 h-4 bg-red-500 rounded-full animate-pulse" style={{top: '65%', left: '80%'}} title="Utilisateurs en Asie"></div>
        </div>
        <div className="mt-8 text-center text-gray-600">
          <p>Les données de localisation réelles nécessiteraient une intégration backend spécifique (par exemple, via des adresses IP anonymisées).</p>
        </div>
      </div>
    </section>
  );
};

export default UserLocationMapPage;

