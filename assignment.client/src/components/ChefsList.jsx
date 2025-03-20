import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ChefsList = () => {
    const [chefs, setChefs] = useState([]);

    useEffect(() => {
        // Fetch chefs data from the backend
        fetch('/api/chefs')
            .then(response => response.json())
            .then(data => setChefs(data));
    }, []);

    return (
        <div>
            <h1>Chefs List</h1>
            <ul>
                {chefs.map(chef => (
                    <li key={chef.id}>
                        <h2>{chef.name}</h2>
                        <p>{chef.bio}</p>
                        <Link to={`/chef/${chef.id}`}>View Profile</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChefsList;
