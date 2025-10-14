// src/components/MovieCard.jsx
import React from 'react';

const MovieCard = ({ id, title, posterPath, overview, onReadMore }) => {
  const imageUrl = posterPath 
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "/placeholder.svg";

  return (
    <div className="overflow-hidden bg-gradient-to-b from-blue-200/20 to-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl">
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex justify-center">
        <button
          onClick={() => onReadMore(id)}
          className="text-gray-700 font-medium italic hover:bg-blue-100 rounded-full px-8 py-2 transition-colors"
        >
          read more
        </button>
      </div>
    </div>
  );
};

export default MovieCard;