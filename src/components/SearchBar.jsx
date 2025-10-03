// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ setSearchTerm }) => {
    const handleChange = (e) => {
        // Update the state in the parent component immediately on change
        setSearchTerm(e.target.value); 
    };

    return (
        <div className="max-w-xl mx-auto mb-8">
            <input
                type="text"
                placeholder="Search for a movie title..."
                onChange={handleChange}
                // Tailwind for styling: large input, full width, rounded, shadow, and good padding
                className="w-full p-3 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default SearchBar;