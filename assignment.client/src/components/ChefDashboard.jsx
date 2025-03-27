import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChefDashboard.css';

const ChefDashboard = () => {
    const navigate = useNavigate();
    const [chef, setChef] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddRecipe, setShowAddRecipe] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [newRecipe, setNewRecipe] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        cookingTime: 30,
        difficulty: 'medium',
        imageUrl: ''
    });
    const [editedProfile, setEditedProfile] = useState({
        name: '',
        bio: '',
        specialty: '',
        email: '',
        location: '',
        pictureUrl: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch chef and recipes data from the backend
        fetch('/api/chefs/me')
            .then(response => response.json())
            .then(data => {
                setChef(data);
                setEditedProfile(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching chef:', error);
                setError('Failed to load chef data');
                setLoading(false);
            });

        fetch('/api/chefs/me/recipes')
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
                setError('Failed to load recipes');
                setLoading(false);
            });
    }, []);

    const handleSubmitRecipe = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            
            const response = await fetch('/api/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRecipe)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create recipe');
            }

            const recipe = await response.json();
            setRecipes(prev => [...prev, recipe]);
            setShowAddRecipe(false);
            // Reset form
            setNewRecipe({
                title: '',
                description: '',
                ingredients: '',
                instructions: '',
                cookingTime: 30,
                difficulty: 'medium',
                imageUrl: ''
            });
            
            alert('Recipe added successfully!');
        } catch (error) {
            console.error('Error adding recipe:', error);
            alert(error.message || 'Failed to add recipe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditRecipe = (recipeId) => {
        navigate(`/recipes/${recipeId}/edit`);
    };

    const handleEditProfile = async (e) => {
        e.preventDefault();
        try {
            // Add loading state
            setLoading(true);
            
            const response = await fetch('/api/chefs/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(editedProfile)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedChef = await response.json();
            setChef(updatedChef);
            setShowEditProfile(false);
            
            // Add success message
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRecipe = async (recipeId) => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                const response = await fetch(`/api/recipes/${recipeId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
                }
            } catch (error) {
                console.error('Error deleting recipe:', error);
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>My Dashboard</h1>
                <button className="add-recipe-btn" onClick={() => navigate('/recipes/create')}>
                    Add New Recipe
                </button>
            </div>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="dashboard-content">
                    <div className="dashboard-section">
                        <h2>My Recipes</h2>
                        <div className="recipes-grid">
                            {recipes.map((recipe) => (
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
                                                View
                                            </button>
                                            <button
                                                className="edit-btn"
                                                onClick={() => navigate(`/recipes/${recipe.id}/edit`)}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChefDashboard;
