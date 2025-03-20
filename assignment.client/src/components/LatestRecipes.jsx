import React, { useEffect, useState } from 'react';

const LatestRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Fetch latest recipes data from the backend
        fetch('/api/recipes/latest')
            .then(response => response.json())
            .then(data => setRecipes(data));
    }, []);

    return (
        <section>
            <h2>Latest Recipes</h2>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.ingredients}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default LatestRecipes;
