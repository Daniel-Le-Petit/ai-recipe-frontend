// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
// Importations de React Router DOM
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import '../index.css'; // Global styles for Tailwind - CORRECTION DU CHEMIN

// Import common components
import Header from './components/Common/Header.jsx';
import Footer from './components/Common/Footer.jsx';
import {
  LeafIcon,
  KitchenRobotIcon,
  CheckCircleIcon,
  SparklesIcon,
  ShoppingCartIcon,
  HomeIcon, // Ajouté pour la navigation du Header/Footer
  LightbulbIcon,
  BrainIcon, // Ajouté pour la navigation du Header/Footer
  PackageIcon, // Ajouté pour la navigation du Header/Footer
  UserIcon, // Ajouté pour la navigation du Header/Footer
  BellIcon,
  HelpCircleIcon,
  SettingsIcon,
  BookOpenIcon,
  BarChartIcon, // Ajouté pour la navigation du Header/Footer
  GlobeIcon, // Ajouté pour la navigation du Header/Footer
  PieChartIcon, // Ajouté pour la navigation du Header/Footer
  ChevronLeftIcon,
  ChevronRightIcon
} from './components/Common/Icons.jsx';


// Import page components
import HomePage from './components/Pages/HomePage.jsx';
import CreateRecipeFormPage from './components/Pages/CreateRecipeFormPage.jsx';
import GeneratedRecipeDisplayPage from './components/Pages/GeneratedRecipeDisplayPage.jsx';
import RecipesOverviewPage from './components/Pages/RecipesOverviewPage.jsx';
import ProfilePage from './components/Pages/ProfilePage.jsx';
import AnalyticsDashboardPage from './components/Pages/AnalyticsDashboardPage.jsx';
import UserLocationMapPage from './components/Pages/UserLocationMapPage.jsx';
import FeatureUsagePage from './components/Pages/FeatureUsagePage.jsx';

function AppContent() { // Renommée en AppContent pour être enveloppée par BrowserRouter
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
  const [mockMode, setMockMode] = useState(true); // Initialisé en mode mock

  // Admin mode state (for conceptual demonstration of admin dashboards)
  const [isAdmin, setIsAdmin] = useState(false); // Simulate admin role

  const STRAPI_BACKEND_URL = import.meta.env.VITE_APP_STRAPI_API_URL;

  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation programmatique

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

  // Handler for form input changes (passé aux composants enfants)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handler for form submission (generating AI recipe or searching existing)
  const handleSubmit = async (e, actionType) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // If in mock mode, simulate API call with a delay
    if (mockMode && actionType === 'generateAI') {
      setTimeout(() => {
        setGeneratedRecipe({ ...mockAiRecipe, id: Date.now() });
        setLoading(false);
        navigate('/generated-recipe'); // Navigue vers la page d'affichage de la recette
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
        navigate('/generated-recipe'); // Navigue après la génération réussie
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


  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 flex flex-col h-full">
      {/* Header component */}
      <Header
        toggleMobileMenu={() => { /* Supprimé isMobileMenuOpen de App, géré localement dans Header */ }}
        isMobileMenuOpen={false} // Pas directement géré par App ici
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />

      {/* Main content area: uses React Router for page rendering */}
      <main className="flex-1 w-full overflow-y-auto relative h-full pb-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate-recipe" element={
            <CreateRecipeFormPage
              preferences={preferences}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
              error={error}
              mockMode={mockMode}
              setMockMode={setMockMode}
            />
          } />
          <Route path="/generated-recipe" element={<GeneratedRecipeDisplayPage generatedRecipe={generatedRecipe} />} />
          <Route path="/recipes-overview" element={<RecipesOverviewPage />} />
          <Route path="/profile" element={<ProfilePage isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
          {/* Admin routes, conditionnelles côté affichage dans App.jsx */}
          <Route path="/admin/analytics" element={<AnalyticsDashboardPage STRAPI_BACKEND_URL={STRAPI_BACKEND_URL} isAdmin={isAdmin} />} />
          <Route path="/admin/locations" element={<UserLocationMapPage STRAPI_BACKEND_URL={STRAPI_BACKEND_URL} isAdmin={isAdmin} />} />
          <Route path="/admin/feature-usage" element={<FeatureUsagePage STRAPI_BACKEND_URL={STRAPI_BACKEND_URL} isAdmin={isAdmin} />} />
        </Routes>
      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}

// Composant racine de l'application qui enveloppe tout dans BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

