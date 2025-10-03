// src/components/MovieList.jsx

import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {movies.map((movie) => (
                <MovieCard 
                    // 🚨 CRITICAL FIX: The key must be the unique imdbID
                    key={movie.imdbID} // <--- Ensure you are using movie.imdbID
                    movie={movie}
                />
            ))}
        </div>
    );
};

export default MovieList;