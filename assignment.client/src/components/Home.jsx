import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [featuredChefs, setFeaturedChefs] = useState([]);
  const [latestRecipes, setLatestRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chefsResponse, recipesResponse] = await Promise.all([
          fetch("/api/chefs/featured"),
          fetch("/api/recipes/latest")
        ]);

        if (!chefsResponse.ok || !recipesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [chefsData, recipesData] = await Promise.all([
          chefsResponse.json(),
          recipesResponse.json()
        ]);

        setFeaturedChefs(chefsData);
        setLatestRecipes(recipesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to RecipeNest</h1>
          <p>Discover amazing recipes from talented chefs around the world</p>
          <button className="cta-button" onClick={() => navigate("/recipes")}>
            Explore Recipes
          </button>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Chefs</h2>
          <button className="view-all-btn" onClick={() => navigate("/chefs")}>
            View All
          </button>
        </div>
        <div className="featured-chefs">
          {featuredChefs.map((chef) => (
            <div key={chef.id} className="chef-card" onClick={() => navigate(`/chef/${chef.id}`)}>
              <div className="chef-image">
                <img src={chef.pictureUrl || "/default-chef.jpg"} alt={chef.name} />
              </div>
              <div className="chef-info">
                <h3>{chef.name}</h3>
                <p className="chef-specialty">{chef.specialty}</p>
                <p className="chef-location">{chef.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="latest-section">
        <div className="section-header">
          <h2>Latest Recipes</h2>
          <button className="view-all-btn" onClick={() => navigate("/recipes")}>
            View All
          </button>
        </div>
        <div className="latest-recipes">
          {latestRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card" onClick={() => navigate(`/recipes/${recipe.id}`)}>
              <div className="recipe-image">
                <img src={recipe.imageUrl || "/default-recipe.jpg"} alt={recipe.title} />
              </div>
              <div className="recipe-info">
                <h3>{recipe.title}</h3>
                <p className="recipe-description">{recipe.description}</p>
                <div className="recipe-meta">
                  <span>{recipe.cookingTime} mins</span>
                  <span>{recipe.difficulty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
