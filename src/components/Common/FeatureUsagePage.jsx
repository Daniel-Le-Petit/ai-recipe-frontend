// src/components/Pages/FeatureUsagePage.jsx
import React from 'react';
import { SparklesIcon, ShoppingCartIcon, PackageIcon, BookOpenIcon } from '../Common/Icons'; // Importez les icônes

const FeatureUsagePage = ({ handleNavigate }) => {
  return (
    <section id="feature-usage-section" className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg">
      <div className="flex items-center mb-6">
        <button onClick={() => handleNavigate('profilePage')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">Utilisation des Fonctionnalités</h2>
      </div>
      <div className="max-w-6xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
        <p className="text-center text-gray-600 mb-6">Visualisez les fonctionnalités les plus populaires de votre application.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center"><SparklesIcon className="mr-2"/> Générer une Recette IA</h3>
                <p className="text-4xl font-bold text-green-600">75%</p>
                <p className="text-gray-600">des utilisateurs l'utilisent régulièrement</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-purple-700 mb-3 flex items-center"><ShoppingCartIcon className="mr-2"/> Rechercher une Recette existante</h3>
                <p className="text-4xl font-bold text-purple-600">50%</p>
                <p className="text-gray-600">des utilisateurs l'utilisent souvent</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3 flex items-center"><PackageIcon className="mr-2"/> Explorer les Recettes Inspirantes</h3>
                <p className="text-4xl font-bold text-blue-600">60%</p>
                <p className="text-gray-600">des utilisateurs l'explorent</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-orange-700 mb-3 flex items-center"><BookOpenIcon className="mr-2"/> Voir Mes Recettes</h3>
                <p className="text-4xl font-bold text-orange-600">30%</p>
                <p className="text-gray-600">des utilisateurs consultent leurs recettes</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureUsagePage;
