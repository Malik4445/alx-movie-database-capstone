// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { searchMovies } from '../utils/api'; 

const Home = () => {
    // 1. State Declarations (Hooks)
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('Batman'); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // 2. Data Fetching Function - CORRECTED
    const fetchMovies = async (title) => { // <--- START FUNCTION HERE
        setIsLoading(true); // <--- SETUP
        setError(null);
        setMovies([]); // Clear old results

        // Call the API utility function and destructure the result
        const { movies: fetchedMovies, error: fetchError } = await searchMovies(title); // <--- API CALL

        // -------------------------------------------------------------------------
        // The rest of the logic you provided MUST be inside this function body
        // -------------------------------------------------------------------------
        setIsLoading(false);
        
        if (fetchError) {
            setError(fetchError);
        } else {
            // CRITICAL STEP: Deduplicate the movies array
            const uniqueMovies = [];
            const ids = new Set();
            
            // Loop through fetchedMovies (which may be undefined or null if no results)
            const moviesArray = fetchedMovies || []; 
            
            for (const movie of moviesArray) {
                // The 'imdbID' is the unique identifier
                if (movie && movie.imdbID && !ids.has(movie.imdbID)) {
                    ids.add(movie.imdbID);
                    uniqueMovies.push(movie);
                }
            }
            
            setMovies(uniqueMovies); // Set the cleaned, unique list
        }
    }; // <--- END FUNCTION HERE
    // -------------------------------------------------------------------------

    // 3. useEffect Hook for Triggering Search
    useEffect(() => {
        // Only run the fetch function if the search term is not empty
        if (searchTerm.trim()) { 
            fetchMovies(searchTerm);
        } else {
            setMovies([]);
            setError(null);
        }
    // This hook runs once on mount, and again every time 'searchTerm' changes.
    }, [searchTerm]);
    
    
    // 4. Component Render (JSX)
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <header className="py-6">
                <h1 className="text-4xl font-extrabold text-center text-gray-800">
                    Movie Database 🎬
                </h1>
            </header>
            
            <SearchBar 
                setSearchTerm={setSearchTerm} 
                currentTerm={searchTerm} 
            />

            {/* Conditional Rendering */}
            
            {/* Loading State */}
            {isLoading && (
                <p className="text-center text-xl text-blue-600 mt-10">
                    Loading movies for "{searchTerm}"...
                </p>
            )}
            
            {/* Error State */}
            {error && !isLoading && (
                <p className="text-center text-red-600 text-xl font-medium mt-10">
                    Error: {error}
                </p>
            )}
            
            {/* No Results Message */}
            {!isLoading && !error && movies.length === 0 && searchTerm.trim() && (
                <p className="text-center text-gray-500 text-xl mt-10">
                    No results found for "{searchTerm}". Try a different title.
                </p>
            )}
            
            {/* Movie List Display */}
            {!isLoading && !error && movies.length > 0 && (
                <MovieList movies={movies} />
            )}
        </div>
    );
};

export default Home;