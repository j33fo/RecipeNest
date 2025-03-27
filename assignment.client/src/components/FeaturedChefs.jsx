import React, { useEffect, useState } from 'react';

const FeaturedChefs = () => {
    const [chefs, setChefs] = useState([]);

    useEffect(() => {
        fetch('/api/chefs/featured')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setChefs(data))
            .catch(error => console.error('Error fetching featured chefs:', error));
    }, []);

    return (
        <section>
            <h2>Featured Chefs</h2>
            <ul>
                {chefs.map(chef => (
                    <li key={chef.id}>
                        <h3>{chef.name}</h3>
                        <p>{chef.bio}</p>
                        <img src={chef.pictureUrl} alt={`${chef.name}'s picture`} />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default FeaturedChefs;
