import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ChefsList from './components/ChefsList';
import ChefProfile from './components/ChefProfile';
import ChefDashboard from './components/ChefDashboard';
import Header from './components/Header';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chefs" element={<ChefsList />} />
                <Route path="/chef/:id" element={<ChefProfile />} />
                <Route path="/dashboard" element={<ChefDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;

