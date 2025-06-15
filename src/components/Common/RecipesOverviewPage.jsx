// src/components/Pages/RecipesOverviewPage.jsx
import React from 'react';
import { SparklesIcon, ShoppingCartIcon, PackageIcon } from '../Common/Icons'; // Importez les icônes

const RecipesOverviewPage = ({ handleNavigate }) => {
  return (
    <section id="recipes-overview-section" className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg">
      <div className="flex items-center mb-6">
        <button onClick={() => handleNavigate('home')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">Nos Recettes</h2>
      </div>
      <p className="text-lg text-gray-700 mb-8">Découvrez toutes les façons de trouver l'inspiration culinaire :</p>

      <div className="mb-12 p-8 bg-green-50 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center"><SparklesIcon className="mr-2"/> Générer une Recette IA</h3>
        <p className="text-gray-700 mb-4">Laissez notre intelligence artificielle vous concocter des créations uniques, adaptées à vos moindres désirs. Chaque recette est une nouvelle aventure culinaire !</p>
        <button onClick={() => handleNavigate('createRecipeForm')} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors">Créer une Recette IA</button>
      </div>

      <div className="mb-12 p-8 bg-purple-50 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-purple-700 mb-4 flex items-center"><ShoppingCartIcon className="mr-2"/> Rechercher une Recette existante par ingrédients</h3>
        <p className="text-gray-700 mb-4">Besoin d'une idée pour vos ingrédients sous la main ? Trouvez des recettes adaptées en un instant dans notre base de données existante.</p>
        <button onClick={() => handleNavigate('createRecipeForm')} className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors">Rechercher par Ingrédients</button>
      </div>

      <div className="mb-12 p-8 bg-blue-50 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center"><PackageIcon className="mr-2"/> Recettes Inspirantes Existantes</h3>
        <p className="text-gray-700 mb-4">Explorez notre bibliothèque de recettes déjà validées, créées par nos experts culinaires et par notre communauté. Idéales pour trouver l'inspiration rapidement !</p>
        <button onClick={() => handleNavigate('home', 'recipe-carousel-section')} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">Explorer les Recettes</button>
      </div>
    </section>
  );
};

export default RecipesOverviewPage;
