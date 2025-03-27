// src/components/RecipePortfolio.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipePortfolio.css';

const RecipePortfolio = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('newest');
    const [expandedRecipes, setExpandedRecipes] = useState(new Set());

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`/api/chefs/${id}/recipes`);
                if (!response.ok) {
                    throw new Error("Failed to fetch recipes");
                }
                const data = await response.json();
                setRecipes(data);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching recipes:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [id]);

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

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    const sortedRecipes = sortRecipes(recipes);

    return (
        <div className="recipe-portfolio">
            <h2>My Recipes</h2>
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
                {sortedRecipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                        {recipe.imageUrl && (
                            <div className="recipe-image">
                                <img 
                                    src={recipe.imageUrl || '/default-recipe.jpg'} 
                                    alt={recipe.title} 
                                />
                            </div>
                        )}
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
                                        className="view-btn"
                                        onClick={() => navigate(`/recipes/${recipe.id}`)}
                                    >
                                        View Recipe
                                    </button>
                                    <button 
                                        className="edit-btn"
                                        onClick={() => navigate(`/recipes/${recipe.id}/edit`)}
                                    >
                                        Edit Recipe
                                    </button>
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
