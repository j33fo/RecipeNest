import React, { useEffect, useState } from 'react';

const FeaturedChefs = () => {
    const [chefs, setChefs] = useState([]);

    useEffect(() => {
        // Fetch featured chefs data from the backend
        fetch('/api/chefs/featured')
            .then(response => response.json())
            .then(data => setChefs(data));
    }, []);

    return (
        <section>
            <h2>Featured Chefs</h2>
            <ul>
                {chefs.map(chef => (
                    <li key={chef.id}>
                        <h3>{chef.name}</h3>
                        <p>{chef.bio}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default FeaturedChefs;
