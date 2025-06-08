// frontend/src/App.jsx
import { useState } from 'react';
// L'importation de './index.css' a été supprimée.
// Assurez-vous que TailwindCSS est chargé globalement dans votre environnement (ex: via un CDN dans l'HTML).

/**
 * @typedef {object} Ingredient
 * @property {string} name - Le nom de l'ingrédient (ex: "Nouilles de riz")
 * @property {string} quantity - La quantité de l'ingrédient (ex: "200g")
 */

/**
 * @typedef {object} Recipe
 * @property {string} title - Le titre de la recette (ex: "Nouilles sautées aux légumes")
 * @property {string} duration - La durée de préparation (ex: "25 minutes")
 * @property {Ingredient[]} ingredients - Tableau d'objets ingrédients
 * @property {string[]} steps - Tableau des étapes de préparation
 */

function App() {
  // État pour stocker les préférences de l'utilisateur dans le formulaire
  const [preferences, setPreferences] = useState({
    cuisineType: '',
    servings: 2,
    maxDuration: 60,
    difficulty: 'facile',
    allergies: '', // Ce champ sera utilisé pour les "ingrédients" envoyés au backend pour le test
    maxIngredients: 10,
    goal: '',
    robotCompatible: false,
  });
  // État pour stocker la recette générée par l'IA
  /** @type {Recipe | null} */
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  // États pour gérer le chargement et les erreurs lors de l'appel API
  const [loading, setLoading] = useState(false);
  /** @type {string | null} */
  const [error, setError] = useState(null);

  // URL de votre backend Strapi.
  // Défini directement pour éviter les problèmes avec import.meta.env dans cet environnement.
  //const STRAPI_BACKEND_URL = 'http://localhost:1338'; 
  //const STRAPI_BACKEND_URL = 'https://aifb-backend-dev.loca.lt'; 
  const STRAPI_BACKEND_URL = 'https://aifb-backend.onrender.com'; // REMPLACEZ PAR L'URL DE VOTRE BACKEND DÉPLOYÉ
  // Gère les changements dans les champs du formulaire et met à jour l'état 'preferences'
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      // Cas spécifique pour les cases à cocher
      setPreferences(prev => ({ ...prev, [name]: e.target.checked }));
    } else {
      // Cas général pour les champs texte, nombre, select
      setPreferences(prev => ({ ...prev, [name]: value }));
    }
  };

  // Gère la soumission du formulaire pour appeler l'API de génération de recettes
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut du formulaire
    setLoading(true);    // Active l'état de chargement
    setError(null);      // Réinitialise les erreurs précédentes
    setGeneratedRecipe(null); // Efface la recette précédente

    try {
      // --- LOGIQUE POUR PRÉPARER LES DONNÉES À ENVOYER AU BACKEND ---
      // Votre backend attend un objet avec une clé 'ingredients' qui est un tableau de chaînes.
      // Nous prenons le champ 'allergies' du formulaire (qui est une chaîne séparée par des virgules)
      // et le transformons en tableau d'ingrédients.
      const dataToSend = {
        ingredients: preferences.allergies
                         .split(',') // Divise la chaîne par les virgules
                         .map(item => item.trim()) // Nettoie les espaces autour de chaque ingrédient
                         .filter(item => item.length > 0) // Supprime les éléments vides résultant de virgules consécutives ou finales
      };

      // Si vous voulez que d'autres préférences (cuisineType, duration, etc.) soient prises en compte par le LLM,
      // vous devrez modifier la logique de prompt dans votre contrôleur Strapi
      // pour utiliser ces champs, et les inclure dans 'dataToSend'.
      // Exemple: dataToSend.cuisineType = preferences.cuisineType;

      // Effectue l'appel POST à votre API Strapi
      const response = await fetch(`${STRAPI_BACKEND_URL}/api/recipe-generator/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indique que le corps de la requête est du JSON
        },
        body: JSON.stringify(dataToSend), // Convertit l'objet 'dataToSend' en chaîne JSON
      });

      // Vérifie si la réponse n'est pas OK (statut HTTP 4xx ou 5xx)
      if (!response.ok) {
        const errorData = await response.json(); // Tente de lire les détails de l'erreur
        throw new Error(errorData.error?.message || `Erreur HTTP! Statut: ${response.status}`);
      }

      // Lit la réponse JSON de l'API
      const data = await response.json();
      
      // Votre backend (en mode mock) renvoie un objet comme { recipe: {...} }.
      // Nous accédons donc à 'data.recipe' pour obtenir l'objet de recette.
      if (data.recipe) {
        // Ensure ingredients and steps are arrays, even if empty
        setGeneratedRecipe({
            ...data.recipe,
            ingredients: data.recipe.ingredients || [], // Fallback to empty array
            steps: data.recipe.steps || [] // Fallback to empty array
        });
      } else {
        // Fallback au cas où la structure de la réponse de l'API réelle serait différente
        // Ensure ingredients and steps are arrays here too
        setGeneratedRecipe({
            ...data,
            ingredients: data.ingredients || [],
            steps: data.steps || []
        });
      }
      
    } catch (err) {
      // Capture et affiche les erreurs
      setError(err.message || "Échec de la génération de recette.");
      console.error("Erreur lors de la génération de recette :", err);
    } finally {
      setLoading(false); // Désactive l'état de chargement
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">AI & Fines Herbes - Générateur de Recettes</h1>

      {/* Formulaire de préférences */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Vos Préférences</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="cuisineType" className="block text-sm font-medium text-gray-700">Type de cuisine</label>
            <input type="text" name="cuisineType" id="cuisineType" value={preferences.cuisineType} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Ex: Asiatique, Méditerranéenne" />
          </div>
          <div>
            <label htmlFor="servings" className="block text-sm font-medium text-gray-700">Nombre de personnes</label>
            <input type="number" name="servings" id="servings" value={preferences.servings} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" min="1" />
          </div>
          <div>
            <label htmlFor="maxDuration" className="block text-sm font-medium text-gray-700">Durée maximale (min)</label>
            <input type="number" name="maxDuration" id="maxDuration" value={preferences.maxDuration} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" min="10" />
          </div>
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Niveau de difficulté</label>
            <select name="difficulty" id="difficulty" value={preferences.difficulty} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option value="facile">Facile</option>
              <option value="moyen">Moyen</option>
              <option value="difficile">Difficile</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          {/* Ce champ 'allergies' est temporairement utilisé pour saisir les ingrédients pour le backend */}
          <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Ingrédients (séparés par des virgules)</label>
          <input type="text" name="allergies" id="allergies" value={preferences.allergies} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Ex: poulet, brocoli, riz" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="maxIngredients" className="block text-sm font-medium text-gray-700">Max. ingrédients</label>
            <input type="number" name="maxIngredients" id="maxIngredients" value={preferences.maxIngredients} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" min="1" />
          </div>
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Objectif de la recette</label>
            <input type="text" name="goal" id="goal" value={preferences.goal} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Ex: Gain de temps, Sport, Enfants" />
          </div>
        </div>

        <div className="mb-6 flex items-center">
          <input type="checkbox" name="robotCompatible" id="robotCompatible" checked={preferences.robotCompatible} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
          <label htmlFor="robotCompatible" className="ml-2 block text-sm text-gray-900">Compatible robot de cuisine</label>
        </div>

        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={loading} // Désactive le bouton pendant le chargement
        >
          {loading ? 'Génération en cours...' : 'Générer la Recette !'}
        </button>
      </form>

      {/* Affichage des erreurs, si elles existent */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full max-w-2xl mb-8" role="alert">
          <strong className="font-bold">Erreur :</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Affichage de la recette générée */}
      {generatedRecipe && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">{generatedRecipe.title}</h2>
          <p className="text-gray-600 mb-4">Durée : {generatedRecipe.duration}</p>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">Ingrédients :</h3>
          {/* Ajout d'une vérification pour les ingrédients avant de mapper */}
          {generatedRecipe.ingredients && generatedRecipe.ingredients.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {generatedRecipe.ingredients.map((item, index) => (
                <li key={index}>{item.quantity} {item.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Aucun ingrédient spécifié.</p>
          )}

          <h3 className="text-xl font-semibold text-gray-700 mb-2">Étapes :</h3>
          {/* Ajout d'une vérification pour les étapes avant de mapper */}
          {generatedRecipe.steps && generatedRecipe.steps.length > 0 ? (
            <ol className="list-decimal list-inside">
              {generatedRecipe.steps.map((step, index) => (
                <li key={index} className="mb-1">{step}</li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-600">Aucune étape spécifiée.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
