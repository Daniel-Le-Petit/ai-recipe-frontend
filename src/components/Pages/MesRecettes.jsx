// frontend/src/components/Pages/MesRecettes.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MesRecettes = ({ navigate, setSelectedRecipeDetail }) => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Simuler le chargement des recettes sauvegardées (depuis localStorage, API, etc.)
        setTimeout(() => {
            const mockSavedRecipes = [
                { id: 's1', title: 'Smoothie Fraise-Banane', imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', description: 'Mon petit-déjeuner préféré, rapide et énergisant.' },
                { id: 's2', title: 'Lasagnes végétariennes', imageUrl: 'https://images.pexels.com/photos/1630588/pexels-photo-1630588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', description: 'Une version saine et délicieuse des lasagnes classiques.' },
            ];
            setSavedRecipes(mockSavedRecipes);
            setLoading(false);
        }, 1000);
    }, []);

    const handleCardClick = (recipe) => {
        setSelectedRecipeDetail(recipe);
        navigate('/detail-recette-existante'); // Utilise la même page de détail
    };

    return (
        <div className="flex flex-col items-center min-h-[calc(100vh-120px)] py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-blue-100">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full mb-8 text-center">
                <h1 className="text-4xl font-bold text-indigo-800 mb-6">Mes Recettes</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Retrouvez toutes vos recettes sauvegardées et vos favoris.
                </p>
            </div>

            {loading ? (
                <p className="text-gray-700 text-xl">Chargement de vos recettes...</p>
            ) : error ? (
                <p className="text-red-500 text-xl">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
                    {savedRecipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col overflow-hidden cursor-pointer"
                            onClick={() => handleCardClick(recipe)}
                        >
                            <img 
                                src={recipe.imageUrl || '/image/placeholder.png'} 
                                alt={recipe.title} 
                                className="w-full h-48 object-cover rounded-t-3xl" 
                            />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold text-indigo-700 mb-3">{recipe.title}</h3>
                                <p className="text-gray-600 mb-4 flex-grow">{recipe.description}</p>
                                <button className="mt-auto px-6 py-3 bg-indigo-500 text-white font-semibold rounded-full shadow-md hover:bg-indigo-600 transition-colors">
                                    Voir la recette
                                </button>
                            </div>
                        </div>
                    ))}
                    {savedRecipes.length === 0 && <p className="text-center text-gray-600 col-span-full">Vous n'avez pas encore de recettes sauvegardées.</p>}
                </div>
            )}
        </div>
    );
};

export default MesRecettes;
