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
    
    // 2. Data Fetching Function
    const fetchMovies = async (title) => { 
        setIsLoading(true); 
        setError(null);
        setMovies([]);

        const { movies: fetchedMovies, error: fetchError } = await searchMovies(title);

        setIsLoading(false);
        
        if (fetchError) {
            setError(fetchError);
        } else {
        
            const uniqueMovies = [];
            const ids = new Set();
            
            const moviesArray = fetchedMovies || []; 
            
            for (const movie of moviesArray) {
                if (movie && movie.imdbID && !ids.has(movie.imdbID)) {
                    ids.add(movie.imdbID);
                    uniqueMovies.push(movie);
                }
            }
            
            setMovies(uniqueMovies);
        }
    };
    
    useEffect(() => {
        if (searchTerm.trim()) { 
            fetchMovies(searchTerm);
        } else {
            setMovies([]);
            setError(null);
        }
    }, [searchTerm]);
    
    
    // 4. Component Render (JSX)
    return (
        <div className="min-h-screen"> 
    <header className="py-12 px-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800">
            {/* 🎯 Updated text color to dark gray */}
            Movie Database 🎬
        </h1>
    </header>
        
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SearchBar 
                    setSearchTerm={setSearchTerm} 
                    currentTerm={searchTerm} 
                />

                {/* Conditional Rendering - Updated text colors for dark theme */}
                
                {isLoading && (
                    <p className="text-center text-xl text-red-500 mt-10">
                        Loading movies for "{searchTerm}"...
                    </p>
                )}
                
                {error && !isLoading && (
                    <p className="text-center text-red-700 text-xl font-medium mt-10">
                        Error: {error}
                    </p>
                )}
                
                {!isLoading && !error && movies.length === 0 && searchTerm.trim() && (
                    <p className="text-center text-gray-400 text-xl mt-10">
                        No results found for "{searchTerm}". Try a different title.
                    </p>
                )}
                
                {/* Movie List Display */}
                {!isLoading && !error && movies.length > 0 && (
                    <MovieList movies={movies} />
                )}
            </div>
        </div>
    );
};

export default Home;