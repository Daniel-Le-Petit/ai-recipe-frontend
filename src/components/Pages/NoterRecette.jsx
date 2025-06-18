// frontend/src/components/Pages/NoterRecette.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NoterRecette = ({ navigate }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmitRating = (e) => {
        e.preventDefault();
        // Ici, vous enverriez la note et le commentaire à votre backend
        console.log("Note soumise :", rating, "Commentaire :", comment);
        setSubmitted(true);
        // Simuler un délai d'envoi
        setTimeout(() => {
            alert('Votre note a été soumise avec succès !');
            navigate(-1); // Revenir à la page précédente (détail de la recette)
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center min-h-[calc(100vh-120px)] py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-lime-50 to-green-100">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full text-center">
                <h1 className="text-4xl font-bold text-lime-800 mb-6">Noter cette Recette</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Partagez votre avis sur cette recette en lui attribuant une note et un commentaire.
                </p>

                {!submitted ? (
                    <form onSubmit={handleSubmitRating} className="flex flex-col gap-6">
                        {/* Section de notation par étoiles */}
                        <div className="flex justify-center items-center gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`text-5xl transition-colors duration-200 ${
                                        star <= rating ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'
                                    }`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                        <p className="text-gray-700 text-xl font-semibold mb-4">Votre note : {rating} étoile(s)</p>

                        {/* Zone de commentaire */}
                        <textarea
                            placeholder="Vos commentaires sur la recette..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows="5"
                            className="px-5 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-lime-500"
                        ></textarea>

                        <button
                            type="submit"
                            className="px-8 py-3 bg-lime-600 text-white font-semibold rounded-full shadow-md hover:bg-lime-700 transition-colors w-full"
                            disabled={rating === 0} // Désactiver si aucune note n'est sélectionnée
                        >
                            Soumettre la note
                        </button>
                    </form>
                ) : (
                    <div className="text-green-600 text-xl font-semibold">
                        Merci pour votre feedback !
                        <button
                            onClick={() => navigate(-1)}
                            className="mt-8 px-6 py-3 bg-gray-500 text-white font-semibold rounded-full shadow-md hover:bg-gray-600 transition-colors"
                        >
                            Retour
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoterRecette;
