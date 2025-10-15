import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieGrid from "../components/MovieGrid";
import { searchMovies } from "../services/omdb"; 
import { toast } from "sonner"; // Assuming 'sonner' for toast notifications

const Movies = () => {
    // Correctly defined state hook: [state, setter]
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const loadMovies = async () => {
        try {
            // 1. Start loading
            setIsLoading(true);
            
            // 2. Fetch data (uses the 'double-tap' logic from omdb.js)
            const fetchedMovies = await searchMovies(); 
            
            // 3. Set the state with the fetched, image-ready movies
            setMovies(fetchedMovies); 

        } catch (error) {
            // 4. Handle errors from the service layer
            console.error("Error loading movies:", error);
            // Display the specific error message thrown by the service
            toast.error(`Failed to load movies: ${error.message}`); 

        } finally {
            // 5. Stop loading, regardless of success or failure
            setIsLoading(false); 
        }
    };

    // Call loadMovies once when the component mounts
    useEffect(() => {
        loadMovies();
    }, []);

    const handleMovieClick = (id) => {
        // Navigates to the movie detail page
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
                    // Display the grid if movies are found
                    <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
                ) : (
                    // Display "No movies found" if the fetch succeeded but returned an empty list
                    <div className="text-center py-20">
                        <p className="text-xl text-muted-foreground">No movies found.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Movies;