import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ChefsList.css';

const ChefsList = () => {
    const [chefs, setChefs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/chefs')
            .then(response => response.json())
            .then(data => {
                setChefs(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching chefs:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Loading chefs...</div>;
    }

    return (
        <div className="chefs-list-container">
            <h1 className="page-title">Our Featured Chefs</h1>
            <div className="chefs-grid">
                {chefs.map(chef => (
                    <div key={chef.id} className="chef-card">
                        <div className="chef-image-container">
                            <img 
                                src={chef.pictureUrl || '/default-chef.jpg'} 
                                alt={`${chef.name}'s profile`} 
                                className="chef-image"
                            />
                        </div>
                        <div className="chef-info">
                            <h2 className="chef-name">{chef.name}</h2>
                            <p className="chef-specialty">{chef.specialty || 'Professional Chef'}</p>
                            <p className="chef-bio">{chef.bio}</p>
                            <div className="chef-stats">
                                <span>{chef.recipeCount || 0} Recipes</span>
                                <span>{chef.followerCount || 0} Followers</span>
                            </div>
                            <Link to={`/chef/${chef.id}`} className="view-profile-btn">
                                View Profile
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChefsList;
