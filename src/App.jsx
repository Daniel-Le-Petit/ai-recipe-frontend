import React, { useState, useEffect, useRef } from 'react';
import './index.css'; // Assurez-vous que ce fichier est bien importé et contient les directives Tailwind

// Définition des icônes utilisées dans l'interface pour améliorer le visuel
// Ces icônes sont des SVG inline pour éviter des dépendances externes comme lucide-react pour la prévisualisation.

// Nouveau Logo Inspirant pour AI & Fines Herbes
const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#388E3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* Forme de la feuille */}
    <path d="M12 22C12 22 20 13.3137 20 8C20 4.68629 17.3137 2 14 2C10.6863 2 8 4.68629 8 8C8 13.3137 12 22 12 22Z" fill="currentColor"/>
    {/* Élément subtil IA/connexion à l'intérieur de la feuille */}
    <circle cx="10" cy="10" r="1.5" fill="white" opacity="0.7"/>
    <circle cx="14" cy="14" r="1.5" fill="white" opacity="0.7"/>
    <line x1="10" y1="10" x2="14" y2="14" stroke="white" strokeWidth="1.5" strokeOpacity="0.7"/>
  </svg>
);

const KitchenRobotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-robot">
    <path d="M10 20H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/><path d="M12 10h.01"/><path d="M17 10h.01"/><path d="M10 14h4"/><path d="M12 17v3"/><path d="M19 17v3"/><path d="M19 14h-2"/><path d="M5 13H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"/><path d="M16 13h-1a2 2 0 0 0-2 2v2a2 2 0 : 0 2 2h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-8.9"/><path d="m14 2 6 6"/><path d="m3 12 2 2 4-4"/>
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles">
    <path d="M12 2L14.5 8L22 10.5L14.5 13L12 19L9.5 13L2 10.5L9.5 8L12 2Z" />
    <path d="M20 7L22 5" />
    <path d="M2 19L4 17" />
    <path d="M12 17L14.5 19.5" />
    <path d="M10 4.5L12 7" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
    <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
  </svg>
);

// Icônes pour la navigation et les sections "Comment ça marche"
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 22v-4"/>
  </svg>
);

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain">
    <path d="M12 12c2-2.5 4-4 5-8 1.4 1.1 2.2 2.5 2.2 4.1 0 2.2-1.3 4.3-3.3 5.7.5 1.4.8 2.8.8 4.3 0 1.9-1.3 3.5-3.2 4.1.3.9.6 1.8.6 2.8 0 1.1-1.3 2-3 2s-3-.9-3-2c0-1 .3-1.9.6-2.8-1.9-.6-3.2-2.2-3.2-4.1 0-1.5.3-2.9.8-4.3-2-1.4-3.3-3.5-3.3-5.7 0-1.6.8-3 2.2-4.1 1 4 3 5.5 5 8z"/>
  </svg>
);

const PackageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package">
    <path d="m7.5 4.27 9 5.15"/><path d="m7.5 19.73 9-5.15"/><path d="M3.3 8.7L12 3l8.7 5.7"/><path d="M12 22 3.3 16.3 12 10.5 20.7 16.3Z"/><path d="M12 3v7.5"/><path d="M12 10.5v7.5"/>
  </svg>
);

// Icône utilisateur pour le pied de page
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);


