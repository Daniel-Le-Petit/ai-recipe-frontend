// frontend/src/components/Pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate pour la navigation

const HomePage = () => {
  const navigate = useNavigate(); // Initialisation du hook navigate

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gradient-to-br from-green-50 to-emerald-100 px-4 sm:px-6 lg:px-8">
      {/* Bannière principale */}
      <section className="text-center mb-16 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 leading-tight mb-4 animate-fade-in-down">
          AI & Fines Herbes
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 animate-fade-in-up">
          Votre allié culinaire pour des recettes uniques, saines et personnalisées.
          <br />Vos courses en un clic.
        </p>
      </section>

      {/* Grille des fonctionnalités */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
        {/* Carte 1: Créer une recette IA */}
        <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col overflow-hidden group">
          <img
            src="/images/Recette_IA.jfif" // CHEMIN DE L'IMAGE CORRIGÉ
            alt="Une assiette de pâtes créative"
            className="w-full h-48 object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.onerror = null; e.target.src="/images/Recette_IA.jfif"; }}
          />
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-green-700 mb-3">Créez votre recette IA</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Laissez notre intelligence artificielle concocter une recette unique, adaptée à vos envies et aux ingrédients que vous avez sous la main.
            </p>
            <button
              onClick={() => navigate('/generate-recipe')}
              className="mt-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition-colors transform hover:scale-105"
            >
              Générer une recette IA
            </button>
          </div>
        </div>

        {/* Carte 2: Trouver une recette par ingrédient */}
        <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col overflow-hidden group">
          <img
            src="https://images.pexels.com/photos/3434685/pexels-photo-3434685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Placeholder Ingredients
            alt="Mains préparant des légumes frais"
            className="w-full h-48 object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.onerror = null; e.target.src="Cuisiner_ingredients.jfif"; }}
          />
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-green-700 mb-3">Trouvez votre recette par ingrédient</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Utilisez ce que vous avez déjà ! Entrez vos ingrédients et découvrez des recettes existantes qui les mettent à l'honneur.
            </p>
            <button
              onClick={() => navigate('/recipes-overview')}
              className="mt-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-colors transform hover:scale-105"
            >
              Voir les recettes existantes
            </button>
          </div>
        </div>

        {/* Carte 3: Explorer les recettes inspirantes */}
        <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col overflow-hidden group">
          <img
            src="https://images.pexels.com/photos/10313883/pexels-photo-10313883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Placeholder Inspiring Recipes
            alt="Table remplie de plats variés et colorés"
            className="w-full h-48 object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.onerror = null; e.target.src="recette_inspirantes.jfif"; }}
          />
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-green-700 mb-3">Explorez nos recettes inspirantes</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Parcourez une sélection de recettes gourmandes et saines, choisies pour vous inspirer au quotidien et varier les plaisirs.
            </p>
            <button
              onClick={() => navigate('/recipes-overview')}
              className="mt-auto px-6 py-3 bg-purple-600 text-white font-semibold rounded-full shadow-md hover:bg-purple-700 transition-colors transform hover:scale-105"
            >
              Découvrir toutes les recettes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
