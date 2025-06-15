// src/components/Pages/AnalyticsDashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate
import { BarChartIcon } from '../Common/Icons'; // Importez les icônes

const AnalyticsDashboardPage = () => { // Plus besoin de handleNavigate en prop
  const navigate = useNavigate(); // Initialisation du hook navigate

  return (
    <section id="analytics-dashboard-section" className="py-16 px-6 md:px-12 bg-white rounded-xl mx-4 my-6 shadow-lg">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/profile')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">Tableau de Bord Analytique</h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Utilisateurs Connectés</h3>
            <p className="text-5xl font-bold text-blue-600">42</p>
            <p className="text-gray-600">actuellement en ligne</p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Vues de Pages</h3>
            <p className="text-4xl font-bold text-green-600">12 450</p>
            <p className="text-gray-600">vues totales ce mois-ci</p>
            <p className="text-xl font-bold text-green-600 mt-2">8 700</p>
            <p className="text-gray-600">vues uniques ce mois-ci</p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-xl font-semibold text-yellow-800 mb-4">Temps de Connexion Moyen</h3>
            <p className="text-5xl font-bold text-yellow-600">03:45</p>
            <p className="text-gray-600">minutes par session</p>
        </div>

        <div className="lg:col-span-3 bg-gray-100 p-6 rounded-lg shadow-md h-64 flex items-center justify-center text-gray-500">
            <p>Graphiques d'activité des pages et du temps de connexion ici (données réelles via backend)</p>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboardPage;

