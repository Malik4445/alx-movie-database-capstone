// src/components/MovieGrid.jsx
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, onMovieClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterPath={movie.poster_path} // API path is used here
          overview={movie.overview}
          onReadMore={onMovieClick}
        />
      ))}
    </div>
  );
};

export default MovieGrid;