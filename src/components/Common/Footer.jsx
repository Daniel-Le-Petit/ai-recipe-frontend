// src/components/Common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import du composant Link de React Router
import { HomeIcon, PackageIcon, ShoppingCartIcon, UserIcon } from './Icons'; // Import des icônes

const Footer = () => { // Supprimé handleNavigate car Link gère la navigation
  return (
    <footer className="bg-white shadow-lg h-20 text-center fixed bottom-0 left-0 right-0 z-50 rounded-t-xl flex justify-around items-center">
      <nav className="flex justify-around items-center w-full text-sm h-full">
        {/* Utilisation de Link pour la navigation */}
        <Link to="/" className="text-gray-600 hover:text-green-700 transition-colors flex flex-col items-center justify-center h-full w-1/4 rounded-md hover:bg-gray-100">
          <HomeIcon className="h-6 w-6"/>
          <span>Accueil</span>
        </Link>
        <Link to="/recipes-overview" className="text-gray-600 hover:text-green-700 transition-colors flex flex-col items-center justify-center h-full w-1/4 rounded-md hover:bg-gray-100">
          <PackageIcon className="h-6 w-6"/>
          <span>Recettes</span>
        </Link>
        <Link to="/cart" className="text-gray-600 hover:text-green-700 transition-colors flex flex-col items-center justify-center h-full w-1/4 rounded-md hover:bg-gray-100">
          <ShoppingCartIcon className="h-6 w-6"/>
          <span>Panier</span>
        </Link>
        <Link to="/profile" className="text-gray-600 hover:text-green-700 transition-colors flex flex-col items-center justify-center h-full w-1/4 rounded-md hover:bg-gray-100">
          <UserIcon className="h-6 w-6"/>
          <span>Profil</span>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
