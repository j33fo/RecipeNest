import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeList.css';

const RecipeList = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/recipes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }
                return response.json();
            })
            .then(data => {
                setRecipes(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="recipe-list">
            <div className="recipe-list-header">
                <h1>All Recipes</h1>
                <button 
                    className="add-recipe-btn"
                    onClick={() => navigate('/recipes/create')}
                >
                    Add Recipe
                </button>
            </div>

            {loading ? (
                <div className="loading">Loading recipes...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="recipes-grid">
                    {recipes.map(recipe => (
                        <div key={recipe.id} className="recipe-card">
                            {recipe.imageUrl && (
                                <div className="recipe-image">
                                    <img src={recipe.imageUrl} alt={recipe.title} />
                                </div>
                            )}
                            <div className="recipe-content">
                                <h3>{recipe.title}</h3>
                                <p>{recipe.description}</p>
                                <div className="recipe-meta">
                                    <span>Cooking Time: {recipe.cookingTime} minutes</span>
                                    <span>Difficulty: {recipe.difficulty}</span>
                                </div>
                                <div className="recipe-actions">
                                    <button 
                                        className="view-btn"
                                        onClick={() => navigate(`/recipes/${recipe.id}`)}
                                    >
                                        View Recipe
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipeList; 