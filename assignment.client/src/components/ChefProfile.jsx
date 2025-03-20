import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ChefProfile = () => {
    const { id } = useParams();
    const [chef, setChef] = useState(null);

    useEffect(() => {
        // Fetch chef data from the backend
        fetch(`/api/chefs/${id}`)
            .then(response => response.json())
            .then(data => setChef(data));
    }, [id]);

    if (!chef) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{chef.name}</h1>
            <img src={chef.pictureUrl} alt={`${chef.name}'s picture`} />
            <p>{chef.bio}</p>
            <p>Contact: {chef.contactInfo}</p>
        </div>
    );
};

export default ChefProfile;
