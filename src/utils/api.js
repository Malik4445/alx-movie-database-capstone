// src/utils/api.js

const API_KEY = import.meta.env.VITE_OMDB_API_KEY; 
const API_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (title) => {
    if (!title) return { movies: [], error: null }; // Ensure initial check returns correct structure
    
    // Safety check for API Key (prevents console error if .env failed)
    if (!API_KEY) {
        return { movies: [], error: "API Key is missing from environment variables." };
    }
    
    const url = `${API_URL}?s=${title}&apikey=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        
        // Check if response is okay before proceeding (e.g., handles 404 or 500 status codes)
        if (!response.ok) {
             throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        // CRITICAL OMDB RESPONSE CHECK
        if (data.Response === "True") {
            // Success: Return an object with the expected 'movies' key
            return { movies: data.Search, error: null };
        } else {
            // OMDB Failure (e.g., "Movie not found!"): Return an object with the 'error' key
            return { movies: [], error: data.Error };
        }
        
    } catch (networkOrParseError) {
    
        console.error("Network or parsing error:", networkOrParseError);
        
        // Ensure a predictable object structure is returned on failure
        return { movies: [], error: "A critical network error occurred. Check console for details." };
    }
};