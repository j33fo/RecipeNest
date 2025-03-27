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
        navigate(`/recipe/${recipeId}/edit`);
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
        <div className="chef-dashboard">
            <div className="dashboard-header">
                <h1>Chef Dashboard</h1>
                <button 
                    className="edit-profile-btn"
                    onClick={() => setShowEditProfile(true)}
                >
                    Edit Profile
                </button>
            </div>

            <div className="dashboard-content">
                <div className="profile-section">
                    {chef && (
                        <div className="profile-info">
                            <img src={chef.pictureUrl} alt={chef.name} className="profile-picture" />
                            <h2>{chef.name}</h2>
                            <p>{chef.bio}</p>
                            <p><strong>Specialty:</strong> {chef.specialty}</p>
                            <p><strong>Location:</strong> {chef.location}</p>
                            <p><strong>Email:</strong> {chef.email}</p>
                        </div>
                    )}
                </div>

                <div className="recipes-section">
                    <div className="recipes-header">
                        <h2>My Recipes</h2>
                        <button 
                            className="add-recipe-btn"
                            onClick={() => setShowAddRecipe(true)}
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
                                <div className="recipe-actions">
                                    <button 
                                        className="edit-recipe-btn"
                                        onClick={() => handleEditRecipe(recipe.id)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="delete-recipe-btn"
                                        onClick={() => handleDeleteRecipe(recipe.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showAddRecipe && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add New Recipe</h2>
                        <form onSubmit={handleSubmitRecipe}>
                            <div className="form-group">
                                <label>Title:</label>
                                <input
                                    type="text"
                                    value={newRecipe.title}
                                    onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <textarea
                                    value={newRecipe.description}
                                    onChange={(e) => setNewRecipe({...newRecipe, description: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Ingredients:</label>
                                <textarea
                                    value={newRecipe.ingredients}
                                    onChange={(e) => setNewRecipe({...newRecipe, ingredients: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Instructions:</label>
                                <textarea
                                    value={newRecipe.instructions}
                                    onChange={(e) => setNewRecipe({...newRecipe, instructions: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Cooking Time (minutes):</label>
                                <input
                                    type="number"
                                    value={newRecipe.cookingTime}
                                    onChange={(e) => setNewRecipe({...newRecipe, cookingTime: parseInt(e.target.value)})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Difficulty:</label>
                                <select
                                    value={newRecipe.difficulty}
                                    onChange={(e) => setNewRecipe({...newRecipe, difficulty: e.target.value})}
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
                                    value={newRecipe.imageUrl}
                                    onChange={(e) => setNewRecipe({...newRecipe, imageUrl: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Adding...' : 'Add Recipe'}
                                </button>
                                <button type="button" onClick={() => setShowAddRecipe(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEditProfile && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Profile</h2>
                        <form onSubmit={handleEditProfile}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={editedProfile.name}
                                    onChange={e => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Bio</label>
                                <textarea
                                    value={editedProfile.bio}
                                    onChange={e => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Specialty</label>
                                <input
                                    type="text"
                                    value={editedProfile.specialty}
                                    onChange={e => setEditedProfile(prev => ({ ...prev, specialty: e.target.value }))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={editedProfile.email}
                                    onChange={e => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    value={editedProfile.location}
                                    onChange={e => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Profile Picture URL</label>
                                <input
                                    type="url"
                                    value={editedProfile.pictureUrl}
                                    onChange={e => setEditedProfile(prev => ({ ...prev, pictureUrl: e.target.value }))}
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit">Save Changes</button>
                                <button type="button" onClick={() => setShowEditProfile(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChefDashboard;
