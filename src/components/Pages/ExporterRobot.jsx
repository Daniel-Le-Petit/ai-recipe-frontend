// frontend/src/components/Pages/ExporterRobot.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExporterRobot = ({ navigate }) => {
    const [selectedRobot, setSelectedRobot] = useState('');
    const [exportStatus, setExportStatus] = useState(''); // 'idle', 'loading', 'success', 'error'

    const robots = [
        { id: '1', name: 'Robot Cuisine A' },
        { id: '2', name: 'Robot Cuisine B' },
        { id: '3', name: 'Autre Robot' },
    ];

    const handleExport = async (e) => {
        e.preventDefault();
        if (!selectedRobot) {
            setExportStatus('error');
            alert('Veuillez sélectionner un robot.');
            return;
        }

        setExportStatus('loading');
        // Simuler l'envoi de la recette au robot
        setTimeout(() => {
            // Ici, vous intégreriez la logique d'API pour envoyer la recette
            const success = Math.random() > 0.3; // Simuler succès/échec
            if (success) {
                setExportStatus('success');
                alert(`Recette exportée avec succès vers ${selectedRobot} !`);
                navigate('/mes-recettes'); // Rediriger après succès
            } else {
                setExportStatus('error');
                alert('Échec de l\'exportation. Veuillez réessayer.');
            }
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center min-h-[calc(100vh-120px)] py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 to-cyan-100">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full text-center">
                <h1 className="text-4xl font-bold text-teal-800 mb-6">Exporter la Recette au Robot</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Sélectionnez votre robot de cuisine pour y envoyer la recette.
                </p>

                <form onSubmit={handleExport} className="flex flex-col gap-6">
                    <div className="flex flex-col items-start w-full">
                        <label htmlFor="robot-select" className="text-gray-700 font-semibold mb-2">
                            Choisissez votre robot :
                        </label>
                        <select
                            id="robot-select"
                            value={selectedRobot}
                            onChange={(e) => {
                                setSelectedRobot(e.target.value);
                                setExportStatus('idle'); // Réinitialiser le statut
                            }}
                            className="px-5 py-3 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="">-- Sélectionnez un robot --</option>
                            {robots.map((robot) => (
                                <option key={robot.id} value={robot.name}>
                                    {robot.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-full shadow-md hover:bg-teal-700 transition-colors w-full"
                        disabled={exportStatus === 'loading'}
                    >
                        {exportStatus === 'loading' ? 'Exportation en cours...' : 'Exporter la recette'}
                    </button>
                    {exportStatus === 'success' && <p className="text-green-600 mt-4">Exportation réussie !</p>}
                    {exportStatus === 'error' && <p className="text-red-600 mt-4">Une erreur est survenue lors de l'exportation.</p>}
                </form>

                <button
                    onClick={() => navigate(-1)}
                    className="mt-8 px-6 py-3 bg-gray-500 text-white font-semibold rounded-full shadow-md hover:bg-gray-600 transition-colors"
                >
                    Annuler
                </button>
            </div>
        </div>
    );
};

export default ExporterRobot;
