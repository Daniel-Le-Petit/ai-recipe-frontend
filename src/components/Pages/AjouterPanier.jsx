// frontend/src/components/Pages/AjouterPanier.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AjouterPanier = ({ navigate }) => {
    const [ingredientsList, setIngredientsList] = useState([
        { id: 1, name: 'Tomates', quantity: '500g' },
        { id: 2, name: 'Basilic frais', quantity: '1 bouquet' },
        { id: 3, name: 'Pâtes', quantity: '250g' },
    ]);

    const handleRemoveIngredient = (id) => {
        setIngredientsList(prev => prev.filter(item => item.id !== id));
    };

    const handleAddMore = () => {
        // Logique pour revenir à la page précédente ou à une page de recherche
        navigate(-1); // Revenir à la page précédente
        // ou navigate('/explorer-recettes');
    };

    const handleCheckout = () => {
        alert('Fonctionnalité de commande non implémentée.');
        // Ici, vous intégreriez la logique d'envoi du panier à une API ou autre
    };

    return (
        <div className="flex flex-col items-center min-h-[calc(100vh-120px)] py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 to-orange-100">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full text-center">
                <h1 className="text-4xl font-bold text-yellow-800 mb-6">Mon Panier / Liste de Courses</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Voici les ingrédients pour vos prochaines recettes.
                </p>

                {ingredientsList.length === 0 ? (
                    <p className="text-gray-600 text-xl">Votre panier est vide pour le moment.</p>
                ) : (
                    <ul className="space-y-4 mb-8 text-left">
                        {ingredientsList.map((item) => (
                            <li key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                                <span className="text-lg text-gray-800">{item.name} ({item.quantity})</span>
                                <button
                                    onClick={() => handleRemoveIngredient(item.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
                                >
                                    Supprimer
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <button 
                        onClick={handleAddMore}
                        className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-full shadow-md hover:bg-gray-600 transition-colors"
                    >
                        Ajouter plus d'ingrédients
                    </button>
                    {ingredientsList.length > 0 && (
                        <button 
                            onClick={handleCheckout}
                            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition-colors"
                        >
                            Finaliser ma liste
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AjouterPanier;
