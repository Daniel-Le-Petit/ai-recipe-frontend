// src/components/Common/Footer.jsx
import React from 'react';
import { HomeIcon, PackageIcon, ShoppingCartIcon, UserIcon } from './Icons'; // Import des icônes

const Footer = ({ handleNavigate }) => {
  return (
    <footer className="bg-white shadow-lg h-20 text-center fixed bottom-0 left-0 right-0 z-50 rounded-t-xl flex justify-around items-center">
      <nav className="flex justify-around items-center w-full text-sm h-full">
        <a href="#" onClick={() => handleNavigate('home')} className="text-gray-600 hover:text-green-700 transition-colors flex flex-col items-center justify-center h-full w-1/4 rounded-md hover:bg-gray-100">
          <HomeIcon className="h-6 w-6"/>
          <span>Accueil</span>
        </a>
        <a href="#" onClick={() => handleNavigate('recipesOverview')} className="text-gray-600 hover:text-green-700 transition-colors flex flex-col items-center justify-center h-full w-1/4 rounded-md hover:bg-gray-100">
          <PackageIcon className="h-6 w-6"/>
          <span>Recettes</span>
        </a>
        <a href="#" onClick={() => handleNavigate('home', 'shopping-cart-section')} className="text-gray-600 hover:text-green-700 transition-colors flex flex-col items-center justify-center h-full w-1/4 rounded-md hover:bg-gray-100">
          <ShoppingCartIcon className="h-6 w-6"/>
          <span>Panier</span>
        </a>
        <a href="#" onClick={() => handleNavigate('profilePage')} className="text-gray-600 hover:text-green-700 transition-colors flex flex-col items-center justify-center h-full w-1/4 rounded-md hover:bg-gray-100">
          <UserIcon className="h-6 w-6"/>
          <span>Profil</span>
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
