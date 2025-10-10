// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ setSearchTerm, currentTerm }) => {
    
    const handleChange = (e) => {
        // We trigger the search via the useEffect in Home.jsx
        setSearchTerm(e.target.value); 
    };

    return (
        // 🎯 Key styling: Centering (mx-auto, justify-center) and rounded input style
        <div className="flex justify-center my-10 px-4"> 
            <input
                type="text"
                value={currentTerm}
                onChange={handleChange}
                placeholder="Search for a movie title..."
                aria-label="Search for movies"
                // 🎯 Tailwind styles for the dark, large, rounded input
                className="w-full max-w-2xl p-4 text-xl rounded-full bg-zinc-800 text-white placeholder-gray-500 border-none focus:ring-2 focus:ring-red-600 focus:outline-none transition-shadow"
            />
        </div>
    );
};

export default SearchBar;