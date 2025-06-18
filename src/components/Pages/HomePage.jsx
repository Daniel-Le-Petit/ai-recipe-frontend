// frontend/src/components/Pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate pour la navigation
import { Link } from 'react-router-dom';
import './HomePage.css'; // <-- Style de navigation de la Home page

const HomePage = () => {
  const navigate = useNavigate(); // Initialisation du hook navigate (gardé au cas où, même si Link est priorisé)

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
        {/* Le Link est le conteneur principal et devient 'relative' */}
        <Link to="/creer-recette-ia"
              className="block bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col overflow-hidden group relative"> {/* <-- Ajout de 'relative' ici */}
          <img
            src="/image/Recette_IA.jfif" // Chemin correct depuis la racine 'public'
            alt="Une assiette de pâtes créative"
            className="w-full h-48 object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.onerror = null; e.target.src="/image/placeholder.png"; }} // Fallback to a generic placeholder
          />
          
          {/* Nouveau conteneur pour le texte, positionné absolument */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-3xl"> {/* <-- Nouvelle div pour le texte */}
            <h3 className="text-xl font-bold text-white mb-1">Créez votre recette IA</h3> {/* <-- Ajustement de la taille et couleur de police */}
            <p className="text-sm text-gray-200"> {/* <-- Ajustement de la taille et couleur de police */}
              Laissez notre intelligence artificielle concocter une recette unique, adaptée à vos envies et aux ingrédients que vous avez sous la main.
            </p>
          </div>
        </Link>

        {/* Carte 2: Trouver une recette par ingrédient (appliquez les mêmes changements ici) */}
        <Link to="/trouver-recette-existante"
              className="block bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col overflow-hidden group relative"> {/* <-- N'oubliez pas 'relative' */}
          <img
            src="/image/Cuisiner_ingredients.jfif" // Placeholder Ingredients
            alt="Mains préparant des légumes frais"
            className="w-full h-48 object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.onerror = null; e.target.src="/image/placeholder.png"; }} // Fallback to a generic placeholder
          />
          {/* Copiez le bloc de texte absolu ici */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-3xl">
            <h3 className="text-xl font-bold text-white mb-1">Trouvez votre recette par ingrédient</h3>
            <p className="text-sm text-gray-200">
              Utilisez ce que vous avez déjà ! Entrez vos ingrédients et découvrez des recettes existantes qui les mettent à l'honneur.
            </p>
          </div>
        </Link>

        {/* Carte 3: Explorer les recettes inspirantes (appliquez les mêmes changements ici) */}
        <Link to="/explorer-recettes"
              className="block bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col overflow-hidden group relative"> {/* <-- N'oubliez pas 'relative' */}
          <img
            src="/image/recette_inspirantes.jfif" // Placeholder Inspiring Recipes
            alt="Table remplie de plats variés et colorés"
            className="w-full h-48 object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.onerror = null; e.target.src="/image/placeholder.png"; }} // Fallback to a generic placeholder
          />
          {/* Copiez le bloc de texte absolu ici */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-3xl">
            <h3 className="text-xl font-bold text-white mb-1">Explorez nos recettes inspirantes</h3>
            <p className="text-sm text-gray-200">
              Parcourez une sélection de recettes gourmandes et saines, choisies pour vous inspirer au quotidien et varier les plaisirs.
            </p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
