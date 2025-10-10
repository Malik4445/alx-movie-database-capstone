// src/components/MovieList.jsx
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
    return (
        // 🎯 CSS Grid for responsive layout: 2 cols on mobile, up to 5 on large screens
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 py-10">
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;