import React, { useEffect, useState } from 'react';

const LatestRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('/api/recipes/latest')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setRecipes(data))
            .catch(error => console.error('Error fetching latest recipes:', error));
    }, []);

    return (
        <section>
            <h2>Latest Recipes</h2>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.ingredients}</p>
                        <p>{recipe.instructions}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default LatestRecipes;
