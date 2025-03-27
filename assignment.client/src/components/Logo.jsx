import React from 'react';
import logoImage from '../src/assets/logo.PNG';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo">
      <img src={logoImage} alt="RecipeNest Logo" className="logo-icon" />
      <span className="logo-text">RecipeNest</span>
    </div>
  );
};

export default Logo; 