// frontend/src/components/Pages/DetailRecetteIA.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DetailRecetteIA = ({ generatedRecipe, navigate }) => {
    // Si 'navigate' est passé via les props, il est déjà disponible.
    // Sinon, vous pouvez le décommenter : const navigate = useNavigate();

    // Redirection si aucune recette n'est générée
    if (!generatedRecipe) {
        // Redirige vers la page de création de recette si aucune recette n'est disponible
        // Ou vers la homepage, selon votre logique.
        navigate('/creer-recette-ia'); 
        return null; // N'affiche rien pendant la redirection
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-100">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full">
                <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
                    Votre Recette Générée par l'IA : {generatedRecipe.title}
                </h1>
                
                {generatedRecipe.imageUrl && (
                    <img 
                        src={generatedRecipe.imageUrl} 
                        alt={generatedRecipe.title} 
                        className="w-full h-80 object-cover rounded-2xl mb-6 shadow-md"
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Ingrédients</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            {generatedRecipe.ingredients && generatedRecipe.ingredients.map((item, index) => (
                                <li key={index}>{item.quantity} {item.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Préparation</h2>
                        <ol className="list-decimal list-inside text-gray-600 space-y-2">
                            {generatedRecipe.steps && generatedRecipe.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                    <button 
                        onClick={() => navigate('/creer-recette-ia')}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-colors"
                    >
                        Générer une nouvelle recette
                    </button>
                    {/* Ajoutez des boutons pour AjouterPanier, ExporterRobot, NoterRecette ici */}
                    <button
                        onClick={() => navigate('/panier')}
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition-colors"
                    >
                        Ajouter au panier
                    </button>
                    <button
                        onClick={() => navigate('/exporter-robot')}
                        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full shadow-md hover:bg-purple-700 transition-colors"
                    >
                        Exporter au robot
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

export default DetailRecetteIA;
