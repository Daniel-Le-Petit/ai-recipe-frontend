import React, { useState, useEffect } from 'react';
// Importez les icônes nécessaires depuis le bon chemin (CHEMIN MIS À JOUR)
import { SparklesIcon, ShoppingCartIcon, PackageIcon, BookOpenIcon, HomeIcon, LightbulbIcon, BrainIcon, UserIcon, BellIcon, HelpCircleIcon, SettingsIcon, BarChartIcon, GlobeIcon, PieChartIcon, ChevronLeftIcon, ChevronRightIcon, KitchenRobotIcon, CheckCircleIcon } from './components/Common/Icons';


// Icône de chargement (Spinner)
const SpinnerIcon = () => (
  <svg className="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// Composant RecipeList pour afficher les recettes
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]); // État pour stocker la liste des recettes
  const [loading, setLoading] = useState(true); // État de chargement des données
  const [error, setError] = useState(null); // État pour les erreurs

  // URL de votre backend Strapi, lue depuis la variable d'environnement
  const STRAPI_BACKEND_URL = import.meta.env.VITE_APP_STRAPI_API_URL;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Effectue une requête GET pour récupérer toutes les recettes depuis Strapi
        const response = await fetch(`${STRAPI_BACKEND_URL}/api/recipies`); 

        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }

        const data = await response.json();
        // Strapi renvoie les données de collection sous la forme { data: [...], meta: {...} }
        if (Array.isArray(data.data)) {
          setRecipes(data.data); 
        } else {
          console.error("La réponse de l'API /api/recipies n'est pas un tableau de données attendu:", data);
          setError("Structure de données inattendue reçue du serveur.");
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des recettes:", err);
        setError("Erreur lors du chargement des recettes. Veuillez réessayer.");
      } finally {
        setLoading(false); // Désactive le chargement une fois la requête terminée
      }
    };

    fetchRecipes();
  }, []); // Le tableau vide assure que l'effet ne s'exécute qu'une seule fois au montage du composant

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <SpinnerIcon />
        <p className="ml-3 text-lg text-gray-700">Chargement des recettes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold p-4">
        <p>{error}</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center text-gray-600 p-4">
        <p>Aucune recette trouvée pour le moment.</p>
      </div>
    );
  }

  return (
    <section className="py-8 px-6 md:px-8 bg-gray-50 rounded-xl mx-auto my-6 shadow-lg max-w-6xl">
      {/* Suppression du titre ici pour éviter la duplication avec RecipesOverviewPage */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => {
          const itemAttributes = recipe.attributes || recipe;

          if (!itemAttributes || typeof itemAttributes.id !== 'number' || itemAttributes.id <= 0) {
            console.warn("Skipping malformed recipe (missing or invalid id/attributes):", recipe);
            return null; // Ignore malformed recipes
          }

          // Parsing des ingrédients et des étapes qui sont stockés en JSON string dans Strapi
          let ingredientsParsed = [];
          try {
            ingredientsParsed = itemAttributes.ingredients ? JSON.parse(itemAttributes.ingredients) : [];
          } catch (e) {
            console.error("Erreur de parsing des ingrédients pour la recette", itemAttributes.id, ":", e);
            ingredientsParsed = [];
          }

          let stepsParsed = [];
          try {
            stepsParsed = itemAttributes.steps ? JSON.parse(itemAttributes.steps) : [];
          } catch (e) {
            console.error("Erreur de parsing des étapes pour la recette", itemAttributes.id, ":", e);
            stepsParsed = [];
          }

          return (
            <div key={itemAttributes.id} className="bg-white rounded-2xl shadow-xl border border-green-200 overflow-hidden">
              {itemAttributes.imageUrl && (
                <img
                  src={itemAttributes.imageUrl}
                  alt={itemAttributes.title || 'Image de recette'}
                  className="w-full h-48 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/CCCCCC/666666?text=Image+non+disponible"; }}
                />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-3">{itemAttributes.title || 'Titre inconnu'}</h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Durée :</span> {itemAttributes.duration || 'N/A'}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Difficulté :</span> {itemAttributes.difficulty || 'N/A'}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-semibold">Personnes :</span> {itemAttributes.numPeople || 'N/A'}
                </p>

                <h4 className="text-xl font-bold text-gray-800 mb-2">Ingrédients :</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                  {ingredientsParsed.length > 0 ? (
                    ingredientsParsed.map((item, index) => (
                      <li key={index}>
                        <span className="font-semibold">{item.name || 'Nom inconnu'}</span>: {item.quantity || (item.unit && item.quantity ? `${item.quantity} ${item.unit}` : 'Quantité inconnue')}
                      </li>
                    ))
                  ) : (
                    <li>Aucun ingrédient spécifié.</li>
                  )}
                </ul>

                <h4 className="text-xl font-bold text-gray-800 mb-2">Étapes :</h4>
                <ol className="list-decimal list-inside text-gray-700 space-y-1">
                  {stepsParsed.length > 0 ? (
                    stepsParsed.map((step, index) => (
                      <li key={index}>
                        {typeof step === 'string' ? step : (step.value || 'Étape inconnue')}
                      </li>
                    ))
                  ) : (
                    <li>Aucune étape spécifiée.</li>
                  )}
                </ol>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecipeList;

