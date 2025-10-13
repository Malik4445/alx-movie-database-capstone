// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import FeaturedSection from '../components/FeaturedSection'; // 🎯 NEW IMPORT
import { searchMovies } from '../utils/api'; 
// Note: SearchBar and MovieList are NOT used for this specific Figma replication

const Home = () => {
    // ... (Your state and useEffect hooks remain the same, ensuring 'movies' is populated)
    
    // We'll rename the state to better reflect the featured content
    const [featuredMovies, setFeaturedMovies] = useState([]);
    // ... (Your fetchMovies function logic remains the same, but set the results to setFeaturedMovies)

    // For demonstration, let's assume 'Batman' provides your featured data
    useEffect(() => {
        // Fetch a default list for the featured section
        const fetchDefaultMovies = async () => {
            const { movies: fetchedMovies } = await searchMovies('divided'); // Using 'divided' from the image
            setFeaturedMovies(fetchedMovies || []);
        };
        fetchDefaultMovies();
    }, []);
    
    
    // 4. Component Render (JSX)
    return (
        <div className="min-h-screen"> 
            
            {/* Content Wrapper - Max Width and Centering */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20"> 
                
                {/* 🎯 The Featured Section that EXACTLY matches the Figma */}
                {featuredMovies.length > 0 && (
                    <FeaturedSection movies={featuredMovies} />
                )}

                {/* --- Other content would go here (e.g., a main search grid) --- */}
                
            </div>
            
            {/* Floating Navigation Bar (Matches Bottom of Figma) */}
            {/* The Figma shows a nav bar that seems to be fixed at the bottom/top */}
            <div 
                className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200"
                style={{ zIndex: 50 }}
            >
                <div className="max-w-7xl mx-auto flex justify-around p-4">
                    <a href="#" className="text-gray-800 font-bold hover:text-red-700">HOME</a>
                    <a href="#" className="text-gray-600 hover:text-red-700">MOVIES</a>
                    <a href="#" className="text-gray-600 hover:text-red-700">TV SHOWS</a>
                </div>
            </div>
        </div>
    );
};

export default Home;