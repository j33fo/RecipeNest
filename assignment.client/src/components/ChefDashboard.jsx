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
        ingredients: [''],
        instructions: [''],
        cookingTime: '',
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
        fetch('/api/chefs/me', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
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

        fetch('/api/chefs/me/recipes', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
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

    const handleAddIngredient = () => {
        setNewRecipe(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, '']
        }));
    };

    const handleAddInstruction = () => {
        setNewRecipe(prev => ({
            ...prev,
            instructions: [...prev.instructions, '']
        }));
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...newRecipe.ingredients];
        newIngredients[index] = value;
        setNewRecipe(prev => ({
            ...prev,
            ingredients: newIngredients
        }));
    };

    const handleInstructionChange = (index, value) => {
        const newInstructions = [...newRecipe.instructions];
        newInstructions[index] = value;
        setNewRecipe(prev => ({
            ...prev,
            instructions: newInstructions
        }));
    };

    const handleSubmitRecipe = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newRecipe)
            });
            if (response.ok) {
                const recipe = await response.json();
                setRecipes(prev => [...prev, recipe]);
                setShowAddRecipe(false);
                setNewRecipe({
                    title: '',
                    description: '',
                    ingredients: [''],
                    instructions: [''],
                    cookingTime: '',
                    difficulty: 'medium',
                    imageUrl: ''
                });
            }
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    const handleEditProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/chefs/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(editedProfile)
            });
            if (response.ok) {
                const updatedChef = await response.json();
                setChef(updatedChef);
                setShowEditProfile(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
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

            <div className="dashboard-section">
                <h2>My Recipes</h2>
                <button 
                    className="add-recipe-btn"
                    onClick={() => setShowAddRecipe(true)}
                >
                    Add New Recipe
                </button>

                {showAddRecipe && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Add New Recipe</h2>
                            <form onSubmit={handleSubmitRecipe}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={newRecipe.title}
                                        onChange={e => setNewRecipe(prev => ({ ...prev, title: e.target.value }))}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={newRecipe.description}
                                        onChange={e => setNewRecipe(prev => ({ ...prev, description: e.target.value }))}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Ingredients</label>
                                    {newRecipe.ingredients.map((ingredient, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            value={ingredient}
                                            onChange={e => handleIngredientChange(index, e.target.value)}
                                        />
                                    ))}
                                    <button type="button" onClick={handleAddIngredient}>
                                        Add Ingredient
                                    </button>
                                </div>
                                <div className="form-group">
                                    <label>Instructions</label>
                                    {newRecipe.instructions.map((instruction, index) => (
                                        <textarea
                                            key={index}
                                            value={instruction}
                                            onChange={e => handleInstructionChange(index, e.target.value)}
                                        />
                                    ))}
                                    <button type="button" onClick={handleAddInstruction}>
                                        Add Instruction
                                    </button>
                                </div>
                                <div className="form-group">
                                    <label>Cooking Time (minutes)</label>
                                    <input
                                        type="number"
                                        value={newRecipe.cookingTime}
                                        onChange={e => setNewRecipe(prev => ({ ...prev, cookingTime: e.target.value }))}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Difficulty</label>
                                    <select
                                        value={newRecipe.difficulty}
                                        onChange={e => setNewRecipe(prev => ({ ...prev, difficulty: e.target.value }))}
                                    >
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Image URL</label>
                                    <input
                                        type="url"
                                        value={newRecipe.imageUrl}
                                        onChange={e => setNewRecipe(prev => ({ ...prev, imageUrl: e.target.value }))}
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="submit">Add Recipe</button>
                                    <button type="button" onClick={() => setShowAddRecipe(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="recipes-list">
                    {recipes.map(recipe => (
                        <div key={recipe.id} className="recipe-item">
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                            <div className="recipe-actions">
                                <button onClick={() => navigate(`/recipe/${recipe.id}`)}>
                                    View
                                </button>
                                <button onClick={() => navigate(`/recipe/${recipe.id}/edit`)}>
                                    Edit
                                </button>
                                <button 
                                    className="delete-btn"
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
    );
};

export default ChefDashboard;
