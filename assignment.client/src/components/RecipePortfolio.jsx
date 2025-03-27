// src/components/RecipePortfolio.jsx
import React, { useEffect, useState } from 'react';
import './RecipePortfolio.css';

const RecipePortfolio = ({ chefId }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest');
    const [expandedRecipes, setExpandedRecipes] = useState(new Set());

    useEffect(() => {
        // Fetch recipes data from the backend
        fetch(`/api/chefs/${chefId}/recipes`)
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
                setLoading(false);
            });
    }, [chefId]);

    const toggleRecipeExpansion = (recipeId) => {
        setExpandedRecipes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(recipeId)) {
                newSet.delete(recipeId);
            } else {
                newSet.add(recipeId);
            }
            return newSet;
        });
    };

    const sortRecipes = (recipes) => {
        switch (sortBy) {
            case 'newest':
                return [...recipes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'oldest':
                return [...recipes].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            case 'popular':
                return [...recipes].sort((a, b) => b.likes - a.likes);
            default:
                return recipes;
        }
    };

    const shareRecipe = (recipe) => {
        if (navigator.share) {
            navigator.share({
                title: recipe.title,
                text: `Check out this recipe by ${recipe.chefName}: ${recipe.description}`,
                url: window.location.href
            }).catch(console.error);
        }
    };

    if (loading) {
        return <div className="loading">Loading recipes...</div>;
    }

    const sortedRecipes = sortRecipes(recipes);

    return (
        <div className="recipe-portfolio">
            <div className="recipe-controls">
                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="popular">Most Popular</option>
                </select>
            </div>

            <div className="recipes-grid">
                {sortedRecipes.map(recipe => (
                    <div key={recipe.id} className="recipe-card">
                        <div className="recipe-image">
                            <img 
                                src={recipe.imageUrl || '/default-recipe.jpg'} 
                                alt={recipe.title} 
                            />
                        </div>
                        <div className="recipe-content">
                            <h3>{recipe.title}</h3>
                            <p className="recipe-description">
                                {expandedRecipes.has(recipe.id) 
                                    ? recipe.description 
                                    : `${recipe.description.substring(0, 100)}...`}
                            </p>
                            <button 
                                className="read-more-btn"
                                onClick={() => toggleRecipeExpansion(recipe.id)}
                            >
                                {expandedRecipes.has(recipe.id) ? 'Show Less' : 'Read More'}
                            </button>
                            
                            {expandedRecipes.has(recipe.id) && (
                                <div className="recipe-details">
                                    <h4>Ingredients</h4>
                                    <ul>
                                        {recipe.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul>
                                    <h4>Instructions</h4>
                                    <ol>
                                        {recipe.instructions.map((instruction, index) => (
                                            <li key={index}>{instruction}</li>
                                        ))}
                                    </ol>
                                </div>
                            )}

                            <div className="recipe-footer">
                                <div className="recipe-meta">
                                    <span className="cooking-time">
                                        {recipe.cookingTime} mins
                                    </span>
                                    <span className="difficulty">
                                        {recipe.difficulty}
                                    </span>
                                </div>
                                <div className="recipe-actions">
                                    <button 
                                        className="share-btn"
                                        onClick={() => shareRecipe(recipe)}
                                    >
                                        Share
                                    </button>
                                    <button className="like-btn">
                                        {recipe.likes} ❤️
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipePortfolio;
