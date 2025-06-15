// src/components/Pages/RecipesOverviewPage.jsx
import React from 'react';
import RecipeList from '../RecipeList'; // RecipeList est déjà un composant séparé
// Supprimé les icônes SparklesIcon, ShoppingCartIcon, PackageIcon car non utilisées directement ici
// Supprimé handleNavigate car non utilisé directement ici

const RecipesOverviewPage = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50 rounded-xl mx-4 my-6 shadow-lg">
      <h2 className="text-4xl font-bold text-green-800 text-center mb-10">Toutes Nos Recettes</h2>
      {/* Le composant RecipeList récupère et affiche déjà toutes les recettes */}
      <RecipeList />
    </section>
  );
};

export default RecipesOverviewPage;
