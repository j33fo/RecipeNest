import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <img src="/src/assets/react.svg" alt="RecipeNest Logo" />
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/chefs">Chefs</Link></li>
                    <li><Link to="/recipes">Recipes</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
