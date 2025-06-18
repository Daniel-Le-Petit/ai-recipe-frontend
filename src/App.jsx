// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './index.css'; // Global styles for Tailwind
import ReactGA from 'react-ga4'; // Importation de la bibliothèque Google Analytics 4

// Import des composants communs (Header et Footer restent inchangés ici)
import Header from './components/Common/Header.jsx';
import Footer from './components/Common/Footer.jsx';

// Import des composants de page (mis à jour selon la nouvelle structure)
import HomePage from './components/Pages/HomePage.jsx'; // Votre page d'accueil avec les 3 tiers
import CreerRecetteIA from './components/Pages/CreerRecetteIA.jsx'; // Page pour créer une recette via l'IA
import DetailRecetteIA from './components/Pages/DetailRecetteIA.jsx'; // Page pour afficher la recette générée par l'IA

import TrouverRecetteExistante from './components/Pages/TrouverRecetteExistante.jsx'; // Page pour trouver recette par ingrédients
import ExplorerRecettes from './components/Pages/ExplorerRecettes.jsx'; // Page pour explorer les recettes inspirantes
import DetailRecetteExistante from './components/Pages/DetailRecetteExistante.jsx'; // Page de détail pour recettes existantes/inspirantes (réutilisable)

import MesRecettes from './components/Pages/MesRecettes.jsx'; // Page Mes Recettes (accessible via Footer)
import ProfilePage from './components/Pages/ProfilePage.jsx'; // <--- CHANGE THIS LINE


// Pages pour les actions de détail sur recette
import AjouterPanier from './components/Pages/AjouterPanier.jsx';
import ExporterRobot from './components/Pages/ExporterRobot.jsx';
import NoterRecette from './components/Pages/NoterRecette.jsx';


// Import des composants d'administration (restent inchangés dans leur principe)
import AnalyticsDashboardPage from './components/Pages/AnalyticsDashboardPage.jsx';
import UserLocationMapPage from './components/Pages/UserLocationMapPage.jsx';
import FeatureUsagePage from './components/Pages/FeatureUsagePage.jsx';


// Initialisation de Google Analytics 4 au démarrage de l'application.
// L'ID de mesure réel à utiliser est G-WVMZTWR8CK
// Note: Assurez-vous que l'ID est correct dans votre environnement de production
ReactGA.initialize('G-WVMZTWR8CK');

