// frontend/src/components/Pages/TrouverRecetteExistante.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrouverRecetteExistante = ({ navigate, setSelectedRecipeDetail }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSearchResults([]);

        // Ici, vous implémenteriez votre logique de recherche d'API
        // Pour l'exemple, voici des données mockées :
        setTimeout(() => {
            const mockRecipes = [
                { id: '1', title: 'Salade de quinoa aux légumes', imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', description: 'Une salade fraîche et saine, parfaite pour l\'été.' },
                { id: '2', title: 'Curry de poulet aux lentilles corail', imageUrl: 'https://images.pexels.com/photos/1630588/pexels-photo-1630588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', description: 'Un plat réconfortant et plein de saveurs.' },
                { id: '3', title: 'Soupe de carottes et gingembre', imageUrl: 'https://images.pexels.com/photos/1660336/pexels-photo-1660336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', description: 'Idéal pour réchauffer les soirées d\'hiver.' },
            ];
            setSearchResults(mockRecipes.filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase())));
            setLoading(false);
        }, 1000);
    };

    const handleCardClick = (recipe) => {
        setSelectedRecipeDetail(recipe); // Met à jour le state global dans App.jsx
        navigate('/detail-recette-existante'); // Navigue vers la page de détail
    };

    return (
        <div className="flex flex-col items-center min-h-[calc(100vh-120px)] py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full mb-8 text-center">
                <h1 className="text-4xl font-bold text-blue-800 mb-6">Trouvez votre recette par ingrédient</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Entrez les ingrédients que vous avez sous la main et découvrez des recettes existantes !
                </p>
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <input
                        type="text"
                        placeholder="Ex: poulet, riz, brocoli"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-5 py-3 border border-gray-300 rounded-full w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
                        disabled={loading}
                    >
                        {loading ? 'Recherche...' : 'Rechercher Recettes'}
                    </button>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
                {searchResults.map((recipe) => (
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
                            <h3 className="text-2xl font-bold text-blue-700 mb-3">{recipe.title}</h3>
                            <p className="text-gray-600 mb-4 flex-grow">{recipe.description}</p>
                            <button className="mt-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition-colors">
                                Voir la recette
                            </button>
                        </div>
                    </div>
                ))}
                {searchResults.length === 0 && !loading && searchTerm && <p className="text-center text-gray-600 col-span-full">Aucune recette trouvée pour "{searchTerm}".</p>}
            </div>
        </div>
    );
};

export default TrouverRecetteExistante;
