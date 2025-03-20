import React, { useState, useEffect } from 'react';

const ChefDashboard = () => {
    const [chef, setChef] = useState(null);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Fetch chef and recipes data from the backend
        fetch('/api/chefs/1') // Replace with dynamic chef ID
            .then(response => response.json())
            .then(data => setChef(data));

        fetch('/api/chefs/1/recipes') // Replace with dynamic chef ID
            .then(response => response.json())
            .then(data => setRecipes(data));
    }, []);

    const handleAddRecipe = () => {
        // Implement add recipe functionality
    };

    const handleEditRecipe = (recipeId) => {
        // Implement edit recipe functionality
    };

    const handleDeleteRecipe = (recipeId) => {
        // Implement delete recipe functionality
    };

    const handleEditProfile = () => {
        // Implement edit profile functionality
    };

    return (
        <div>
            <h1>Chef Dashboard</h1>
            {chef && (
                <div>
                    <h2>{chef.name}</h2>
                    <p>{chef.bio}</p>
                    <button onClick={handleEditProfile}>Edit Profile</button>
                </div>
            )}
            <h2>Recipes</h2>
            <button onClick={handleAddRecipe}>Add Recipe</button>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <button onClick={() => handleEditRecipe(recipe.id)}>Edit</button>
                        <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChefDashboard;
