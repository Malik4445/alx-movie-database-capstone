// src/components/MovieCard.jsx
import React from 'react';

const MovieCard = ({ movie }) => {
    const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';

    return (
        // 🎯 KEY CHANGE: Set a fixed width (e.g., w-48 or w-56)
        // flex-shrink-0 prevents the card from shrinking in the horizontal row
        <div 
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col w-48 flex-shrink-0"
            onClick={() => console.log('Navigate to details for:', movie.imdbID)}
        >
            <div className="relative w-full aspect-[2/3]"> 
                <img 
                    src={posterUrl} 
                    alt={`${movie.Title} poster`} 
                    className="w-full h-full object-cover" 
                />
            </div>
            
            <div className="p-4 relative flex flex-col justify-between flex-grow"> 
                <h3 className="text-lg font-bold text-gray-800 truncate">{movie.Title}</h3>
                <p className="text-sm text-gray-500 mt-1">Year: {movie.Year}</p>
            </div>
        </div>
    );
};

export default MovieCard;