// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './index.css'; // Global styles for Tailwind
import ReactGA from 'react-ga4'; // Importation de la bibliothèque Google Analytics 4

// Import des composants communs
import Header from './components/Common/Header.jsx';
import Footer from './components/Common/Footer.jsx';

// Import des composants de page (maintenant des pages à part entière pour React Router)
// NOTE: Vérifiez que ces chemins sont corrects. Si vos pages sont dans 'src/components/Common/',
// vous devrez peut-être changer 'components/Pages/' en 'components/Common/' ici et dans les imports internes des pages.
// Le chemin par défaut ici est 'components/Pages/'
import HomePage from './components/Pages/HomePage.jsx';
import CreateRecipeFormPage from './components/Pages/CreateRecipeFormPage.jsx';
import GeneratedRecipeDisplayPage from './components/Pages/GeneratedRecipeDisplayPage.jsx';
import RecipesOverviewPage from './components/Pages/RecipesOverviewPage.jsx';
import ProfilePage from './components/Pages/ProfilePage.jsx';
import AnalyticsDashboardPage from './components/Pages/AnalyticsDashboardPage.jsx';
import UserLocationMapPage from './components/Pages/UserLocationMapPage.jsx';
import FeatureUsagePage from './components/Pages/FeatureUsagePage.jsx';


// Initialisation de Google Analytics 4 au démarrage de l'application.
// L'ID de mesure réel à utiliser est G-493418792
ReactGA.initialize('G-493418792');

