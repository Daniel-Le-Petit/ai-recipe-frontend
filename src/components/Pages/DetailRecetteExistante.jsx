// frontend/src/components/Pages/DetailRecetteExistante.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DetailRecetteExistante = ({ selectedRecipeDetail, navigate }) => {
    // Redirection si aucune recette n'est sélectionnée
    if (!selectedRecipeDetail) {
        navigate('/explorer-recettes'); // Ou une autre page de liste de recettes
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-red-100">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full">
                <h1 className="text-4xl font-bold text-orange-800 mb-6 text-center">
                    Détail de la Recette : {selectedRecipeDetail.title}
                </h1>
                
                {selectedRecipeDetail.imageUrl && (
                    <img 
                        src={selectedRecipeDetail.imageUrl} 
                        alt={selectedRecipeDetail.title} 
                        className="w-full h-80 object-cover rounded-2xl mb-6 shadow-md"
                    />
                )}

                <div className="text-gray-700 mb-6">
                    <p className="text-lg mb-4">{selectedRecipeDetail.description || "Aucune description disponible."}</p>
                    {/* Ajoutez plus de détails ici si votre objet recette a d'autres champs (ingrédients, étapes, etc.) */}
                    {selectedRecipeDetail.duration && <p><strong>Durée :</strong> {selectedRecipeDetail.duration}</p>}
                    {/* Exemple pour des ingrédients si la structure est détaillée */}
                    {selectedRecipeDetail.ingredients && (
                        <div>
                            <h3 className="text-xl font-semibold mt-4 mb-2">Ingrédients :</h3>
                            <ul className="list-disc list-inside">
                                {selectedRecipeDetail.ingredients.map((ing, idx) => (
                                    <li key={idx}>{ing.quantity} {ing.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {selectedRecipeDetail.steps && (
                        <div>
                            <h3 className="text-xl font-semibold mt-4 mb-2">Étapes de préparation :</h3>
                            <ol className="list-decimal list-inside">
                                {selectedRecipeDetail.steps.map((step, idx) => (
                                    <li key={idx}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>

                <div className="flex justify-center gap-4 mt-8">
                    <button 
                        onClick={() => navigate('/explorer-recettes')}
                        className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-full shadow-md hover:bg-gray-700 transition-colors"
                    >
                        Retour aux recettes
                    </button>
                    {/* Ajoutez des boutons d'action spécifiques aux recettes existantes si besoin */}
                     <button
                        onClick={() => navigate('/panier')}
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition-colors"
                    >
                        Ajouter au panier
                    </button>
                    <button
                        onClick={() => navigate('/noter-recette')}
                        className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-full shadow-md hover:bg-yellow-700 transition-colors"
                    >
                        Noter la recette
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailRecetteExistante;
