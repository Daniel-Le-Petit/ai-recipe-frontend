// src/components/Common/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import de Link et useNavigate
// Correction du chemin d'importation pour index.css
import '../../index.css'; 
import { LeafIcon, SparklesIcon, BrainIcon, PackageIcon, ShoppingCartIcon, HomeIcon } from './Icons'; // Import des icônes

const Header = ({ isAdmin, setIsAdmin }) => { // navigate est supprimé car on utilise le hook ici
  const navigate = useNavigate(); // Initialisation du hook navigate
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Gérer l'état du menu mobile en interne

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Fonction de navigation qui peut aussi gérer le défilement vers une section spécifique de la page d'accueil
  // Utilise navigate de React Router
  const handleNavigationAndScroll = (path, sectionId = null) => {
    if (sectionId && path === '/') {
      navigate(path); // Navigue d'abord à la racine
      setTimeout(() => { // Laisse le temps à la navigation de se faire
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false); // Ferme le menu mobile après navigation
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6 md:px-12 flex justify-between items-center rounded-b-xl relative z-20">
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2 text-green-700"> {/* Lien vers la page d'accueil */}
          <LeafIcon />
          <span className="font-bold text-2xl">AI & Fines Herbes</span>
        </Link>
      </div>
      <nav className="hidden md:flex space-x-6 text-lg">
        <Link to="/" className="text-gray-600 hover:text-green-700 transition-colors flex items-center"><HomeIcon className="mr-1"/> Accueil</Link>
        <button onClick={() => handleNavigationAndScroll('/', 'how-it-works')} className="text-gray-600 hover:text-green-700 transition-colors flex items-center bg-transparent border-none cursor-pointer">
          <SparklesIcon className="mr-1"/> Fonctionnalités
        </button>
        <Link to="/generate-recipe" className="text-gray-600 hover:text-green-700 transition-colors flex items-center"><BrainIcon className="mr-1"/> Créer</Link>
        <Link to="/recipes-overview" className="text-gray-600 hover:text-green-700 transition-colors flex items-center"><PackageIcon className="mr-1"/> Recettes</Link>
        <button onClick={() => handleNavigationAndScroll('/', 'newsletter')} className="text-gray-600 hover:text-green-700 transition-colors flex items-center bg-transparent border-none cursor-pointer">
          <ShoppingCartIcon className="mr-1"/> Contact
        </button>
        {/* Liens Admin - Conditionnels */}
        {isAdmin && (
          <>
            <Link to="/admin/analytics" className="text-gray-600 hover:text-green-700 transition-colors flex items-center">Analytics</Link>
            <Link to="/admin/locations" className="text-gray-600 hover:text-green-700 transition-colors flex items-center">Locations</Link>
            <Link to="/admin/feature-usage" className="text-gray-600 hover:text-green-700 transition-colors flex items-center">Feature Usage</Link>
          </>
        )}
      </nav>
      <div className="relative md:hidden">
        <button onClick={toggleMobileMenu} className="p-2 rounded-md hover:bg-gray-100 transition-colors z-30">
          <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
        {isMobileMenuOpen && (
          <nav className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-40 w-48">
            <Link to="/" onClick={() => handleNavigationAndScroll('/')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"><HomeIcon className="mr-2"/> Accueil</Link>
            <button onClick={() => handleNavigationAndScroll('/', 'how-it-works')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center text-left w-full bg-transparent border-none cursor-pointer">
              <SparklesIcon className="mr-2"/> Fonctionnalités
            </button>
            <Link to="/generate-recipe" onClick={() => handleNavigationAndScroll('/generate-recipe')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"><BrainIcon className="mr-2"/> Créer</Link>
            <Link to="/recipes-overview" onClick={() => handleNavigationAndScroll('/recipes-overview')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"><PackageIcon className="mr-2"/> Recettes</Link>
            <button onClick={() => handleNavigationAndScroll('/', 'newsletter')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center text-left w-full bg-transparent border-none cursor-pointer">
              <ShoppingCartIcon className="mr-2"/> Contact
            </button>
            {isAdmin && (
              <>
                <div className="border-t border-gray-200 my-1"></div>
                <Link to="/admin/analytics" onClick={() => handleNavigationAndScroll('/admin/analytics')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center">Analytics</Link>
                <Link to="/admin/locations" onClick={() => handleNavigationAndScroll('/admin/locations')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center">Locations</Link>
                <Link to="/admin/feature-usage" onClick={() => handleNavigationAndScroll('/admin/feature-usage')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center">Feature Usage</Link>
              </>
            )}
            <div className="border-t border-gray-200 my-1"></div>
            <Link to="/profile" onClick={() => handleNavigationAndScroll('/profile')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center">Profil</Link>
            {/* Bouton pour basculer le mode Admin - uniquement pour la démo */}
            <div className="px-4 py-2 text-center mt-2">
              <button
                type="button"
                onClick={() => setIsAdmin(!isAdmin)}
                className={`text-sm py-1 px-3 rounded-full transition-colors duration-200 ${
                  isAdmin ? 'bg-red-200 text-red-800 hover:bg-red-300' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Admin: {isAdmin ? 'On' : 'Off'}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

