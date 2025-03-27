import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ChefsList from './components/ChefsList';
import ChefProfile from './components/ChefProfile';
import ChefDashboard from './components/ChefDashboard';
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import RecipeEdit from './components/RecipeEdit';
import RecipeCreate from './components/RecipeCreate';
import RecipeView from './components/RecipeView';
import RecipePortfolio from './components/RecipePortfolio';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chefs" element={<ChefsList />} />
                <Route path="/chef/:id" element={<ChefProfile />} />
                <Route path="/chef/:id/portfolio" element={<RecipePortfolio />} />
                <Route path="/dashboard" element={<ChefDashboard />} />
                <Route path="/recipes" element={<RecipeList />} />
                <Route path="/recipes/create" element={<RecipeCreate />} />
                <Route path="/recipes/:id/edit" element={<RecipeEdit />} />
                <Route path="/recipes/:id" element={<RecipeView />} />
            </Routes>
        </Router>
    );
};

export default App;

