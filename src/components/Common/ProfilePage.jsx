// src/components/Pages/ProfilePage.jsx
import React from 'react';
import { BellIcon, HelpCircleIcon, SettingsIcon, BookOpenIcon, BarChartIcon, GlobeIcon, PieChartIcon } from '../Common/Icons'; // Importez les icônes

const ProfilePage = ({ handleNavigate, isAdmin, setIsAdmin }) => {
  return (
    <section id="profile-page-section" className="py-16 px-6 md:px-12 bg-gray-50 rounded-xl mx-4 my-6 shadow-lg">
      <div className="flex items-center mb-6">
        <button onClick={() => handleNavigate('home')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">Mon Profil</h2>
      </div>

      <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-200 mb-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-6 md:mb-0">
          <img
            src="https://placehold.co/100x100/A7F3D0/10B981?text=Avatar"
            alt="Avatar utilisateur"
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Nom de l'Utilisateur</h3>
            <p className="text-gray-600">utilisateur@exemple.com</p>
          </div>
        </div>
        <div className="flex flex-col space-y-4 w-full md:w-auto">
          <button onClick={() => alert('Notifications')} className="flex items-center justify-center md:justify-start px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full shadow-sm hover:bg-gray-200 transition-colors">
              <BellIcon className="mr-2 h-5 w-5"/> Notifications
          </button>
          <button onClick={() => handleNavigate('home', 'how-it-works')} className="flex items-center justify-center md:justify-start px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full shadow-sm hover:bg-gray-200 transition-colors">
              <HelpCircleIcon className="mr-2 h-5 w-5"/> Aide & Fonctionnalités
          </button>
          <button onClick={() => alert('Paramètres')} className="flex items-center justify-center md:justify-start px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full shadow-sm hover:bg-gray-200 transition-colors">
              <SettingsIcon className="mr-2 h-5 w-5"/> Paramètres
          </button>
        </div>
      </div>

      <div className="p-8 bg-green-100 rounded-lg shadow-md max-w-3xl mx-auto mb-8">
        <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center"><BookOpenIcon className="mr-2"/> Mes Recettes</h3>
        <p className="text-gray-700 mb-4">Retrouvez toutes vos recettes favorites, celles que vous avez générées ou sauvegardées. Votre carnet de recettes personnel, toujours à portée de main !</p>
        <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors">Voir Toutes Mes Recettes</button>
        <div className="mt-6 text-center text-gray-500">
            <p>Vos recettes sauvegardées apparaîtront ici.</p>
        </div>
      </div>

      {/* New Section: Statistiques et Rapports (Conditionnel pour les admins) */}
      {isAdmin && (
        <div className="p-8 bg-blue-100 rounded-lg shadow-md max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center"><BarChartIcon className="mr-2"/> Statistiques et Rapports</h3>
            <p className="text-gray-700 mb-4">Accédez aux données d'utilisation et aux statistiques de votre site.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <button onClick={() => handleNavigate('analyticsDashboard')} className="flex flex-col items-center justify-center p-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors h-24">
                    <BarChartIcon className="h-8 w-8 mb-2"/> Tableau de Bord
                </button>
                <button onClick={() => handleNavigate('userLocationMap')} className="flex flex-col items-center justify-center p-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors h-24">
                    <GlobeIcon className="h-8 w-8 mb-2"/> Localisation
                </button>
                <button onClick={() => handleNavigate('featureUsage')} className="flex flex-col items-center justify-center p-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors h-24">
                    <PieChartIcon className="h-8 w-8 mb-2"/> Fonct. Utilisées
                </button>
            </div>
        </div>
      )}
      
      <div className="text-center mt-8">
        <button
          type="button"
          onClick={() => setIsAdmin(!isAdmin)}
          className={`text-sm py-2 px-4 rounded-full transition-colors duration-200 ${
            isAdmin ? 'bg-red-200 text-red-800 hover:bg-red-300' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Bascule Admin Mode: {isAdmin ? 'Activé' : 'Désactivé'}
        </button>
      </div>
    </section>
  );
};

export default ProfilePage;
