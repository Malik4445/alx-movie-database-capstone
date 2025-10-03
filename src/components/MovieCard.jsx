// src/components/MovieCard.jsx
import React from 'react';

const MovieCard = ({ movie }) => {
    // Fallback image if the Poster is "N/A"
    const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';

    return (
        // Tailwind card styling: shadow, rounded corners, fixed width for grid
        <div 
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
            onClick={() => console.log('Navigate to details for:', movie.imdbID)} // Placeholder for next week's routing
        >
            <img 
                src={posterUrl} 
                alt={`${movie.Title} poster`} 
                // Tailwind: fixed height to make all cards uniform, object-cover ensures image fills without stretching
                className="w-full h-80 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{movie.Title}</h3>
                <p className="text-sm text-gray-500">Year: {movie.Year}</p>
                <p className="text-xs text-gray-700 mt-2">ID: {movie.imdbID}</p>
            </div>
        </div>
    );
};

export default MovieCard;