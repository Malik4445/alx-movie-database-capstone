// src/components/MovieList.jsx
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
    return (
        // 🎯 KEY CHANGE: Use Flexbox for horizontal scrolling
        <div className="flex flex-row overflow-x-auto space-x-6 py-10 px-4">
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;