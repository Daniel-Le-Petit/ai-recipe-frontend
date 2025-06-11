// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import './index.css'; // Assurez-vous que TailwindCSS est bien importé ici

// Icône de Feuille Verte pour le titre
const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#388E3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 18 2.2 18 2c0 2.1-2 3.9-3 5.5C11.9 15.3 8.5 19.5 11 20Z"/><path d="M2 21c0-3 1.8-5.7 4.5-8.5C9.3 10 12 8.2 15 8"/>
  </svg>
);


// Définition des icônes utilisées dans l'interface (SVG inline)
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

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-8.9"/><path d="m14 2 6 6"/><path d="m3 12 2 2 4-4"/>
  </svg>
);

const KitchenRobotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-robot">
    <path d="M10 20H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/><path d="M12 10h.01"/><path d="M17 10h.01"/><path d="M10 14h4"/><path d="M12 17v3"/><path d="M19 17v3"/><path d="M19 14h-2"/><path d="M5 13H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"/><path d="M16 13h-1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"/>
  </svg>
);

// Icônes spécifiques pour la section "Comment ça marche"
const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 22v-4"/>
  </svg>
);

const AiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain">
    <path d="M12 12c2-2.5 4-4 5-8 1.4 1.1 2.2 2.5 2.2 4.1 0 2.2-1.3 4.3-3.3 5.7.5 1.4.8 2.8.8 4.3 0 1.9-1.3 3.5-3.2 4.1.3.9.6 1.8.6 2.8 0 1.1-1.3 2-3 2s-3-.9-3-2c0-1 .3-1.9.6-2.8-1.9-.6-3.2-2.2-3.2-4.1 0-1.5.3-2.9.8-4.3-2-1.4-3.3-3.5-3.3-5.7 0-1.6.8-3 2.2-4.1 1 4 3 5.5 5 8z"/>
  </svg>
);

const DeliveryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package">
    <path d="m7.5 4.27 9 5.15"/><path d="m7.5 19.73 9-5.15"/><path d="M3.3 8.7L12 3l8.7 5.7"/><path d="M12 22 3.3 16.3 12 10.5 20.7 16.3Z"/><path d="M12 3v7.5"/><path d="M12 10.5v7.5"/>
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
  const [mockMode, setMockMode] = useState(false); 
  const [showRecipeForm, setShowRecipeForm] = useState(false);

  // --- CONFIGURATION DE L'URL DU BACKEND ---
  // Pour le développement local, nous utilisons http://localhost:1338
  const STRAPI_BACKEND_URL = "http://localhost:1338"; 
  // Pour le déploiement en production, vous utiliseriez:
  // const STRAPI_BACKEND_URL = import.meta.env.VITE_APP_STRAPI_API_URL;


  // Données de recette mockées pour la génération IA (si mockMode actif)
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
    // NOUVEAU: URL d'image de substitution pour le mode mock
    imageUrl: "https://placehold.co/600x400/007BFF/FFFFFF?text=Mock+Image" 
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Ajout d'un paramètre actionType pour distinguer la génération de la recherche
  const handleSubmit = async (e, actionType) => {
    e.preventDefault();
    console.log("handleSubmit called with actionType:", actionType); // Débogage
    setLoading(true);
    setError('');
    setGeneratedRecipe(null);

    // Si c'est le mode mock pour l'IA, on utilise les données mockées
    // Cette condition ne sera plus remplie si mockMode est false
    if (mockMode && actionType === 'generateAI') {
      console.log("Mock mode active for AI generation."); // Débogage
      setTimeout(() => {
        setGeneratedRecipe({ ...mockAiRecipe, id: Date.now() });
        setLoading(false);
      }, 1500);
      return; // Retourne ici, donc pas d'appel fetch
    }

    // Préparation des données à envoyer au backend
    let dataToSend = {
      actionType: actionType, // 'generateAI' ou 'searchExisting'
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

    console.log("Sending data to backend:", dataToSend); // Débogage
    console.log("Backend URL:", STRAPI_BACKEND_URL); // Débogage

    try {
      const response = await fetch(`${STRAPI_BACKEND_URL}/api/recipe-generator/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      console.log("Received response from fetch:", response); // Débogage

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error response:", errorData); // Débogage
        throw new Error(errorData.message || `Erreur HTTP! Statut: ${response.status}`);
      }

      const data = await response.json();
      console.log("Parsed backend data:", data); // Débogage
      if (data.recipe) {
        setGeneratedRecipe(data.recipe);
      } else {
        setGeneratedRecipe(data);
      }
      
    } catch (err) {
      console.error("Erreur de génération de recette ou de recherche (catch block):", err); // Débogage
      setError(err.message || "Une erreur inattendue est survenue lors de la génération de recette.");
    } finally {
      setLoading(false);
      console.log("Loading set to false."); // Débogage
    }
  };

  const scrollToForm = () => {
    setShowRecipeForm(true);
    setTimeout(() => {
      document.getElementById('generate-recipe-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };


  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 flex flex-col">
      {/* Header avec navigation améliorée */}
      <header className="bg-white shadow-sm py-4 px-6 md:px-12 flex justify-between items-center rounded-b-xl">
        <div className="flex items-center space-x-2">
          {/* Logo AI & Fines Herbes avec icône de feuille */}
          <LeafIcon />
          <span className="font-bold text-2xl text-green-700">AI & Fines Herbes</span>
        </div>
        <nav className="hidden md:flex space-x-6 text-lg">
          <a href="#" className="text-gray-600 hover:text-green-700 transition-colors">Accueil</a>
          <a href="#" className="text-gray-600 hover:text-green-700 transition-colors">Fonctionnalités</a>
          <a href="#" className="text-gray-600 hover:text-green-700 transition-colors">Recettes</a>
          <a href="#" className="text-gray-600 hover:text-green-700 transition-colors">À propos</a>
          <a href="#" className="text-gray-600 hover:text-green-700 transition-colors">Connexion</a>
        </nav>
        {/* Burger menu for mobile - conceptual */}
        <button className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </header>

      {/* Section Héro - Première partie de la maquette */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-16 px-6 md:px-12 text-center rounded-xl mx-4 my-6 shadow-lg">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
          <div className="md:w-1/2 text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 leading-tight mb-6">
              Vos recettes sur-mesure, vos courses en un clic.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              L'IA qui cuisine selon vos envies... et fait les courses pour vous.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={scrollToForm}
                className="px-8 py-4 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <SparklesIcon className="mr-2 h-6 w-6" /> Créer une recette
              </button>
              <button className="px-8 py-4 bg-white text-green-700 border border-green-300 font-semibold rounded-full shadow-md hover:bg-green-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <ShoppingCartIcon className="mr-2 h-6 w-6" /> Voir panier
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            {/* Image de panier IA améliorée */}
            <img src="https://images.pexels.com/photos/6347901/pexels-photo-6347901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" alt="Illustration Panier IA" className="w-2/3 md:w-full max-w-sm drop-shadow-xl rounded-lg" />
          </div>
        </div>
      </section>

      {/* Section "Comment ça marche" - Basée sur la maquette */}
      <section className="py-16 px-6 md:px-12 text-center bg-white rounded-xl mx-4 my-6 shadow-lg">
        <h2 className="text-4xl font-bold text-green-800 mb-12">Comment ça marche</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-green-50 rounded-lg shadow-sm">
            <LightbulbIcon className="h-16 w-16 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Choisissez vos envies</h3>
            <p className="text-gray-600">Type de cuisine, régime, préférences...</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-green-50 rounded-lg shadow-sm">
            <AiIcon className="h-16 w-16 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">L'IA crée une recette personnalisée</h3>
            <p className="text-gray-600">Adaptée à vos goûts et contraintes.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-green-50 rounded-lg shadow-sm">
            <DeliveryIcon className="h-16 w-16 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Vos ingrédients sont ajoutés au panier</h3>
            <p className="text-gray-600">Simplifiez votre liste de courses.</p>
          </div>
        </div>
      </section>

      {/* Section "Technologie Responsable" - Basée sur la maquette */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-6 md:px-12 rounded-xl mx-4 my-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-4xl font-bold text-blue-800 mb-6">Technologie Responsable</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Une IA éthique, pensée pour bien manger, sans gaspiller. Nous favorisons les produits locaux, de saison et les circuits courts.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Toutes les recettes sont soumises à une supervision humaine pour garantir qualité, sécurité et respect de vos préférences.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {/* Image de recette IA améliorée */}
            <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Illustration Recette sur Mobile" className="w-2/3 md:w-full max-w-xs rounded-xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300" />
          </div>
        </div>
      </section>
      
      {/* Formulaire de Génération de Recettes - Conditionnellement affiché ou défilé */}
      {showRecipeForm && (
        <section id="generate-recipe-form" className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg">
          <h2 className="text-4xl font-bold text-green-800 text-center mb-10">Générez Votre Recette !</h2>
          <form className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-xl space-y-6 border border-green-200">
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
                    type="button" // Important: utilisez 'button' pour éviter la soumission par défaut
                    onClick={(e) => handleSubmit(e, 'generateAI')}
                    className="flex-1 py-4 bg-green-700 text-white font-bold text-lg rounded-full shadow-lg hover:bg-green-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    disabled={loading}
                >
                    {loading && preferences.actionType === 'generateAI' ? (
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
                    type="button" // Important: utilisez 'button' pour éviter la soumission par défaut
                    onClick={(e) => handleSubmit(e, 'searchExisting')}
                    className="flex-1 py-4 bg-blue-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    disabled={loading}
                >
                    {loading && preferences.actionType === 'searchExisting' ? (
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

            {/* Bouton pour basculer le mode Mock (pour les tests) */}
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
      )}

      {/* Affichage de la Recette Générée */}
      {generatedRecipe && (
        <section className="py-16 px-6 md:px-12 bg-gray-50 rounded-xl mx-4 my-6 shadow-lg">
          <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-green-200">
            <h2 className="text-4xl font-bold text-green-700 mb-6 flex items-center">
              <CheckCircleIcon className="mr-3 h-8 w-8 text-green-500" /> {generatedRecipe.title}
            </h2>
            {/* NEW: Affichage de l'image de la recette */}
            {generatedRecipe.imageUrl && (
              <img 
                src={generatedRecipe.imageUrl} 
                alt={generatedRecipe.title} 
                className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/CCCCCC/666666?text=Image+non+disponible"; }} // Fallback image
              />
            )}

            {/* Badge IA Testée (si applicable) */}
            {generatedRecipe.aiTested && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                Recette testée par l'IA
              </span>
            )}
            {generatedRecipe.robotCompatible && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 ml-2 mb-4">
                Compatible robot de cuisine
              </span>
            )}

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

            {/* Boutons d'action pour la recette */}
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

      {/* Pied de page simple */}
      <footer className="bg-gray-800 text-white py-8 text-center rounded-t-xl mt-auto">
        <p>&copy; {new Date().getFullYear()} AI & Fines Herbes. Tous droits réservés.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Politique de Confidentialité</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Mentions Légales</a>
        </div>
      </footer>
    </div>
  );
}

export default App;