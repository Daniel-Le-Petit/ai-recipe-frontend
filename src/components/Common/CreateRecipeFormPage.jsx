// src/components/Pages/CreateRecipeFormPage.jsx
import React from 'react';
import { SparklesIcon, ShoppingCartIcon, KitchenRobotIcon } from '../Common/Icons'; // Importez les icônes

const CreateRecipeFormPage = ({ preferences, handleChange, handleSubmit, loading, error, mockMode, setMockMode, handleNavigate }) => {
  return (
    <section id="generate-recipe-form" className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg flex-1">
      <div className="flex items-center mb-6">
        <button onClick={() => handleNavigate('home')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
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
  );
};

export default CreateRecipeFormPage;
