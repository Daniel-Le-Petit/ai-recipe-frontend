// src/components/Pages/GeneratedRecipeDisplayPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate
import { CheckCircleIcon } from '../Common/Icons'; // Importez les icônes

const GeneratedRecipeDisplayPage = ({ generatedRecipe }) => { // Plus besoin de handleNavigate en prop
  const navigate = useNavigate(); // Initialisation du hook navigate

  if (!generatedRecipe) {
    return (
      <section className="py-16 px-6 md:px-12 bg-gray-50 rounded-xl mx-4 my-6 shadow-lg text-center text-gray-500">
        <p>Aucune recette générée à afficher.</p>
        <button onClick={() => navigate('/generate-recipe')} className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors">
          Générer une recette
        </button>
      </section>
    );
  }

  return (
    <section id="generated-recipe-display" className="py-16 px-6 md:px-12 bg-gray-50 rounded-xl mx-4 my-6 shadow-lg">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/generate-recipe')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
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
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
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
  );
};

export default GeneratedRecipeDisplayPage;

