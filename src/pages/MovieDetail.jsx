// src/pages/MovieDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMovieDetails } from "../services/omdb"; // Import the service function
import { toast } from "sonner";

const MovieDetail = () => {
    // 1. Get the 'id' (imdbID) from the URL
    const { id } = useParams(); 
    
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            loadMovieDetails(id);
        }
    }, [id]); // Re-run if the URL ID changes

    const loadMovieDetails = async (movieId) => {
        setIsLoading(true);
        try {
            const data = await getMovieDetails(movieId);

            if (data) {
                setMovie(data);
            } else {
                // If API returns no data, navigate to a 404 page
                toast.error("Movie not found.");
                navigate("/404");
            }
        } catch (error) {
            console.error("Error loading movie details:", error);
            toast.error("Failed to load movie details.");
            navigate("/404");
        } finally {
            setIsLoading(false);
        }
    };

    // --- RENDER LOGIC ---

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <p className="text-xl">Loading movie details...</p>
            </div>
        );
    }

    if (!movie) {
        // Fallback for unexpected error or no data (should be caught by the loader above)
        return (
            <div className="min-h-screen bg-background text-foreground text-center pt-20">
                <h1 className="text-3xl font-bold">Movie Data Not Available</h1>
                <p>Please check the API key and ensure the ID is valid.</p>
            </div>
        );
    }

    // Handle case where poster is 'N/A'
    const posterUrl = movie.posterPath !== "N/A" ? movie.posterPath : 'placeholder-url-here';

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8 bg-card p-6 rounded-xl shadow-lg">
                    {/* Poster Section (Left) */}
                    <div className="flex-shrink-0 md:w-1/3">
                        <img
                            src={posterUrl}
                            alt={movie.Title}
                            className="w-full h-auto object-cover rounded-lg shadow-xl"
                            style={{ aspectRatio: '2/3' }}
                        />
                    </div>

                    {/* Details Section (Right) */}
                    <div className="md:w-2/3">
                        <h1 className="text-4xl font-extrabold text-primary mb-2">{movie.Title}</h1>
                        <p className="text-lg text-muted-foreground mb-4">
                            {movie.Year} &bull; {movie.Rated} &bull; {movie.Runtime} &bull; {movie.Genre}
                        </p>
                        
                        <p className="text-lg mb-6">{movie.Plot}</p>

                        <div className="space-y-3">
                            <p><strong>Director:</strong> <span className="text-accent-foreground">{movie.Director}</span></p>
                            <p><strong>Writer:</strong> {movie.Writer}</p>
                            <p><strong>Actors:</strong> {movie.Actors}</p>
                            <p><strong>Language:</strong> {movie.Language}</p>
                            <p><strong>Awards:</strong> {movie.Awards}</p>
                            
                            {/* IMDB Rating Display */}
                            {movie.Ratings && movie.Ratings.length > 0 && (
                                <div className="pt-4">
                                    <h3 className="text-xl font-bold mb-2">Ratings:</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {movie.Ratings.map((rating, index) => (
                                            <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                                                {rating.Source}: {rating.Value}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MovieDetail;