function AppContent() {
  const navigate = useNavigate(); // Hook pour la navigation programmatique

  // Global state for recipe preferences and generation
  const [preferences, setPreferences] = useState({
    cuisineType: '',
    numPeople: 1,
    maxDuration: 60,
    difficulty: 'Facile',
    ingredients: '',
    maxIngredients: 10,
    recipeGoal: '',
    robotCompatible: false,
  });
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mockMode, setMockMode] = useState(true);
  
  // Admin mode state
  const [isAdmin, setIsAdmin] = useState(false); // Simulate admin role

  const STRAPI_BACKEND_URL = import.meta.env.VITE_APP_STRAPI_API_URL;

  // Mock data for AI recipe generation
  const mockAiRecipe = {
    title: "Curry de Légumes Express (Mocké AI)",
    duration: "30 minutes",
    ingredients: [
      { name: "Lait de coco", quantity: "400ml" },
      { name: "Pois chiches (en conserve)", quantity: "1 boîte" },
      { name: "Épinards frais", quantity: "200g" },
      { name: "Pâte de curry rouge", quantity: "2 c. à soupe" },
      { name: "Oignon", quantity: "1" },
      { name: "Ail", quantity: "2 gousses" },
      { name: "Gingembre frais", quantity: "1 morceau" },
      { name: "Riz Basmati", quantity: "200g" }
    ],
    steps: [
      "Faire revenir l'oignon, l'ail et le gingembre hachés dans un filet d'huile.",
      "Ajouter la pâte de curry et faire cuire 1 minute.",
      "Incorporer le lait de coco et les pois chiches égouttés.",
      "Laisser mijoter 15 minutes à feu doux.",
      "Ajouter les épinards et cuire jusqu'à ce qu'ils soient flétris.",
      "Servir avec du riz Basmati."
    ],
    aiTested: true,
    robotCompatible: true,
    imageUrl: "https://placehold.co/600x400/007BFF/FFFFFF?text=Mock+Image"
  };

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handler for form submission (generating AI recipe or searching existing)
  const handleSubmit = async (e, actionType = 'generateAI') => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setGeneratedRecipe(null); // Reset generated recipe on new submission

    if (mockMode && actionType === 'generateAI') {
      setTimeout(() => {
        setGeneratedRecipe({ ...mockAiRecipe, id: Date.now() });
        setLoading(false);
        navigate('/generated-recipe'); // Naviguer vers la page d'affichage
      }, 1500);
      return;
    }

    // Prepare data to send to the backend
    let dataToSend = {
      actionType: actionType,
      cuisineType: preferences.cuisineType,
      numPeople: preferences.numPeople,
      maxDuration: preferences.maxDuration,
      difficulty: preferences.difficulty,
      ingredients: preferences.ingredients
                   .split(',')
                   .map(item => item.trim())
                   .filter(item => item.length > 0),
      maxIngredients: preferences.maxIngredients,
      recipeGoal: preferences.recipeGoal,
      robotCompatible: preferences.robotCompatible,
    };

    try {
      const response = await fetch(`${STRAPI_BACKEND_URL}/api/recipe-generator/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur HTTP! Statut: ${response.status}`);
      }

      const data = await response.json();
      if (data.recipe) {
        setGeneratedRecipe(data.recipe);
        navigate('/generated-recipe'); // Naviguer vers la page d'affichage
      } else {
        setGeneratedRecipe(data);
      }
      
    } catch (err) {
      console.error("Erreur de génération de recette:", err);
      setError(err.message || "Une erreur inattendue est survenue lors de la génération de recette.");
    } finally {
      setLoading(false);
    }
  };

  // Google Analytics 4 (GA4) Tracking avec React Router
  const location = useLocation();
  useEffect(() => {
    // Envoie un événement de page vue à GA4 à chaque changement de route
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);


  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 flex flex-col h-full">
      {/* Header component */}
      <Header navigate={navigate} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

      {/* Main content area: Routes will render components here */}
      <main className="flex-1 w-full overflow-hidden relative h-full pb-20">
        <Routes>
          <Route path="/" element={<HomePage navigate={navigate} />} />
          <Route
            path="/generate-recipe"
            element={
              <CreateRecipeFormPage
                preferences={preferences}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
                error={error}
                mockMode={mockMode}
                setMockMode={setMockMode}
                navigate={navigate}
              />
            }
          />
          <Route
            path="/generated-recipe"
            element={<GeneratedRecipeDisplayPage generatedRecipe={generatedRecipe} navigate={navigate} />}
          />
          <Route path="/recipes-overview" element={<RecipesOverviewPage navigate={navigate} />} />
          <Route
            path="/profile"
            element={<ProfilePage isAdmin={isAdmin} setIsAdmin={setIsAdmin} navigate={navigate} />}
          />
          {/* Routes d'administration, affichées conditionnellement */}
          {isAdmin && (
            <>
              <Route path="/admin/analytics" element={<AnalyticsDashboardPage navigate={navigate} STRAPI_BACKEND_URL={STRAPI_BACKEND_URL} />} />
              <Route path="/admin/locations" element={<UserLocationMapPage navigate={navigate} STRAPI_BACKEND_URL={STRAPI_BACKEND_URL} />} />
              <Route path="/admin/feature-usage" element={<FeatureUsagePage navigate={navigate} STRAPI_BACKEND_URL={STRAPI_BACKEND_URL} />} />
            </>
          )}
          {/* Route pour le cas où l'utilisateur tente d'accéder à une route admin sans être admin */}
          {!isAdmin && (
              <Route path="/admin/*" element={
                  <div className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg text-center">
                      <h2 className="text-4xl font-bold text-red-700 mb-6">Accès Refusé</h2>
                      <p className="text-gray-700">Vous n'avez pas les permissions pour accéder à cette page.</p>
                  </div>
              } />
          )}

          {/* Ajoutez d'autres routes si nécessaire */}
          <Route path="/privacy-policy" element={<div className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg text-center"><h2 className="text-3xl font-bold text-gray-800">Politique de Confidentialité</h2><p className="mt-4 text-gray-700">Contenu de la politique de confidentialité...</p></div>} />
          <Route path="/legal-notices" element={<div className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg text-center"><h2 className="text-3xl font-bold text-gray-800">Mentions Légales</h2><p className="mt-4 text-gray-700">Contenu des mentions légales...</p></div>} />
          
          {/* Route pour les pages non trouvées (404) */}
          <Route path="*" element={
            <div className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg text-center">
              <h2 className="text-4xl font-bold text-red-700 mb-6">404 - Page Non Trouvée</h2>
              <p className="text-gray-700">Désolé, la page que vous recherchez n'existe pas.</p>
            </div>
          } />
        </Routes>
      </main>

      {/* Section Newsletter - En bas de page */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-16 px-6 md:px-12 text-center rounded-xl mx-4 my-6 shadow-lg">
        <h2 className="text-4xl font-bold mb-6">Recevez nos recettes éthiques et gourmandes chaque semaine</h2>
        <p className="text-lg mb-8">Ne manquez jamais une inspiration culinaire personnalisée.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Email@adresse.com"
            className="w-full sm:w-80 p-4 rounded-full border border-green-500 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
          />
          <button className="px-8 py-4 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
            Je m'inscris
          </button>
        </div>
      </section>

      {/* Footer component */}
      <Footer navigate={navigate} />
    </div>
  );
}

// Composant racine de l'application qui englobe AppContent avec le Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

