import React, { useState } from 'react';

function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateRecipe = async () => {
    setLoading(true);
    setError(null);
    setRecipe(null);

    const ingredientsArray = ingredients.split(',').map(item => item.trim()).filter(item => item !== '');

    if (ingredientsArray.length === 0) {
      setError("Veuillez entrer au moins un ingrédient.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/recipe-generator/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: ingredientsArray }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Erreur lors de la génération de la recette.');
      }

      const data = await response.json();
      setRecipe(data.recipe);

    } catch (err) {
      console.error("Erreur de l'API Strapi:", err);
      setError(err.message || "Impossible de générer la recette. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h1>Générateur de Recettes AI</h1>
      <p>Entrez vos ingrédients, séparés par des virgules (ex: poulet, brocoli, sauce soja)</p>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Entrez vos ingrédients ici..."
          style={{ width: 'calc(100% - 22px)', padding: '10px', margin: '0 10px 10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button
          onClick={handleGenerateRecipe}
          disabled={loading}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {loading ? 'Génération en cours...' : 'Générer la Recette'}
        </button>
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px', padding: '10px', backgroundColor: '#ffe0e0', border: '1px solid red', borderRadius: '4px' }}>
          Erreur : {error}
        </div>
      )}

      {recipe && (
        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <h2>{recipe.title}</h2>
          <p style={{ fontStyle: 'italic', color: '#555' }}>{recipe.description}</p>

          <h3>Ingrédients :</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {recipe.ingredients && recipe.ingredients.map((item, index) => (
              <li key={index} style={{ marginBottom: '5px' }}>• {item}</li>
            ))}
          </ul>

          <h3>Instructions :</h3>
          <ol style={{ paddingLeft: '20px' }}>
            {recipe.instructions && recipe.instructions.map((item, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>{item}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default RecipeGenerator;