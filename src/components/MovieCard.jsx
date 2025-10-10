// src/components/MovieCard.jsx
import React from 'react';

const MovieCard = ({ movie }) => {
    // Fallback image if the Poster is "N/A"
    const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';

    return (
        <div 
            className="bg-zinc-800 rounded-xl shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer"
            onClick={() => console.log('Navigate to details for:', movie.imdbID)}
        >
            <img 
                src={posterUrl} 
                alt={`${movie.Title} poster`} 
                // Fixed height for uniform posters
                className="w-full h-96 object-cover" 
            />
            {/* Placeholder for Rating Badge */}
            
            <div className="p-4 relative"> 
                {/* Text is white and bold */}
                <h3 className="text-xl font-bold text-white truncate">{movie.Title}</h3>
                {/* Secondary text is light gray */}
                <p className="text-sm text-gray-400 mt-1">Year: {movie.Year}</p>
            </div>
        </div>
    );
};

export default MovieCard;