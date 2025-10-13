// src/components/MovieCard.jsx
import React from 'react';

const MovieCard = ({ movie }) => {
    const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';

    return (
        // 🎯 White card background, shadow, w-full to fit the grid column
        <div 
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer w-full flex flex-col"
            onClick={() => console.log('Navigate to details for:', movie.imdbID)}
        >
            <div className="relative w-full aspect-[2/3]"> 
            {/* Aspect ratio keeps posters uniform height in the grid */}
                <img 
                    src={posterUrl} 
                    alt={`${movie.Title} poster`} 
                    className="w-full h-full object-cover" 
                />
            </div>
            
            <div className="p-4 relative flex flex-col justify-between flex-grow"> 
                {/* Text is dark */}
                <h3 className="text-lg font-bold text-gray-800 truncate">{movie.Title}</h3>
                {/* Secondary text is gray */}
                <p className="text-sm text-gray-500 mt-1">Year: {movie.Year}</p>
            </div>
        </div>
    );
};

export default MovieCard;