import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeEdit.css';

const RecipeEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        cookingTime: 30,
        difficulty: 'medium',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/recipes/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Recipe not found');
                }
                return response.json();
            })
            .then(data => {
                setRecipe(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`/api/recipes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recipe)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update recipe');
            }

            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading recipe...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="recipe-edit">
            <h1>Edit Recipe</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={recipe.title}
                        onChange={(e) => setRecipe({...recipe, title: e.target.value})}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={recipe.description}
                        onChange={(e) => setRecipe({...recipe, description: e.target.value})}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Ingredients:</label>
                    <textarea
                        value={recipe.ingredients}
                        onChange={(e) => setRecipe({...recipe, ingredients: e.target.value})}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Instructions:</label>
                    <textarea
                        value={recipe.instructions}
                        onChange={(e) => setRecipe({...recipe, instructions: e.target.value})}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Cooking Time (minutes):</label>
                    <input
                        type="number"
                        value={recipe.cookingTime}
                        onChange={(e) => setRecipe({...recipe, cookingTime: parseInt(e.target.value)})}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Difficulty:</label>
                    <select
                        value={recipe.difficulty}
                        onChange={(e) => setRecipe({...recipe, difficulty: e.target.value})}
                        required
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={recipe.imageUrl}
                        onChange={(e) => setRecipe({...recipe, imageUrl: e.target.value})}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button type="button" onClick={() => navigate('/dashboard')}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RecipeEdit; 