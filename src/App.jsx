// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css'; // Global styles for Tailwind
import ReactGA from 'react-ga4'; // Importation de la bibliothèque Google Analytics 4

// Import des composants communs
import Header from './components/Common/Header.jsx';
import Footer from './components/Common/Footer.jsx';

// Import des composants de page (maintenant séparés)
import HomePage from './components/Pages/HomePage.jsx';
import CreateRecipeFormPage from './components/Pages/CreateRecipeFormPage.jsx';
import GeneratedRecipeDisplayPage from './components/Pages/GeneratedRecipeDisplayPage.jsx';
import RecipesOverviewPage from './components/Pages/RecipesOverviewPage.jsx';
import ProfilePage from './components/Pages/ProfilePage.jsx';
import AnalyticsDashboardPage from './components/Pages/AnalyticsDashboardPage.jsx';
import UserLocationMapPage from './components/Pages/UserLocationMapPage.jsx';
import FeatureUsagePage from './components/Pages/FeatureUsagePage.jsx';


// Initialisation de Google Analytics 4 au démarrage de l'application.
// C'est un point clé : L'ID de mesure doit être celui de votre propriété GA4.
// REMPLACEZ 'VOTRE_MEASUREMENT_ID_GA4' par l'ID de mesure que vous avez obtenu de Google Analytics (ex: 'G-XXXXXXXXXX')
ReactGA.initialize('G-493418792');

function AppContent() {
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
  
  // Admin mode state (for conceptual demonstration of admin dashboards)
  const [isAdmin, setIsAdmin] = useState(false); // Simulate admin role
  const [currentPage, setCurrentPage] = useState('home'); // State to manage current page in App.jsx

  const STRAPI_BACKEND_URL = import.meta.env.VITE_APP_STRAPI_API_URL;

  // Mock data for AI recipe generation (used when mockMode is true)
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

  // Handler for form submission (generating AI recipe or searching existing)
  const handleSubmit = async (e, actionType = 'generateAI') => { // actionType par défaut
    e.preventDefault();
    setLoading(true);
    setError('');
    setGeneratedRecipe(null); // Reset generated recipe on new submission

    // If in mock mode, simulate API call with a delay
    if (mockMode && actionType === 'generateAI') {
      setTimeout(() => {
        setGeneratedRecipe({ ...mockAiRecipe, id: Date.now() });
        setLoading(false);
        setCurrentPage('generatedRecipeDisplay'); // Navigate to display page after mock generation
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
      // Make the API call to your Strapi backend
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
        setCurrentPage('generatedRecipeDisplay'); // Navigate to display page after successful generation
      } else {
        setGeneratedRecipe(data); // In case 'recipe' field is not directly present
      }
      
    } catch (err) {
      console.error("Erreur de génération de recette:", err);
      setError(err.message || "Une erreur inattendue est survenue lors de la génération de recette.");
    } finally {
      setLoading(false);
    }
  };


  // Function to handle navigation between pages and optionally scroll to sections
  const handleNavigate = (page, sectionId = null) => {
    setCurrentPage(page);
    // Logic for scrolling to a specific section on the home page
    if (page === 'home' && sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };


  // Google Analytics 4 (GA4) Tracking avec React Router
  // Le hook `useLocation` de React Router permet de suivre les changements d'URL
  // qui sont déclenchés par la navigation interne (ex: Link to="/ma-page").
  const location = useLocation();
  useEffect(() => {
    // Envoie un événement de page vue à GA4 à chaque changement de route
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]); // Déclenché à chaque changement de l'objet location (donc à chaque changement de route)


  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 flex flex-col h-full">
      {/* Header component - passe isAdmin et setIsAdmin pour le toggle de mode admin */}
      <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} handleNavigate={handleNavigate} />

      {/* Main content area: Routes will render components here */}
      <main className="flex-1 w-full overflow-hidden relative h-full pb-20">
        <Routes>
          <Route path="/" element={<HomePage handleNavigate={handleNavigate} />} />
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
                handleNavigate={handleNavigate}
              />
            }
          />
          <Route
            path="/generated-recipe"
            element={<GeneratedRecipeDisplayPage generatedRecipe={generatedRecipe} handleNavigate={handleNavigate} />}
          />
          <Route path="/recipes-overview" element={<RecipesOverviewPage handleNavigate={handleNavigate} />} />
          <Route
            path="/profile"
            element={<ProfilePage isAdmin={isAdmin} setIsAdmin={setIsAdmin} handleNavigate={handleNavigate} />}
          />
          {/* Routes d'administration, affichées conditionnellement dans le Header */}
          {isAdmin && (
            <>
              <Route path="/admin/analytics" element={<AnalyticsDashboardPage handleNavigate={handleNavigate} STRAPI_BACKEND_URL={STRAPI_BACKEND_URL} />} />
              <Route path="/admin/locations" element={<UserLocationMapPage handleNavigate={handleNavigate} STRAPI_BACKEND_URL={STRAPI_BACKEND_URL} />} />
              <Route path="/admin/feature-usage" element={<FeatureUsagePage handleNavigate={handleNavigate} STRAPI_BACKEND_URL={STRAPI_BACKEND_URL} />} />
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
      <Footer handleNavigate={handleNavigate} />
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

