import React, { useState, useEffect } from 'react';

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
  // CORRECTION : Utilisation de import.meta.env.VITE_APP_STRAPI_API_URL pour la production
  const STRAPI_BACKEND_URL = import.meta.env.VITE_APP_STRAPI_API_URL;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Effectue une requête GET pour récupérer toutes les recettes depuis Strapi
        // L'API ID pour la collection 'recipie' est 'api::recipie.recipie'
        // Strapi génère un endpoint pluriel par défaut pour les collections
        const response = await fetch(`${STRAPI_BACKEND_URL}/api/recipies`); 

        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }

        const data = await response.json();
        // Strapi renvoie les données de collection sous la forme { data: [...], meta: {...} }
        // Vérifie si data.data est un tableau avant de le définir
        if (Array.isArray(data.data)) {
          setRecipes(data.data); 
        } else {
          // Log pour comprendre une structure de réponse inattendue
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
    <section className="py-16 px-6 md:px-12 bg-gray-50 rounded-xl mx-4 my-6 shadow-lg">
      <h2 className="text-4xl font-bold text-green-800 text-center mb-10">Nos Recettes Existantess</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {recipes.map((recipe) => {
          // Determine the correct object to extract attributes from
          // This handles cases where attributes might be directly on 'recipe' object
          // (e.g., for entries created directly in Strapi admin or older versions)
          // or nested under 'attributes' (standard Strapi API response).
          const itemAttributes = recipe.attributes || recipe;

          // Debugging log to see the resolved attributes
          console.log("Resolved itemAttributes:", itemAttributes);

          // Use itemAttributes.id for the key to ensure it exists
          // Enhanced check: ensure id is a number and not 0 or falsy if it implies an invalid entry.
          if (!itemAttributes || typeof itemAttributes.id !== 'number' || itemAttributes.id <= 0) {
            console.warn("Skipping malformed recipe (missing or invalid id/attributes):", recipe);
            return null; // Ignore malformed recipes
          }

          // Further validation for expected array types for ingredients and steps
          // If ingredients is a single object, wrap it in an array for consistent mapping
          const displayIngredients = Array.isArray(itemAttributes.ingredients)
            ? itemAttributes.ingredients
            : (itemAttributes.ingredients ? [itemAttributes.ingredients] : []); 

          // If steps is an array of objects, extract a 'value' property if present, otherwise assume string
          const displaySteps = Array.isArray(itemAttributes.steps)
            ? itemAttributes.steps
            : []; 

          return (
            <div key={itemAttributes.id} className="bg-white rounded-2xl shadow-xl border border-green-200 overflow-hidden">
              {/* Access properties via itemAttributes - no ?. needed as itemAttributes is now guaranteed to exist */}
              {itemAttributes.imageUrl && (
                <img
                  src={itemAttributes.imageUrl}
                  alt={itemAttributes.title || 'Image de recette'}
                  className="w-full h-48 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/CCCCCC/666666?text=Image+non+disponible"; }} // Fallback image
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
                  {displayIngredients.length > 0 ? (
                    displayIngredients.map((item, index) => (
                      <li key={index}>
                        {/* Access 'name' and 'quantity' or 'unit' from ingredient object */}
                        <span className="font-semibold">{item.name || 'Nom inconnu'}</span>: {item.quantity || (item.unit && item.quantity ? `${item.quantity} ${item.unit}` : 'Quantité inconnue')}
                      </li>
                    ))
                  ) : (
                    <li>Aucun ingrédient spécifié.</li>
                  )}
                </ul>

                <h4 className="text-xl font-bold text-gray-800 mb-2">Étapes :</h4>
                <ol className="list-decimal list-inside text-gray-700 space-y-1">
                  {displaySteps.length > 0 ? (
                    displaySteps.map((step, index) => (
                      <li key={index}>
                        {typeof step === 'string' ? step : (step.value || 'Étape inconnue')} {/* Handle step being an object with a 'value' property or a string */}
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
