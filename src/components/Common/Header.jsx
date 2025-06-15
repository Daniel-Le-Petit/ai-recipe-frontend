// src/components/Common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import du composant Link de React Router
import { LeafIcon, SparklesIcon, ShoppingCartIcon, BarChartIcon, GlobeIcon, PieChartIcon, UserIcon, BookOpenIcon, SettingsIcon } from './Icons.jsx'; // Importe toutes les icônes nécessaires

// Le composant Header reçoit les props pour la navigation et la gestion du menu mobile
const Header = ({ toggleMobileMenu, isMobileMenuOpen, isAdmin, setIsAdmin }) => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 md:px-12 flex justify-between items-center rounded-b-xl">
      <div className="flex items-center space-x-2">
        {/* Logo AI & Fines Herbes avec icône de feuille */}
        <LeafIcon />
        <span className="font-bold text-2xl text-green-700">AI & Fines Herbes</span>
      </div>
      <nav className="hidden md:flex space-x-6 text-lg">
        {/* Utilisation de Link de React Router pour la navigation */}
        <Link to="/" className="text-gray-600 hover:text-green-700 transition-colors flex items-center">
          <BookOpenIcon className="mr-1 h-5 w-5" /> Accueil
        </Link>
        <Link to="/generate-recipe" className="text-gray-600 hover:text-green-700 transition-colors flex items-center">
          <SparklesIcon className="mr-1 h-5 w-5" /> Générer Recette
        </Link>
        <Link to="/recipes-overview" className="text-gray-600 hover:text-green-700 transition-colors flex items-center">
          <ShoppingCartIcon className="mr-1 h-5 w-5" /> Nos Recettes
        </Link>
        
        {/* Liens vers les tableaux de bord, visibles si l'utilisateur est admin */}
        {isAdmin && (
          <>
            <Link to="/admin/analytics" className="text-gray-600 hover:text-blue-700 transition-colors flex items-center">
              <BarChartIcon className="mr-1 h-5 w-5" /> Analytics
            </Link>
            <Link to="/admin/locations" className="text-gray-600 hover:text-blue-700 transition-colors flex items-center">
              <GlobeIcon className="mr-1 h-5 w-5" /> Localisation
            </Link>
            <Link to="/admin/feature-usage" className="text-gray-600 hover:text-blue-700 transition-colors flex items-center">
              <PieChartIcon className="mr-1 h-5 w-5" /> Usage Fonct.
            </Link>
          </>
        )}
        
        {/* Bouton de connexion/profil qui gère le basculement du mode admin pour la démo */}
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="text-gray-600 hover:text-green-700 transition-colors flex items-center"
        >
          <UserIcon className="mr-1 h-5 w-5" /> {isAdmin ? 'Mode Utilisateur' : 'Mode Admin'}
        </button>
      </nav>
      {/* Burger menu for mobile - conceptual */}
      <button onClick={toggleMobileMenu} className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors">
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
      </button>

      {/* Menu mobile (affiché/masqué selon isMobileMenuOpen) */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-10">
          <nav className="flex flex-col p-4 space-y-2 text-lg">
            <Link to="/" onClick={toggleMobileMenu} className="block text-gray-800 hover:bg-gray-50 p-2 rounded-md">Accueil</Link>
            <Link to="/generate-recipe" onClick={toggleMobileMenu} className="block text-gray-800 hover:bg-gray-50 p-2 rounded-md">Générer Recette</Link>
            <Link to="/recipes-overview" onClick={toggleMobileMenu} className="block text-gray-800 hover:bg-gray-50 p-2 rounded-md">Nos Recettes</Link>
            {isAdmin && (
              <>
                <Link to="/admin/analytics" onClick={toggleMobileMenu} className="block text-gray-800 hover:bg-gray-50 p-2 rounded-md">Analytics</Link>
                <Link to="/admin/locations" onClick={toggleMobileMenu} className="block text-gray-800 hover:bg-gray-50 p-2 rounded-md">Localisation</Link>
                <Link to="/admin/feature-usage" onClick={toggleMobileMenu} className="block text-gray-800 hover:bg-gray-50 p-2 rounded-md">Usage Fonct.</Link>
              </>
            )}
            <button onClick={() => { setIsAdmin(!isAdmin); toggleMobileMenu(); }} className="block text-gray-800 hover:bg-gray-50 p-2 rounded-md text-left">
              {isAdmin ? 'Mode Utilisateur' : 'Mode Admin'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

