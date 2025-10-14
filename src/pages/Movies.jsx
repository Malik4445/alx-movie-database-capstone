// src/pages/Movies.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieGrid from "../components/MovieGrid";
import { searchMovies } from "../services/omdb"; // Use the correct OMDB service
import { toast } from "sonner";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const loadMovies = async () => {
        setIsLoading(true);

        try {
            // Fetch a general set of movies (e.g., 'movie' type or a general query)
            // OMDB often uses a search term, so 'popular' or 'movie' works.
            const data = await searchMovies('movie'); 
            
            // Map the OMDB fields to the expected component props
            const formattedMovies = data.map(movie => ({
                ...movie,
                posterPath: movie.Poster, // OMDB uses 'Poster'
                title: movie.Title,       // OMDB uses 'Title'
            }));
            setMovies(formattedMovies);
        } catch (error) {
            console.error("Failed to fetch movies:", error);
            toast.error("Failed to load movies list.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadMovies();
    }, []);

    const handleMovieClick = (id) => {
        // Navigate to the movie detail page using the correct URL structure
        navigate(`/movie/${id}`);
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-foreground text-center mb-8">
                    Movie Listings
                </h1>
                
                {isLoading ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-muted-foreground">Loading movies...</p>
                    </div>
                ) : movies.length > 0 ? (
                    <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-muted-foreground">No movies found.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Movies;