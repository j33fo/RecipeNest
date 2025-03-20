// src/components/RecipePortfolio.jsx
import React, { useEffect, useState } from 'react';

const RecipePortfolio = ({ chefId }) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Fetch recipes data from the backend
        fetch(`/api/chefs/${chefId}/recipes`)
            .then(response => response.json())
            .then(data => setRecipes(data));
    }, [chefId]);

    return (
        <div>
            <h1>Recipe Portfolio</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <p>{recipe.ingredients}</p>
                        <p>{recipe.instructions}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipePortfolio;
