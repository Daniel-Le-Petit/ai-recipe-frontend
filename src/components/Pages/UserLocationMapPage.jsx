// src/components/Pages/UserLocationMapPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate
import { GlobeIcon } from '../Common/Icons'; // Importe les icônes nécessaires

const UserLocationMapPage = ({ STRAPI_BACKEND_URL, isAdmin }) => { // Supprimé handleNavigate
  const navigate = useNavigate(); // Initialisation du hook de navigation
  const [userLocations, setUserLocations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAdmin) {
      const fetchUserLocations = async () => {
        try {
          // Remplacez cette URL par l'endpoint réel de votre backend Strapi pour les localisations des utilisateurs
          const response = await fetch(`${STRAPI_BACKEND_URL}/api/recipe-generator/user-locations`);
          if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
          }
          const data = await response.json();
          setUserLocations(data);
        } catch (err) {
          setError(err.message);
          console.error("Erreur lors du chargement des localisations utilisateurs:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchUserLocations();
    } else {
      setLoading(false);
      setError("Accès non autorisé. Vous devez être administrateur pour voir cette carte.");
    }
  }, [isAdmin, STRAPI_BACKEND_URL]);

  return (
    <section className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg">
      <div className="flex items-center mb-6">
        {/* Utilisation de useNavigate pour le bouton de retour */}
        <button onClick={() => navigate('/profile')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">Localisation des Utilisateurs</h2>
      </div>
      <div className="max-w-6xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
        <p className="text-center text-gray-600 mb-6">Visualisez l'origine géographique de vos utilisateurs.</p>
        {loading && <p className="text-gray-700 text-center">Chargement de la carte...</p>}
        {error && <p className="text-red-600 font-medium text-center">{error}</p>}
        {!loading && !error && !isAdmin && (
          <p className="text-red-600 font-medium text-center">Vous n'avez pas les permissions d'administrateur pour voir cette carte.</p>
        )}
        {!loading && !error && userLocations && isAdmin && (
          <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 overflow-hidden relative">
              <img
                src="https://placehold.co/800x400/D1D5DB/6B7280?text=Carte+du+Monde+(Placeholder)"
                alt="Carte du monde"
                className="w-full h-full object-cover"
              />
              {/* Exemple de marqueurs basés sur des données mockées */}
              {userLocations.map((loc, index) => (
                <div 
                  key={index}
                  className="absolute w-4 h-4 bg-red-500 rounded-full animate-pulse" 
                  style={{top: `${loc.lat * 0.5 + 50}%`, left: `${loc.lon * 0.5 + 50}%`}} // Simplifié pour la démo
                  title={`${loc.city}, ${loc.country} (${loc.users} users)`}
                ></div>
              ))}
          </div>
        )}
        <p className="text-gray-600 mt-4">
          Cette carte afficherait les localisations (approximatives) de vos utilisateurs.
        </p>
      </div>
    </section>
  );
};

export default UserLocationMapPage;

