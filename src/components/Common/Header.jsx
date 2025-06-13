// src/components/Common/Header.jsx
import React from 'react';
import { LeafIcon, SparklesIcon, BrainIcon, PackageIcon, ShoppingCartIcon, HomeIcon } from './Icons'; // Import des icônes

const Header = ({ handleNavigate, toggleMobileMenu, isMobileMenuOpen }) => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 md:px-12 flex justify-between items-center rounded-b-xl relative z-20">
      <div className="flex items-center space-x-2">
        <LeafIcon />
        <span className="font-bold text-2xl text-green-700">AI & Fines Herbes</span>
      </div>
      <nav className="hidden md:flex space-x-6 text-lg">
        <a href="#" onClick={() => handleNavigate('home')} className="text-gray-600 hover:text-green-700 transition-colors flex items-center"><HomeIcon className="h-6 w-6 mr-2"/> Accueil</a>
        <a href="#" onClick={() => handleNavigate('home', 'how-it-works')} className="text-gray-600 hover:text-green-700 transition-colors flex items-center"><SparklesIcon className="h-6 w-6 mr-2"/> Fonctionnalités</a>
        <a href="#" onClick={() => handleNavigate('createRecipeForm')} className="text-gray-600 hover:text-green-700 transition-colors flex items-center"><BrainIcon className="h-6 w-6 mr-2"/> Créer</a>
        <a href="#" onClick={() => handleNavigate('recipesOverview')} className="text-gray-600 hover:text-green-700 transition-colors flex items-center"><PackageIcon className="h-6 w-6 mr-2"/> Recettes</a>
        <a href="#" onClick={() => handleNavigate('home', 'newsletter')} className="text-gray-600 hover:text-green-700 transition-colors flex items-center"><ShoppingCartIcon className="h-6 w-6 mr-2"/> Contact</a>
      </nav>
      <div className="relative md:hidden">
        <button onClick={toggleMobileMenu} className="p-2 rounded-md hover:bg-gray-100 transition-colors z-30">
          <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
        {isMobileMenuOpen && (
          <nav className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-40 w-48">
            <a href="#" onClick={() => handleNavigate('home')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"><HomeIcon className="h-6 w-6 mr-2"/> Accueil</a>
            <a href="#" onClick={() => handleNavigate('home', 'how-it-works')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"><SparklesIcon className="h-6 w-6 mr-2"/> Fonctionnalités</a>
            <a href="#" onClick={() => handleNavigate('createRecipeForm')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"><BrainIcon className="h-6 w-6 mr-2"/> Créer</a>
            <a href="#" onClick={() => handleNavigate('recipesOverview')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"><PackageIcon className="h-6 w-6 mr-2"/> Recettes</a>
            <a href="#" onClick={() => handleNavigate('home', 'newsletter')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"><ShoppingCartIcon className="h-6 w-6 mr-2"/> Contact</a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