function AppContent() {
  const navigate = useNavigate(); // Hook de navigation de React Router
  const location = useLocation(); // Pour Google Analytics et potentiellement la logique de retour

  // Global state for recipe preferences and generation (maintenu ici si partagé globalement)
  const [preferences, setPreferences] = useState({
    cuisineType: '',
    numPeople: 1,
    maxDuration: 60,
    difficulty: 'Facile',
    ingredients: '', // Sera probablement un tableau ou objet pour multiples ingrédients
    maxIngredients: 10,
    recipeGoal: '',
    robotCompatible: false,
  });
  const [generatedRecipe, setGeneratedRecipe] = useState(null); // Recette générée par l'IA
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState(null); // Recette existante/inspirante sélectionnée pour affichage détaillé
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mockMode, setMockMode] = useState(true);
  
  // Admin mode state
  const [isAdmin, setIsAdmin] = useState(false); // Simulate admin role

  const STRAPI_BACKEND_URL = import.meta.env.VITE_APP_STRAPI_API_URL;

  // Mock data for AI recipe generation (used when mockMode is true)
  const mockAiRecipe = {
    id: 'mock-ai-recipe-1', // Ajout d'un ID pour la sélection
    title: "Curry de Légumes Express (Mocké AI)",
    duration: "30 minutes",
    ingredients: [
      { name: "Lait de coco", quantity: "400ml" },
      { name: "Pois chiches (en conserve)", quantity: "1 boîte" },
      { name: "Épinards frais", quantity: "200g" },
      { name: "Pâte de curry rouge", quantity: "2 c. à soupe" },
      { name: "Oignon", quantity: "1" },
      { name: "Ail", quantity: "2 gousses" },
      { name: "Gingembre frais", quantity: "1 morceau" }
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
    imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
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
  // Cette fonction est maintenant plus spécifique à la génération IA
  const handleGenerateAISubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setGeneratedRecipe(null); // Reset generated recipe on new submission

    if (mockMode) {
      setTimeout(() => {
        setGeneratedRecipe({ ...mockAiRecipe, id: Date.now() });
        setLoading(false);
        navigate('/detail-recette-ia'); // Naviguer vers la page d'affichage de recette générée
      }, 1500);
      return;
    }

    // Préparation des données pour l'API (à adapter à votre backend Strapi)
    let dataToSend = {
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur HTTP! Statut: ${response.status}`);
      }

      const data = await response.json();
      if (data.recipe) {
        setGeneratedRecipe(data.recipe);
        navigate('/detail-recette-ia'); // Naviguer vers la page d'affichage de recette générée
      } else {
        // Gérer le cas où la structure de réponse est différente
        setGeneratedRecipe(data); 
        navigate('/detail-recette-ia');
      }
      
    } catch (err) {
      console.error("Erreur de génération de recette:", err);
      setError(err.message || "Une erreur inattendue est survenue lors de la génération de recette.");
    } finally {
      setLoading(false);
    }
  };


  // Google Analytics 4 (GA4) Tracking avec React Router
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return (
    // Le conteneur principal de l'application
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 flex flex-col h-full">
      {/* Header component - passe isAdmin pour le toggle de mode admin */}
      <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} navigate={navigate} /> {/* Passe navigate au Header */}

      {/* Main content area: Routes will render components here */}
      <main className="flex-1 w-full relative"> {/* Supprime overflow-hidden et h-full si le contenu doit défiler */}
        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path="/" element={<HomePage />} /> {/* HomePage n'a plus besoin de navigate en prop car il utilise Link */}

          {/* Routes de la nouvelle structure */}
          <Route
            path="/creer-recette-ia"
            element={
              <CreerRecetteIA
                preferences={preferences}
                handleChange={handleChange}
                handleSubmit={handleGenerateAISubmit} // Utilisez le handler spécifique pour la génération IA
                loading={loading}
                error={error}
                mockMode={mockMode}
                setMockMode={setMockMode}
                navigate={navigate}
              />
            }
          />
          <Route
            path="/detail-recette-ia"
            element={<DetailRecetteIA generatedRecipe={generatedRecipe} navigate={navigate} />}
          />

          <Route
            path="/trouver-recette-existante"
            element={<TrouverRecetteExistante navigate={navigate} setSelectedRecipeDetail={setSelectedRecipeDetail} />} // Passer setSelectedRecipeDetail pour le clic sur les cartes de résultats
          />
          <Route
            path="/explorer-recettes"
            element={<ExplorerRecettes navigate={navigate} setSelectedRecipeDetail={setSelectedRecipeDetail} />} // Passer setSelectedRecipeDetail
          />
          <Route
            path="/detail-recette-existante"
            element={<DetailRecetteExistante selectedRecipeDetail={selectedRecipeDetail} navigate={navigate} />}
          />

          <Route path="/mes-recettes" element={<MesRecettes navigate={navigate} setSelectedRecipeDetail={setSelectedRecipeDetail} />} />
          <Route path="/panier" element={<AjouterPanier navigate={navigate} />} />
          <Route path="/exporter-robot" element={<ExporterRobot navigate={navigate} />} />
          <Route path="/noter-recette" element={<NoterRecette navigate={navigate} />} />
          <Route
            path="/profil"
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
          
          {/* Routes pour les pages statiques (Politique de Confidentialité, Mentions Légales) */}
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

      {/* Footer component - positionné en bas de page */}
      {/* Note: La section newsletter a été déplacée dans HomePage.jsx */}
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
