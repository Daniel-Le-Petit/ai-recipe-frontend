// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import './index.css'; // Global styles for Tailwind

// Import common components
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';

// Import page components
import HomePage from './components/Pages/HomePage';
import CreateRecipeFormPage from './components/Pages/CreateRecipeFormPage';
import GeneratedRecipeDisplayPage from './components/Pages/GeneratedRecipeDisplayPage';
import RecipesOverviewPage from './components/Pages/RecipesOverviewPage';
import ProfilePage from './components/Pages/ProfilePage';
import AnalyticsDashboardPage from './components/Pages/AnalyticsDashboardPage';
import UserLocationMapPage from './components/Pages/UserLocationMapPage';
import FeatureUsagePage from './components/Pages/FeatureUsagePage';

function App() {
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

  // UI state for navigation and mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // Current active page

  // Admin mode state (for conceptual demonstration of admin dashboards)
  const [isAdmin, setIsAdmin] = useState(false); // Simulate admin role

  // For swipe gesture detection
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const minSwipeDistance = 50; // Minimum horizontal distance for a swipe

  // Define the order of pages for linear swipe navigation (excluding generatedRecipeDisplay)
  // This array defines the sequence of pages that can be navigated by swiping.
  const pageOrder = ['home', 'createRecipeForm', 'recipesOverview', 'profilePage', 'analyticsDashboard', 'userLocationMap', 'featureUsage'];

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

  // Handler for form input changes
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
        setCurrentPage('generatedRecipeDisplay'); // Transition to the recipe display page
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
        setCurrentPage('generatedRecipeDisplay'); // Transition to the recipe display page
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

  // Function to handle page navigation
  const handleNavigate = (pageId, sectionId = null) => {
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
    setCurrentPage(pageId);
    // Scroll to top of the target page content after a short delay for animation
    setTimeout(() => {
      let targetSectionId;
      if (pageId === 'home') targetSectionId = 'hero-section';
      else if (pageId === 'createRecipeForm') targetSectionId = 'generate-recipe-form';
      else if (pageId === 'generatedRecipeDisplay') targetSectionId = 'generated-recipe-display';
      else if (pageId === 'recipesOverview') targetSectionId = 'recipes-overview-section';
      else if (pageId === 'profilePage') targetSectionId = 'profile-page-section';
      else if (pageId === 'analyticsDashboard') targetSectionId = 'analytics-dashboard-section';
      else if (pageId === 'userLocationMap') targetSectionId = 'user-location-map-section';
      else if (pageId === 'featureUsage') targetSectionId = 'feature-usage-section';

      // If a specific section ID is provided for the home page, scroll to that section.
      // Otherwise, scroll to the top of the determined target page section.
      if (sectionId && pageId === 'home') {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
      } else if (targetSectionId) {
        const section = document.getElementById(targetSectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 500); // Delay matches CSS transition duration
  };

  // Function to toggle mobile navigation menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to get the transform style for each page based on the current page
  // This creates the sliding page effect.
  const getPageTransformStyle = (pageId) => {
    // Special handling for generatedRecipeDisplay, which can appear as an overlay/separate view
    if (currentPage === 'generatedRecipeDisplay') {
      if (pageId === 'generatedRecipeDisplay') {
        return { transform: `translateX(0%)` }; // Show this page
      } else {
        // Hide all other pages to the left when generatedRecipeDisplay is active
        return { transform: `translateX(-100%)` };
      }
    }

    // For the main sequence of pages (home, createRecipeForm, etc.)
    const thisPageIndex = pageOrder.indexOf(pageId);
    const activePageIndex = pageOrder.indexOf(currentPage);

    // If a page is not part of the defined sequence or is not meant to be active in the current flow,
    // position it off-screen to the right by default as a safeguard.
    if (thisPageIndex === -1 || activePageIndex === -1) {
        return { transform: `translateX(100%)` };
    }

    // Calculate the horizontal offset to slide pages
    const offset = (thisPageIndex - activePageIndex) * 100;
    return { transform: `translateX(${offset}%)` };
  };

  // Swipe gesture handlers for horizontal navigation
  const onTouchStart = (e) => {
      // Prevent global swipe if interaction is within the carousel
      if (e.target.closest('.scrollbar-hide') || currentPage === 'generatedRecipeDisplay') {
        return; 
      }
      setTouchEnd(null); // Reset touchEnd for a new swipe gesture
      setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
      // Prevent global swipe if interaction is within the carousel
      if (e.target.closest('.scrollbar-hide') || currentPage === 'generatedRecipeDisplay') {
        return;
      }
      setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
      // If generatedRecipeDisplay is currently active, prevent swipe navigation from exiting it.
      if (currentPage === 'generatedRecipeDisplay') {
        return;
      }

      if (touchStart === null || touchEnd === null) return; // Ensure valid swipe points
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance; // Swiping left means going to the next page
      const isRightSwipe = distance < -minSwipeDistance; // Swiping right means going to the previous page

      const currentIndex = pageOrder.indexOf(currentPage);

      if (isLeftSwipe) { 
          if (currentIndex < pageOrder.length - 1) {
              setCurrentPage(pageOrder[currentIndex + 1]);
          }
      } else if (isRightSwipe) { 
          if (currentIndex > 0) {
              setCurrentPage(pageOrder[currentIndex - 1]);
          }
      }
      // Reset touch points after swipe
      setTouchStart(0);
      setTouchEnd(0);
  };


  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 flex flex-col h-full">
      {/* Header component */}
      <Header 
        handleNavigate={handleNavigate} 
        toggleMobileMenu={toggleMobileMenu} 
        isMobileMenuOpen={isMobileMenuOpen} 
      />

      {/* Main content area: contains sliding pages */}
      {/* Added pb-20 to main to prevent content from being hidden by the fixed footer. Added swipe handlers */}
      <main className="flex-1 w-full overflow-hidden relative h-full pb-20"
            onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        
        {/* HomePage Component */}
        <div style={getPageTransformStyle('home')} className="absolute inset-0 transition-transform duration-500 ease-in-out overflow-y-auto">
          <HomePage handleNavigate={handleNavigate} />
        </div>

        {/* CreateRecipeFormPage Component */}
        <div style={getPageTransformStyle('createRecipeForm')} className="absolute inset-0 transition-transform duration-500 ease-in-out overflow-y-auto">
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
        </div>

        {/* GeneratedRecipeDisplayPage Component */}
        {/* This page appears when a recipe is generated and is not part of the linear swipe. */}
        <div style={getPageTransformStyle('generatedRecipeDisplay')} className="absolute inset-0 transition-transform duration-500 ease-in-out overflow-y-auto">
          <GeneratedRecipeDisplayPage 
            generatedRecipe={generatedRecipe} 
            handleNavigate={handleNavigate} 
          />
        </div>

        {/* RecipesOverviewPage Component */}
        <div style={getPageTransformStyle('recipesOverview')} className="absolute inset-0 transition-transform duration-500 ease-in-out overflow-y-auto">
          <RecipesOverviewPage handleNavigate={handleNavigate} />
        </div>

        {/* ProfilePage Component */}
        <div style={getPageTransformStyle('profilePage')} className="absolute inset-0 transition-transform duration-500 ease-in-out overflow-y-auto">
          <ProfilePage 
            handleNavigate={handleNavigate} 
            isAdmin={isAdmin} 
            setIsAdmin={setIsAdmin} 
          />
        </div>

        {/* AnalyticsDashboardPage Component */}
        <div style={getPageTransformStyle('analyticsDashboard')} className="absolute inset-0 transition-transform duration-500 ease-in-out overflow-y-auto">
          <AnalyticsDashboardPage handleNavigate={handleNavigate} />
        </div>

        {/* UserLocationMapPage Component */}
        <div style={getPageTransformStyle('userLocationMap')} className="absolute inset-0 transition-transform duration-500 ease-in-out overflow-y-auto">
          <UserLocationMapPage handleNavigate={handleNavigate} />
        </div>

        {/* FeatureUsagePage Component */}
        <div style={getPageTransformStyle('featureUsage')} className="absolute inset-0 transition-transform duration-500 ease-in-out overflow-y-auto">
          <FeatureUsagePage handleNavigate={handleNavigate} />
        </div>

      </main>

      {/* Footer component */}
      <Footer handleNavigate={handleNavigate} />
    </div>
  );
}

export default App;