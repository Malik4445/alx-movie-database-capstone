// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ setSearchTerm, currentTerm }) => {
    
    const handleChange = (e) => {
        setSearchTerm(e.target.value); 
    };

    return (
        <div className="flex justify-center my-10 px-4"> 
            <input
                type="text"
                value={currentTerm}
                onChange={handleChange}
                placeholder="Search for a movie title..."
                aria-label="Search for movies"
                // 🎯 Light gray background, dark text/placeholder, red focus ring
                className="w-full max-w-2xl p-4 text-xl rounded-full bg-gray-200 text-gray-800 placeholder-gray-500 border-none focus:ring-2 focus:ring-red-600 focus:outline-none transition-shadow"
            />
        </div>
    );
};

export default SearchBar;