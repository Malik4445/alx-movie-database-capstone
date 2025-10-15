// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import { searchMovies } from "../services/omdb"; 
import { toast } from "sonner"; 

const Home = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async (query = '') => {
        // --- START FIX: Set loading state immediately ---
        setIsLoading(true);

        try {
            // Determine if we're searching or fetching defaults
            const results = query
                ? await searchMovies(query)
                : await searchMovies('popular'); 
            
            // OMDB returns 'Poster', the components expect 'poster_path'
            const formattedResults = results.map(movie => ({
    ...movie,
    posterPath: movie.Poster || movie.poster_path, 
    // FIX: Map OMDB's 'Title' to the expected 'title'
    title: movie.Title || movie.title,
    id: movie.imdbID,
}));

setMovies(formattedResults);

        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Failed to fetch movies. Check console for details.");
            
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Fetch popular movies on initial load
        fetchData();
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            setIsSearching(true);
            fetchData(searchTerm);
        } else {
            setIsSearching(false);
            fetchData(); 
        }
    };

    const handleReadMore = (id) => {
    navigate(`/movie/${id}`);
};

    return (
        <div className="min-h-screen bg-gray-50 pb-20"> 
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <SearchBar 
                    value={searchTerm}
                    onChange={setSearchTerm}
                    onSearch={handleSearch}
                />
                
                <h2 className="text-2xl font-bold text-gray-800 mb-8 mt-4 text-center">
                    {isSearching ? `Search Results for "${searchTerm}"` : 'Popular Movies'}
                </h2>
                
                {isLoading ? (
                    <p className="text-center text-gray-500">Loading movies...</p>
                ) : movies.length > 0 ? (
                    <MovieGrid movies={movies} onMovieClick={handleReadMore} />
                ) : (
                    <p className="text-center text-gray-500">No movies found.</p>
                )}
            </div>
        </div>
    );
};

export default Home;