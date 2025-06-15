// frontend/src/components/Pages/UserLocationMapPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobeIcon } from '../Common/Icons';

const UserLocationMapPage = () => {
  const navigate = useNavigate();
  const [userLocations, setUserLocations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const STRAPI_BACKEND_URL = import.meta.env.VITE_APP_STRAPI_API_URL;

  useEffect(() => {
    const fetchUserLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        // Assurez-vous que l'endpoint correspond à celui défini dans votre contrôleur Strapi
        const response = await fetch(`${STRAPI_BACKEND_URL}/api/recipe-generator/user-locations`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        // Le backend renvoie un objet comme { totalUsers: ..., countries: ..., coordinates: [...] }
        setUserLocations(data); 
      } catch (err) {
        console.error("Erreur lors de la récupération des localisations utilisateurs:", err);
        setError("Impossible de charger les données de localisation. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    // N'exécutez le fetch que si l'URL du backend est disponible
    if (STRAPI_BACKEND_URL) {
      fetchUserLocations();
    } else {
      setError("URL du backend Strapi non configurée.");
      setLoading(false);
    }
  }, [STRAPI_BACKEND_URL]);

  if (loading) {
    return (
      <section id="user-location-map-section" className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">Localisation des Utilisateurs</h2>
        <p className="text-gray-700">Chargement des données de localisation...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="user-location-map-section" className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">Localisation des Utilisateurs</h2>
        <p className="text-red-600 font-semibold">{error}</p>
        <button onClick={() => navigate('/profile')} className="mt-4 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300 transition-colors">
          Retour au Profil
        </button>
      </section>
    );
  }

  // Vérifiez que userLocations et userLocations.coordinates existent et que coordinates est un tableau
  const hasCoordinates = userLocations && Array.isArray(userLocations.coordinates) && userLocations.coordinates.length > 0;

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
            {hasCoordinates ? (
              // Mappe sur userLocations.coordinates qui est l'array attendu
              userLocations.coordinates.map((location, index) => (
                // Pour l'exemple, nous utilisons des positions fixes.
                // Pour une carte réelle, il faudrait convertir lat/lon en positions pixel/pourcentage précises.
                <div 
                  key={index} 
                  className="absolute w-4 h-4 bg-red-500 rounded-full animate-pulse" 
                  // Utilisez des valeurs CSS fixes ou des calculs de positionnement plus avancés
                  // Ici, on utilise des valeurs statiques du mock pour illustrer la présence des points.
                  // Note: les valeurs `lat` et `lon` du mock backend sont des coordonnées géographiques réelles,
                  // et non des pourcentages pour CSS top/left. Ces valeurs statiques sont là pour l'exemple visuel.
                  style={{
                    top: `${[30, 50, 65, 40][index % 4]}%`, // Exemple de positionnement illustratif
                    left: `${[20, 50, 80, 70][index % 4]}%`  // Exemple de positionnement illustratif
                  }} 
                  title={`Utilisateurs à ${location.city}: ${location.users}`}
                ></div>
              ))
            ) : (
              <p>Aucune donnée de localisation disponible.</p>
            )}
        </div>
        <div className="mt-8 text-center text-gray-600">
          <p>Données actuelles: {userLocations?.totalUsers || 0} utilisateurs.</p>
          <p>Pays (mockés): {userLocations?.countries ? Object.entries(userLocations.countries).map(([country, count]) => `${country} (${count})`).join(', ') : 'N/A'}</p>
          <p>Les données de localisation réelles nécessiteraient une intégration backend spécifique (par exemple, via des adresses IP anonymisées).</p>
        </div>
      </div>
    </section>
  );
};

export default UserLocationMapPage;

