// src/components/Pages/FeatureUsagePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate
import { PieChartIcon, SparklesIcon, ShoppingCartIcon, PackageIcon, BookOpenIcon } from '../Common/Icons.jsx'; // Importe les icônes nécessaires

const FeatureUsagePage = ({ STRAPI_BACKEND_URL, isAdmin }) => { // Supprimé handleNavigate
  const navigate = useNavigate(); // Initialisation du hook de navigation
  const [featureUsageData, setFeatureUsageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAdmin) {
      const fetchFeatureUsage = async () => {
        try {
          // Remplacez cette URL par l'endpoint réel de votre backend Strapi pour l'utilisation des fonctionnalités
          const response = await fetch(`${STRAPI_BACKEND_URL}/api/recipe-generator/feature-usage`);
          if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
          }
          const data = await response.json();
          setFeatureUsageData(data);
        } catch (err) {
          setError(err.message);
          console.error("Erreur lors du chargement de l'utilisation des fonctionnalités:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchFeatureUsage();
    } else {
      setLoading(false);
      setError("Accès non autorisé. Vous devez être administrateur pour voir ces statistiques.");
    }
  }, [isAdmin, STRAPI_BACKEND_URL]);

  // Fonction pour obtenir le pourcentage et la description, avec fallback
  const getUsagePercentage = (featureKey) => featureUsageData?.[featureKey]?.percentage || 'N/A';
  const getUsageDescription = (featureKey) => featureUsageData?.[featureKey]?.description || 'Données non disponibles';


  return (
    <section className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg">
      <div className="flex items-center mb-6">
        {/* Utilisation de useNavigate pour le bouton de retour */}
        <button onClick={() => navigate('/profile')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">Utilisation des Fonctionnalités</h2>
      </div>
      <div className="max-w-6xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
        <p className="text-center text-gray-600 mb-6">Visualisez les fonctionnalités les plus populaires de votre application.</p>
        {loading && <p className="text-gray-700 text-center">Chargement des données d'utilisation...</p>}
        {error && <p className="text-red-600 font-medium text-center">{error}</p>}
        {!loading && !error && !isAdmin && (
          <p className="text-red-600 font-medium text-center">Vous n'avez pas les permissions d'administrateur pour voir ces statistiques.</p>
        )}
        {!loading && !error && featureUsageData && isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center"><SparklesIcon className="mr-2"/> Générer une Recette IA</h3>
                  <p className="text-4xl font-bold text-green-600">{getUsagePercentage('generateRecipeAI')}%</p>
                  <p className="text-gray-600">{getUsageDescription('generateRecipeAI')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-purple-700 mb-3 flex items-center"><ShoppingCartIcon className="mr-2"/> Rechercher une Recette existante</h3>
                  <p className="text-4xl font-bold text-purple-600">{getUsagePercentage('searchExistingRecipe')}%</p>
                  <p className="text-gray-600">{getUsageDescription('searchExistingRecipe')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-blue-700 mb-3 flex items-center"><PackageIcon className="mr-2"/> Explorer les Recettes Inspirantes</h3>
                  <p className="text-4xl font-bold text-blue-600">{getUsagePercentage('exploreInspirationalRecipes')}%</p>
                  <p className="text-gray-600">{getUsageDescription('exploreInspirationalRecipes')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-orange-700 mb-3 flex items-center"><BookOpenIcon className="mr-2"/> Voir Mes Recettes</h3>
                  <p className="text-4xl font-bold text-orange-600">{getUsagePercentage('viewMyRecipes')}%</p>
                  <p className="text-gray-600">{getUsageDescription('viewMyRecipes')}</p>
              </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureUsagePage;

