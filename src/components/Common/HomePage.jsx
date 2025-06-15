// src/components/Pages/HomePage.jsx
import React, { useRef, useEffect, useState } from 'react';
import { SparklesIcon, ShoppingCartIcon, LightbulbIcon, BrainIcon, PackageIcon, ChevronLeftIcon, ChevronRightIcon } from '../Common/Icons'; // Importez les icônes

const HomePage = ({ handleNavigate }) => {
  const recipeCarouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

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
  }, []);


  return (
    <>
      <section id="hero-section" className="bg-gradient-to-br from-green-50 to-green-200 py-20 px-6 md:px-12 text-center rounded-xl mx-4 my-6 shadow-xl relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center space-y-12 md:space-y-0 md:space-x-16">
          <div className="md:w-1/2 text-left z-10">
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

      <section id="recipe-carousel-section" className="py-16 px-6 md:px-12 bg-gray-50 rounded-xl mx-4 my-6 shadow-lg relative">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-10">Découvrez nos Créations Inspirantes</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Plongez dans notre collection de recettes visuellement appétissantes et laissez-vous inspirer pour votre prochain chef-d'œuvre culinaire.
        </p>
        <div className="flex overflow-x-auto space-x-6 pb-8 snap-x snap-mandatory scrollbar-hide relative" ref={recipeCarouselRef}>
          {showLeftArrow && (
            <button
              onClick={() => scrollCarousel('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none z-10 block"
            >
              <ChevronLeftIcon />
            </button>
          )}
          {showRightArrow && (
            <button
              onClick={() => scrollCarousel('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none z-10 block"
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
        </div>
      </section>

      <section id="existing-recipes" className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg">
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
    </>
  );
};

export default HomePage;
