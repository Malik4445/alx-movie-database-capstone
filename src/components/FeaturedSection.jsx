// src/components/FeaturedSection.jsx
import React from 'react';
import { SearchIcon } from '@heroicons/react/outline'; 

const FeaturedMovieCard = ({ movie }) => {
    return (
        <div className="flex flex-col w-48 flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden">
        {/* ... (rest of the card content) ... */}
        </div>
    );
};


const FeaturedSection = ({ movies }) => {
    return (
        // Main Container: Light Blue background with padding and rounded corners
        <div 
            className="rounded-3xl p-6 md:p-10 shadow-lg mb-12"
            style={{ backgroundColor: 'var(--color-featured-bg)' }}
        >
            {/* Header and Search Icon */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-extrabold text-gray-800 uppercase">
                    latest movies
                </h2>
                {  }
                <SearchIcon className="h-6 w-6 text-gray-800" /> 
            </div>

            {/* Horizontal Movie List (Flexbox) */}
            { }
            <div className="flex space-x-8 overflow-x-auto pb-4">
                {movies.map((movie) => (
                    <FeaturedMovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>

        </div>
    );
};

export default FeaturedSection;