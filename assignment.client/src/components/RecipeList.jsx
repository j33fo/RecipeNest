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

    if (loading) {
        return <div className="loading">Loading recipes...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="recipe-list">
            <div className="recipe-list-header">
                <h1>All Recipes</h1>
                <button 
                    className="add-recipe-btn"
                    onClick={() => navigate('/recipe/create')}
                >
                    Add New Recipe
                </button>
            </div>

            <div className="recipes-grid">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="recipe-card">
                        <img src={recipe.imageUrl} alt={recipe.title} />
                        <h3>{recipe.title}</h3>
                        <p>{recipe.description}</p>
                        <div className="recipe-info">
                            <span>Cooking Time: {recipe.cookingTime} mins</span>
                            <span>Difficulty: {recipe.difficulty}</span>
                            <span>By: {recipe.chef?.name}</span>
                        </div>
                        <div className="recipe-actions">
                            <button 
                                className="view-recipe-btn"
                                onClick={() => navigate(`/recipe/${recipe.id}`)}
                            >
                                View Recipe
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList; 