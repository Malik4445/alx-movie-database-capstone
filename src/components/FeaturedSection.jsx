// src/components/FeaturedSection.jsx
import React from 'react';
import { SearchIcon } from '@heroicons/react/outline'; // Adjust import if you use v2/v3

// We'll use a simplified version of the movie card tailored for this section
const FeaturedMovieCard = ({ movie }) => {
    const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Poster';

    return (
        // Card wrapper: Fixed width (w-48), white background, slight shadow
        <div className="flex flex-col w-48 flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden">
            
            {/* Poster Image (2:3 aspect ratio) */}
            <div className="relative w-full aspect-[2/3]"> 
                <img 
                    src={posterUrl} 
                    alt={`${movie.Title} poster`} 
                    className="w-full h-full object-cover" 
                />
            </div>
            
            {/* Text & Button Area */}
            <div className="p-3 text-center flex flex-col items-center">
                {/* Movie Title */}
                <h3 className="text-base font-medium text-gray-800 line-clamp-2 mt-1 mb-2">
                    {movie.Title}
                </h3>
                
                {/* Read More Button (Vibrant Red) */}
                <button 
                    className="mt-2 w-full px-4 py-2 text-sm font-semibold rounded-full text-white transition-colors duration-200"
                    style={{ backgroundColor: 'var(--color-accent-red)' }}
                    onClick={() => console.log('Read more:', movie.imdbID)}
                >
                    read more
                </button>
            </div>
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
                {/* Search icon (large) */}
                <SearchIcon className="h-8 w-8 text-gray-800" />
            </div>

            {/* Horizontal Movie List (Flexbox) */}
            <div className="flex space-x-6 overflow-x-auto pb-4">
                {movies.map((movie) => (
                    <FeaturedMovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>

        </div>
    );
};

export default FeaturedSection;