function App() {
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // État pour le menu mobile
  
  // Updated currentPage states: 'home', 'createRecipeForm', 'generatedRecipeDisplay', 'recipesOverview'
  const [currentPage, setCurrentPage] = useState('home');

  // For swipe gesture detection
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const minSwipeDistance = 50; // Minimum horizontal distance for a swipe

  // Define the order of pages for linear swipe navigation (excluding generatedRecipeDisplay)
  const pageOrder = ['home', 'createRecipeForm', 'recipesOverview'];

  // Refs for carousel navigation
  const recipeCarouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true); // Assume content to the right initially

  const STRAPI_BACKEND_URL = import.meta.env.VITE_APP_STRAPI_API_URL;

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e, actionType) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (mockMode && actionType === 'generateAI') {
      setTimeout(() => {
        setGeneratedRecipe({ ...mockAiRecipe, id: Date.now() });
        setLoading(false);
        setCurrentPage('generatedRecipeDisplay'); // Transition to the recipe display page
      }, 1500);
      return;
    }

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
        setCurrentPage('generatedRecipeDisplay'); // Transition to the recipe display page
      } else {
        setGeneratedRecipe(data); // In case 'recipe' field is not directly present
      }
      
    } catch (err) {
      console.error("Erreur de génération de recette ou de recherche:", err);
      setError(err.message || "Une erreur inattendue est survenue lors de la génération de recette.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour gérer la navigation entre les pages
  const handleNavigate = (pageId, sectionId = null) => {
    setIsMobileMenuOpen(false); // Ferme le menu mobile lors de la navigation
    setCurrentPage(pageId);
    // Scroll to top of the target page content
    setTimeout(() => {
      let targetSectionId;
      if (pageId === 'home') targetSectionId = 'hero-section'; // Always scroll to top of home
      else if (pageId === 'createRecipeForm') targetSectionId = 'generate-recipe-form';
      else if (pageId === 'generatedRecipeDisplay') targetSectionId = 'generated-recipe-display';
      else if (pageId === 'recipesOverview') targetSectionId = 'recipes-overview-section';

      if (sectionId && pageId === 'home') { // Override for specific section on home
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
    }, 500);
  };

  // Fonction pour basculer le menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to get the transform style based on current page and page order
  const getPageTransformStyle = (pageId) => {
    // If the generated recipe page is active, it's treated as a distinct overlay.
    // Other pages are 'hidden' off to the left.
    if (currentPage === 'generatedRecipeDisplay') {
      if (pageId === 'generatedRecipeDisplay') {
        return { transform: `translateX(0%)` };
      } else {
        // Any other page should be off-screen to the left when generatedRecipeDisplay is active
        return { transform: `translateX(-100%)` };
      }
    }

    // For the main sequential pages (home, createRecipeForm, recipesOverview)
    const thisPageIndex = pageOrder.indexOf(pageId);
    const activePageIndex = pageOrder.indexOf(currentPage);

    // If a page is not part of the current navigation context, hide it off-screen right by default.
    // This helps prevent "empty pages" if the pageId isn't meant to be seen in the current context.
    if (thisPageIndex === -1 || activePageIndex === -1) {
        // This case should ideally not be hit for pages managed by pageOrder,
        // but it's a safeguard for pages like generatedRecipeDisplay when it's not the active one.
        return { transform: `translateX(100%)` };
    }

    const offset = (thisPageIndex - activePageIndex) * 100;
    return { transform: `translateX(${offset}%)` };
  };

  // Swipe gesture handlers
  const onTouchStart = (e) => {
      // Prevent global swipe if interaction is within the carousel
      if (recipeCarouselRef.current && recipeCarouselRef.current.contains(e.target)) {
        return; 
      }
      setTouchEnd(null); // Reset touchEnd to null to ensure it's a new swipe
      setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
      // Prevent global swipe if interaction is within the carousel
      if (recipeCarouselRef.current && recipeCarouselRef.current.contains(e.target)) {
        return;
      }
      setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
      // Prevent global swipe if interaction was within the carousel
      if (recipeCarouselRef.current && recipeCarouselRef.current.contains(document.elementFromPoint(touchEnd, 0))) {
        return;
      }
      // If generatedRecipeDisplay is currently active, prevent swipe navigation from exiting it.
      if (currentPage === 'generatedRecipeDisplay') {
        return;
      }

      if (touchStart === null || touchEnd === null) return; // Ensure touchEnd is not null
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      const currentIndex = pageOrder.indexOf(currentPage);

      if (isLeftSwipe) { // Swiping left = go to next page in order
          if (currentIndex < pageOrder.length - 1) {
              setCurrentPage(pageOrder[currentIndex + 1]);
          }
      } else if (isRightSwipe) { // Swiping right = go to previous page in order
          if (currentIndex > 0) {
              setCurrentPage(pageOrder[currentIndex - 1]);
          }
      }
  };

  // Carousel navigation functions
  const scrollCarousel = (direction) => {
    if (recipeCarouselRef.current) {
      const scrollAmount = recipeCarouselRef.current.offsetWidth * 0.8; // Scroll by 80% of container width
      if (direction === 'left') {
        recipeCarouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        recipeCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Update arrow visibility on carousel scroll
  const handleCarouselScroll = () => {
    if (recipeCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = recipeCarouselRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Initial check and re-check on resize for carousel arrows
  useEffect(() => {
    const carouselElement = recipeCarouselRef.current;
    if (carouselElement) {
      handleCarouselScroll(); // Initial check
      carouselElement.addEventListener('scroll', handleCarouselScroll);
      window.addEventListener('resize', handleCarouselScroll); // Re-check on resize
    }
    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('scroll', handleCarouselScroll);
        window.removeEventListener('resize', handleCarouselScroll);
      }
    };
  }, []); // Run once on mount


  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 flex flex-col h-full">
      {/* Header avec navigation améliorée */}
      <header className="bg-white shadow-sm py-4 px-6 md:px-12 flex justify-between items-center rounded-b-xl relative z-20">
        <div className="flex items-center space-x-2">
          {/* Logo AI & Fines Herbes avec icône de feuille */}
          <LeafIcon />
          <span className="font-bold text-2xl text-green-700">AI & Fines Herbes</span>
        </div>
        <nav className="hidden md:flex space-x-6 text-lg">
          <a href="#" onClick={() => handleNavigate('home')} className="text-gray-600 hover:text-green-700 transition-colors flex items-center"><HomeIcon className="mr-1"/> Accueil</a>
          <a href="#" onClick={() => handleNavigate('home', 'how-it-works')} className="text-gray-600 hover:text-green-700 transition-colors flex items-center"><SparklesIcon className="mr-1"/> Fonctionnalités</a>
          <a href="#" onClick={() => handleNavigate('createRecipeForm')} className="text-gray-600 hover:text-green-700 transition-colors flex items-center"><BrainIcon className="mr-1"/> Créer</a>
          <a href="#" onClick={() => handleNavigate('recipesOverview')} className="text-gray-600 hover:text-green-700 transition-colors flex items-center"><PackageIcon className="mr-1"/> Recettes</a>
          <a href="#" onClick={() => handleNavigate('home', 'newsletter')} className="text-gray-600 hover:text-green-700 transition-colors flex items-center"><ShoppingCartIcon className="mr-1"/> Contact</a>
        </nav>
        {/* Burger menu pour mobile (englobe le bouton et le menu déroulant) */}
        <div className="relative md:hidden">
          <button onClick={toggleMobileMenu} className="p-2 rounded-md hover:bg-gray-100 transition-colors z-30">
            <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
          {isMobileMenuOpen && (
            <nav className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-40 w-48">
              <a href="#" onClick={() => handleNavigate('home')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"><HomeIcon className="mr-2"/> Accueil</a>
              <a href="#" onClick={() => handleNavigate('home', 'how-it-works')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"><SparklesIcon className="mr-2"/> Fonctionnalités</a>
              <a href="#" onClick={() => handleNavigate('createRecipeForm')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"><BrainIcon className="mr-2"/> Créer</a>
              <a href="#" onClick={() => handleNavigate('recipesOverview')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"><PackageIcon className="mr-2"/> Recettes</a>
              <a href="#" onClick={() => handleNavigate('home', 'newsletter')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"><ShoppingCartIcon className="mr-2"/> Contact</a>
            </nav>
          )}
        </div>
      </header>

      {/* Main content area, will contain the sliding pages */}
      {/* Added pb-20 to main to prevent content from being hidden by the fixed footer. Added swipe handlers */}
      <main className="flex-1 w-full overflow-hidden relative h-full pb-20"
            onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        {/* Home Page Content */}
        <div style={getPageTransformStyle('home')} className="absolute inset-0 transition-transform duration-500 ease-in-out overflow-y-auto">
          <section id="hero-section" className="bg-gradient-to-br from-green-50 to-green-200 py-20 px-6 md:px-12 text-center rounded-xl mx-4 my-6 shadow-xl relative overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center space-y-12 md:space-y-0 md:space-x-16">
              <div className="md:w-1/2 text-left z-10">
                {/* Reduced title size */}
                <h1 className="text-4xl md:text-6xl font-extrabold text-green-900 leading-tight mb-6 animate-fade-in-up">
                  L'art culinaire redéfini par l'IA.
                </h1>
                <p className="text-xl md:text-2xl text-gray-800 mb-10 animate-fade-in-up delay-200">
                  Des recettes créées sur mesure, des courses simplifiées, un impact positif.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up delay-400">
                  <button
                    onClick={() => handleNavigate('createRecipeForm')}
                    className="px-8 py-4 bg-green-700 text-white font-bold rounded-full shadow-lg hover:bg-green-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-lg"
                  >
                    <SparklesIcon className="mr-3 h-6 w-6" /> Créez votre recette
                  </button>
                  <button className="px-8 py-4 bg-white text-green-700 border border-green-400 font-bold rounded-full shadow-md hover:bg-green-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                    <ShoppingCartIcon className="mr-3 h-6 w-6" /> Découvrez le panier
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center items-center z-10">
                <img
                  src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="Plat de cuisine saine généré par IA"
                  className="w-full max-w-lg rounded-3xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 ease-out animate-fade-in-right"
                />
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute w-64 h-64 bg-green-300 rounded-full opacity-20 blur-3xl -top-16 -left-16 animate-blob-1"></div>
              <div className="absolute w-80 h-80 bg-yellow-300 rounded-full opacity-15 blur-3xl bottom-0 -right-24 animate-blob-2"></div>
            </div>
          </section>

          <section id="how-it-works" className="py-16 px-6 md:px-12 text-center bg-white rounded-xl mx-4 my-6 shadow-lg">
            {/* Reduced title size */}
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-14">Votre Parcours Culinaire Simplifié</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <div className="flex flex-col items-center p-8 bg-green-50 rounded-2xl shadow-md transform hover:scale-105 transition-transform duration-300">
                <LightbulbIcon className="h-20 w-20 text-green-600 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Exprimez vos envies</h3>
                <p className="text-gray-600 leading-relaxed">Type de cuisine, ingrédients préférés, régime alimentaire, durée... Laissez libre cours à votre imagination.</p>
              </div>
              <div className="flex flex-col items-center p-8 bg-green-50 rounded-2xl shadow-md transform hover:scale-105 transition-transform duration-300">
                <BrainIcon className="h-20 w-20 text-green-600 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">L'IA Imagine et Crée</h3>
                <p className="text-gray-600 leading-relaxed">Notre intelligence artificielle génère une recette unique et parfaitement adaptée à vos critères, en un instant.</p>
              </div>
              <div className="flex flex-col items-center p-8 bg-green-50 rounded-2xl shadow-md transform hover:scale-105 transition-transform duration-300">
                <PackageIcon className="h-20 w-20 text-green-600 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Cuisinez et Savourez</h3>
                <p className="text-gray-600 leading-relaxed">Accédez à la recette, gérez votre liste de courses, et préparez un repas délicieux. Zéro tracas, plaisir maximal !</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-6 md:px-12 rounded-xl mx-4 my-6 shadow-lg">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:space-x-12">
              <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                {/* Reduced title size */}
                <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">Une Technologie au Service du Bien-Manger</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Notre IA est conçue avec une approche éthique et durable, favorisant les produits frais, de saison, et réduisant le gaspillage alimentaire. Chaque recette est pensée pour votre santé et celle de la planète.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  La qualité et la sécurité sont nos priorités. Toutes les créations de l'IA sont soumises à une supervision humaine rigoureuse pour vous garantir une expérience culinaire irréprochable.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="https://images.pexels.com/photos/3184196/pexels-photo-3184196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="Cuisine saine et éthique"
                  className="w-2/3 md:w-full max-w-xs rounded-2xl shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          </section>

          <section id="recipe-carousel-section" className="py-16 px-6 md:px-12 bg-gray-50 rounded-xl mx-4 my-6 shadow-lg relative"> {/* Added relative for arrow positioning */}
            {/* Reduced title size */}
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-10">Découvrez nos Créations Inspirantes</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Plongez dans notre collection de recettes visuellement appétissantes et laissez-vous inspirer pour votre prochain chef-d'œuvre culinaire.
            </p>
            {/* Carousel container with ref and arrow buttons */}
            <div className="flex overflow-x-auto space-x-6 pb-8 snap-x snap-mandatory scrollbar-hide relative" ref={recipeCarouselRef}>
              {showLeftArrow && (
                <button
                  onClick={() => scrollCarousel('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none z-10 hidden md:block" // Hide on small screens
                >
                  <ChevronLeftIcon />
                </button>
              )}
              {showRightArrow && (
                <button
                  onClick={() => scrollCarousel('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none z-10 hidden md:block" // Hide on small screens
                >
                  <ChevronRightIcon />
                </button>
              )}

              <div className="flex-none w-80 md:w-96 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 snap-center">
                <img
                  src="https://images.pexels.com/photos/109968/pexels-photo-109968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="Salade Fraîche et Végétarienne"
                  className="w-full h-52 object-cover rounded-t-2xl"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Salade Fraîche et Végétarienne</h3>
                  <p className="text-gray-600 text-sm">Un plat léger et rapide, parfait pour l'été.</p>
                  <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-700 transition-colors">Voir la recette</button>
                </div>
              </div>

              <div className="flex-none w-80 md:w-96 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 snap-center">
                <img
                  src="https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="Curry de Poulet aux Épices Douces"
                  className="w-full h-52 object-cover rounded-t-2xl"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Curry de Poulet aux Épices Douces</h3>
                  <p className="text-gray-600 text-sm">Un classique réconfortant pour les soirées fraîches.</p>
                  <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-700 transition-colors">Voir la recette</button>
                </div>
              </div>

              <div className="flex-none w-80 md:w-96 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 snap-center">
                <img
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="Pâtes Crémeuses aux Champignons"
                  className="w-full h-52 object-cover rounded-t-2xl"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Pâtes Crémeuses aux Champignons</h3>
                  <p className="text-gray-600 text-sm">Rapidité et saveur, le plat idéal pour un dîner express.</p>
                  <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-700 transition-colors">Voir la recette</button>
                </div>
              </div>

              <div className="flex-none w-80 md:w-96 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 snap-center">
                <img
                  src="https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="Soupe de Lentilles Corail et Carottes"
                  className="w-full h-52 object-cover rounded-t-2xl"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Soupe de Lentilles Corail et Carottes</h3>
                  <p className="text-gray-600 text-sm">Une soupe réconfortante et pleine de nutriments.</p>
                  <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-700 transition-colors">Voir la recette</button>
                </div>
              </div>

              {/* Ajoutez plus de cartes ici */}
            </div>
          </section>

          <section id="existing-recipes" className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg">
            {/* Reduced title size */}
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-10">Découvrez nos Recettes Existantes !</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Explorez une variété de créations culinaires déjà disponibles, adaptées à divers goûts et besoins.
            </p>
            <div className="text-center p-8 bg-gray-100 rounded-lg">
                <p className="text-xl text-gray-600 font-semibold">Le composant RecipeList sera affiché ici.</p>
                <p className="text-gray-500">Assurez-vous qu'il est importé et rendu dans votre App.jsx.</p>
            </div>
          </section>

          <section id="newsletter" className="bg-gradient-to-br from-green-700 to-green-900 text-white py-16 px-6 md:px-12 text-center rounded-xl mx-4 my-6 shadow-lg">
            {/* Reduced title size */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Recevez nos recettes éthiques et gourmandes chaque semaine</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Abonnez-vous à notre newsletter pour ne jamais manquer une inspiration culinaire personnalisée, des astuces anti-gaspillage et des offres exclusives.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <input
                type="email"
                placeholder="Votre adresse email..."
                className="w-full sm:w-80 p-4 rounded-full border border-green-500 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
              />
              <button className="px-8 py-4 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
                Je m'inscris
              </button>
            </div>
          </section>
        </div>

        {/* Create Recipe Form Page Content */}
        <div style={getPageTransformStyle('createRecipeForm')} className="absolute inset-0 transition-transform duration-500 ease-in-out overflow-y-auto">
          <section id="generate-recipe-form" className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg flex-1">
            <div className="flex items-center mb-6">
              <button onClick={() => handleNavigate('home')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              </button>
              {/* Reduced title size */}
              <h2 className="text-3xl md:text-4xl font-bold text-green-800">Générez Votre Recette Personnalisée !</h2>
            </div>
            <form onSubmit={(e) => handleSubmit(e, 'generateAI')} className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-xl space-y-6 border border-green-200">
              {error && <p className="text-red-600 text-center font-medium">{error}</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cuisineType" className="block text-gray-700 font-semibold mb-2">Type de cuisine</label>
                  <input
                    type="text"
                    id="cuisineType"
                    name="cuisineType"
                    value={preferences.cuisineType}
                    onChange={handleChange}
                    placeholder="Ex: Méditerranéenne, Asiatique..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="numPeople" className="block text-gray-700 font-semibold mb-2">Nombre de personnes</label>
                  <input
                    type="number"
                    id="numPeople"
                    name="numPeople"
                    value={preferences.numPeople}
                    onChange={handleChange}
                    min="1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="maxDuration" className="block text-gray-700 font-semibold mb-2">Durée maximale (min)</label>
                  <input
                    type="number"
                    id="maxDuration"
                    name="maxDuration"
                    value={preferences.maxDuration}
                    onChange={handleChange}
                    min="10"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Niveau de difficulté</label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={preferences.difficulty}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white"
                  >
                    <option value="Facile">Facile</option>
                    <option value="Moyen">Moyen</option>
                    <option value="Difficile">Difficile</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="ingredients" className="block text-gray-700 font-semibold mb-2">Ingrédients (séparés par des virgules)</label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  value={preferences.ingredients}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Ex: poulet, brocoli, riz, sauce soja..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="maxIngredients" className="block text-gray-700 font-semibold mb-2">Max. ingrédients</label>
                  <input
                    type="number"
                    id="maxIngredients"
                    name="maxIngredients"
                    value={preferences.maxIngredients}
                    onChange={handleChange}
                    min="1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="recipeGoal" className="block text-gray-700 font-semibold mb-2">Objectif de la recette</label>
                  <input
                    type="text"
                    id="recipeGoal"
                    name="recipeGoal"
                    value={preferences.recipeGoal}
                    onChange={handleChange}
                    placeholder="Ex: Rapide, Sain, Pour enfants..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  id="robotCompatible"
                  name="robotCompatible"
                  checked={preferences.robotCompatible}
                  onChange={handleChange}
                  className="mr-2 h-5 w-5 text-green-600 rounded focus:ring-green-500"
                />
                <label htmlFor="robotCompatible" className="text-gray-700 font-semibold">Compatible robot de cuisine</label>
                <KitchenRobotIcon className="ml-2 h-6 w-6 text-gray-600" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button
                      type="submit"
                      className="flex-1 py-4 bg-green-700 text-white font-bold text-lg rounded-full shadow-lg hover:bg-green-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                      disabled={loading}
                  >
                      {loading ? (
                      <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Génération AI en cours...
                      </>
                      ) : (
                      <>
                          <SparklesIcon className="mr-2 h-6 w-6" /> Générer la Recette IA
                      </>
                      )}
                  </button>
                  <button
                      type="button"
                      onClick={(e) => handleSubmit(e, 'searchExisting')}
                      className="flex-1 py-4 bg-blue-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                      disabled={loading}
                  >
                      {loading ? (
                      <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Recherche en cours...
                      </>
                      ) : (
                      <>
                          <ShoppingCartIcon className="mr-2 h-6 w-6" /> Rechercher une Recette Ex. par Ingrédients
                      </>
                      )}
                  </button>
              </div>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setMockMode(!mockMode)}
                  className={`text-sm py-2 px-4 rounded-full transition-colors duration-200 ${
                    mockMode ? 'bg-blue-200 text-blue-800 hover:bg-blue-300' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Mode Mock: {mockMode ? 'Activé' : 'Désactivé'}
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Generated Recipe Display Page Content */}
        {/* Only render this section if generatedRecipe is not null, so it doesn't show empty */}
        {/* This page is NOT part of the linear swipe order */}
        <div style={getPageTransformStyle('generatedRecipeDisplay')} className="absolute inset-0 transition-transform duration-500 ease-in-out overflow-y-auto">
          {generatedRecipe && (
            <section id="generated-recipe-display" className="py-16 px-6 md:px-12 bg-gray-50 rounded-xl mx-4 my-6 shadow-lg">
                <div className="flex items-center mb-6">
                    {/* Back button to go to createRecipeForm */}
                    <button onClick={() => handleNavigate('createRecipeForm')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </button>
                    {/* Reduced title size */}
                    <h2 className="text-3xl md:text-4xl font-bold text-green-700 flex items-center">
                        <CheckCircleIcon className="mr-3 h-8 w-8 text-green-500" /> {generatedRecipe.title}
                    </h2>
                </div>
                <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-green-200">
                    {generatedRecipe.imageUrl && (
                        <img
                            src={generatedRecipe.imageUrl}
                            alt={generatedRecipe.title}
                            className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/CCCCCC/666666?text=Image+non+disponible"; }}
                        />
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {generatedRecipe.aiTested && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Recette testée par l'IA
                            </span>
                        )}
                        {generatedRecipe.robotCompatible && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"> {/* Removed ml-2 here */}
                                Compatible robot de cuisine
                            </span>
                        )}
                    </div>
                    <p className="text-gray-700 mb-4">
                        <span className="font-semibold">Durée :</span> {generatedRecipe.duration}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Ingrédients :</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
                        {generatedRecipe.ingredients && generatedRecipe.ingredients.map((item, index) => (
                            <li key={index}>
                                <span className="font-semibold">{item.name}</span>: {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Étapes :</h3>
                    <ol className="list-decimal list-inside text-gray-700 space-y-2">
                        {generatedRecipe.steps && generatedRecipe.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200">
                            Ajouter au panier
                        </button>
                        <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full shadow-md hover:bg-purple-700 transition-colors duration-200">
                            Exporter pour Robot
                        </button>
                        <button className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-full shadow-md hover:bg-gray-300 transition-colors duration-200">
                            Noter la recette
                        </button>
                    </div>
                </div>
            </section>
          )}
        </div>

        {/* New Recipes Overview Page Content */}
        <div style={getPageTransformStyle('recipesOverview')} className="absolute inset-0 transition-transform duration-500 ease-in-out overflow-y-auto">
            <section id="recipes-overview-section" className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg">
                <div className="flex items-center mb-6">
                    <button onClick={() => handleNavigate('home')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </button>
                    {/* Reduced title size */}
                    <h2 className="text-3xl md:text-4xl font-bold text-green-800">Nos Recettes</h2>
                </div>
                <p className="text-lg text-gray-700 mb-8">Découvrez toutes les façons de trouver l'inspiration culinaire :</p>

                {/* Section: Recettes générées par l'IA */}
                <div className="mb-12 p-8 bg-green-50 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center"><SparklesIcon className="mr-2"/> Recettes Générées par l'IA</h3>
                    <p className="text-gray-700 mb-4">Laissez notre intelligence artificielle vous concocter des créations uniques, adaptées à vos moindres désirs. Chaque recette est une nouvelle aventure culinaire !</p>
                    <button onClick={() => handleNavigate('createRecipeForm')} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors">Générer une Recette IA</button>
                </div>

                {/* Section: Recettes inspirantes existantes */}
                <div className="mb-12 p-8 bg-blue-50 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center"><PackageIcon className="mr-2"/> Recettes Inspirantes Existantes</h3>
                    <p className="text-gray-700 mb-4">Explorez notre bibliothèque de recettes déjà validées, créées par nos experts culinaires et par notre communauté. Idéales pour trouver l'inspiration rapidement !</p>
                    <button onClick={() => handleNavigate('home', 'recipe-carousel-section')} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">Explorer les Recettes</button>
                </div>

                {/* Section: Mes recettes */}
                <div className="p-8 bg-purple-50 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-purple-700 mb-4 flex items-center"><UserIcon className="mr-2"/> Mes Recettes</h3>
                    <p className="text-gray-700 mb-4">Retrouvez toutes vos recettes favorites, celles que vous avez générées ou sauvegardées. Votre carnet de recettes personnel, toujours à portée de main !</p>
                    <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors">Voir Mes Recettes</button>
                </div>
            </section>
        </div>
      </main>

      {/* Pied de page simple et élégant, TOUJOURS visible */}
      {/* Fixed height (h-20) and py-0 (padding is managed by internal flex) */}
      <footer className="bg-white shadow-lg h-20 text-center fixed bottom-0 left-0 right-0 z-50 rounded-t-xl flex justify-around items-center">
        <nav className="flex justify-around items-center w-full text-sm h-full">
          <a href="#" onClick={() => handleNavigate('home')} className="text-gray-600 hover:text-green-700 transition-colors flex flex-col items-center justify-center h-full w-1/4 rounded-md hover:bg-gray-100">
            <HomeIcon className="h-6 w-6"/>
            <span>Accueil</span>
          </a>
          <a href="#" onClick={() => handleNavigate('recipesOverview')} className="text-gray-600 hover:text-green-700 transition-colors flex flex-col items-center justify-center h-full w-1/4 rounded-md hover:bg-gray-100">
            <PackageIcon className="h-6 w-6"/>
            <span>Recettes</span>
          </a>
          <a href="#" onClick={() => handleNavigate('home', 'shopping-cart-section')} className="text-gray-600 hover:text-green-700 transition-colors flex flex-col items-center justify-center h-full w-1/4 rounded-md hover:bg-gray-100">
            <ShoppingCartIcon className="h-6 w-6"/>
            <span>Panier</span>
          </a>
          <a href="#" className="text-gray-600 hover:text-green-700 transition-colors flex flex-col items-center justify-center h-full w-1/4 rounded-md hover:bg-gray-100">
            <UserIcon className="h-6 w-6"/>
            <span>Profil</span>
          </a>
        </nav>
      </footer>
    </div>
  );
}

export default App;
