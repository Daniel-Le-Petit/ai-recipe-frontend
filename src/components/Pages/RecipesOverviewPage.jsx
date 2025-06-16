// src/components/Pages/RecipesOverviewPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate
import RecipeList from '../../RecipeList'; // Importez le composant RecipeList

const RecipesOverviewPage = () => {
  const navigate = useNavigate(); // Initialisation du hook navigate

  return (
    <section id="recipes-overview-section" className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">Toutes nos Recettes</h2>
      </div>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl mx-auto">
        Découvrez notre collection complète de recettes.
      </p>

      {/* Ici, le composant RecipeList va être rendu pour afficher la liste réelle des recettes */}
      <RecipeList />

    </section>
  );
};

export default RecipesOverviewPage;

