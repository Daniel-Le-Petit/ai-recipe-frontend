// frontend/src/components/Pages/ExplorerRecettes.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExplorerRecettes = ({ navigate, setSelectedRecipeDetail }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Simuler un appel API pour charger les recettes inspirantes
        setTimeout(() => {
            const mockRecipes = [
                { id: 'e1', title: 'Tarte aux légumes du soleil', imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', description: 'Une tarte colorée et savoureuse, idéale pour un repas léger.' },
                { id: 'e2', title: 'Dahl de lentilles corail aux épinards', imageUrl: 'https://images.pexels.com/photos/1630588/pexels-photo-1630588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', description: 'Un plat végétarien réconfortant et nutritif.' },
                { id: 'e3', title: 'Brochettes de poulet marinées', imageUrl: 'https://images.pexels.com/photos/1660336/pexels-photo-1660336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', description: 'Parfaites pour le barbecue ou une cuisson au four.' },
                { id: 'e4', title: 'Gâteau au chocolat fondant', imageUrl: 'https://images.pexels.com/photos/17792686/pexels-photo-17792686/free-photo-of-dessert-chocolat-glacage-moulinette.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', description: 'Un classique indémodable pour les amateurs de chocolat.' },
                { id: 'e5', title: 'Smoothie vert détox', imageUrl: 'https://images.pexels.com/photos/1482803/pexels-photo-1482803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', description: 'Idéal pour un coup de fouet matinal ou une collation saine.' },
            ];
            setRecipes(mockRecipes);
            setLoading(false);
        }, 1500);
    }, []);

    const handleCardClick = (recipe) => {
        setSelectedRecipeDetail(recipe); // Met à jour le state global dans App.jsx
        navigate('/detail-recette-existante'); // Navigue vers la page de détail
    };

    return (
        <div className="flex flex-col items-center min-h-[calc(100vh-120px)] py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-100">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full mb-8 text-center">
                <h1 className="text-4xl font-bold text-purple-800 mb-6">Explorez nos recettes inspirantes</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Découvrez une collection variée de recettes pour toutes les occasions.
                </p>
            </div>

            {loading ? (
                <p className="text-gray-700 text-xl">Chargement des recettes...</p>
            ) : error ? (
                <p className="text-red-500 text-xl">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
                    {recipes.map((recipe) => (
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
                                <h3 className="text-2xl font-bold text-purple-700 mb-3">{recipe.title}</h3>
                                <p className="text-gray-600 mb-4 flex-grow">{recipe.description}</p>
                                <button className="mt-auto px-6 py-3 bg-purple-500 text-white font-semibold rounded-full shadow-md hover:bg-purple-600 transition-colors">
                                    Voir la recette
                                </button>
                            </div>
                        </div>
                    ))}
                    {recipes.length === 0 && <p className="text-center text-gray-600 col-span-full">Aucune recette disponible pour le moment.</p>}
                </div>
            )}
        </div>
    );
};

export default ExplorerRecettes;
