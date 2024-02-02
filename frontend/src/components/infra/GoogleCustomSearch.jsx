import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoogleCustomSearch = ({ apiKey, cx, searchTerm }) => {
    // apiKey = "";
    // cx = "";
    // searchTerm = "";
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchTerm}&searchType=image`;

        axios.get(apiUrl)
            .then(response => {
                const fetchedImages = response.data.items.map(item => ({
                    imageUrl: item.link,
                    title: item.title,
                }));

                setImages(fetchedImages);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data from the Custom Search API:', error);
                setLoading(false);
            });
    }, [apiKey, cx, searchTerm]);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {!loading && images.length === 0 && <p>No results found.</p>}
            {!loading && images.length > 0 && (
                <div>
                    <h2>Search Results</h2>
                    <ul>
                        {images.map((image, index) => (
                            <li key={index}>
                                <img src={image.imageUrl} alt={image.title} />
                                <p>{image.title}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default GoogleCustomSearch;
