import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeView.css";

const RecipeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error("Recipe not found");
        }
        const data = await response.json();
        
        // Ensure ingredients and instructions are arrays
        const formattedRecipe = {
          ...data,
          ingredients: Array.isArray(data.ingredients) ? data.ingredients : 
            (typeof data.ingredients === 'string' ? data.ingredients.split('\n').filter(i => i.trim()) : []),
          instructions: Array.isArray(data.instructions) ? data.instructions : 
            (typeof data.instructions === 'string' ? data.instructions.split('\n').filter(i => i.trim()) : [])
        };
        
        setRecipe(formattedRecipe);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!recipe) return <div className="error">Recipe not found</div>;

  return (
    <div className="recipe-view">
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <div className="recipe-meta">
          <span>Cooking Time: {recipe.cookingTime} minutes</span>
          <span>Difficulty: {recipe.difficulty}</span>
        </div>
      </div>

      {recipe.imageUrl && (
        <div className="recipe-image">
          <img src={recipe.imageUrl} alt={recipe.title} />
        </div>
      )}

      <div className="recipe-description">
        <h2>Description</h2>
        <p>{recipe.description}</p>
      </div>

      <div className="recipe-ingredients">
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="recipe-instructions">
        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>

      <div className="recipe-actions">
        <button
          className="edit-btn"
          onClick={() => navigate(`/recipes/${id}/edit`)}
        >
          Edit Recipe
        </button>
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default RecipeView; 