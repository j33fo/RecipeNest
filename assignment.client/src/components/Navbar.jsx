import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Logo />
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger ${isMenuOpen ? "open" : ""}`}></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/recipes" onClick={() => setIsMenuOpen(false)}>
              Recipes
            </Link>
          </li>
          <li>
            <Link to="/chefs" onClick={() => setIsMenuOpen(false)}>
              Chefs
            </Link>
          </li>
          <li>
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 