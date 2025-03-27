import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RecipePortfolio from './RecipePortfolio';
import './ChefProfile.css';

const ChefProfile = () => {
    const { id } = useParams();
    const [chef, setChef] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('recipes');

    useEffect(() => {
        fetch(`/api/chefs/${id}`)
            .then(response => response.json())
            .then(data => {
                setChef(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching chef:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="loading">Loading chef profile...</div>;
    }

    if (!chef) {
        return <div className="error">Chef not found</div>;
    }

    return (
        <div className="chef-profile-container">
            <div className="chef-header">
                <div className="chef-profile-image">
                    <img 
                        src={chef.pictureUrl || '/default-chef.jpg'} 
                        alt={`${chef.name}'s profile`} 
                    />
                </div>
                <div className="chef-profile-info">
                    <h1>{chef.name}</h1>
                    <p className="chef-specialty">{chef.specialty || 'Professional Chef'}</p>
                    <div className="chef-stats">
                        <div className="stat">
                            <span className="stat-number">{chef.recipeCount || 0}</span>
                            <span className="stat-label">Recipes</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">{chef.followerCount || 0}</span>
                            <span className="stat-label">Followers</span>
                        </div>
                    </div>
                    <div className="social-links">
                        {chef.instagram && (
                            <a href={chef.instagram} target="_blank" rel="noopener noreferrer">
                                Instagram
                            </a>
                        )}
                        {chef.facebook && (
                            <a href={chef.facebook} target="_blank" rel="noopener noreferrer">
                                Facebook
                            </a>
                        )}
                        {chef.website && (
                            <a href={chef.website} target="_blank" rel="noopener noreferrer">
                                Website
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="chef-bio-section">
                <h2>About Me</h2>
                <p>{chef.bio}</p>
            </div>

            <div className="chef-content-tabs">
                <button 
                    className={`tab ${activeTab === 'recipes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('recipes')}
                >
                    Recipes
                </button>
                <button 
                    className={`tab ${activeTab === 'about' ? 'active' : ''}`}
                    onClick={() => setActiveTab('about')}
                >
                    About
                </button>
            </div>

            <div className="chef-content">
                {activeTab === 'recipes' && (
                    <RecipePortfolio chefId={id} />
                )}
                {activeTab === 'about' && (
                    <div className="about-section">
                        <h2>Experience</h2>
                        <p>{chef.experience}</p>
                        <h2>Education</h2>
                        <p>{chef.education}</p>
                        <h2>Contact</h2>
                        <p>Email: {chef.email}</p>
                        <p>Location: {chef.location}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChefProfile;
