// src/pages/MovieDetail.jsx
import React from 'react';
import Navbar from "../../components/Navbar";
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
    // This hook allows you to read the ID from the URL (e.g., /movie/tt1234567)
    const { id } = useParams(); 

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto py-12 px-4 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Movie Details</h1>
                <p className="text-xl text-gray-600 mb-8">
                    Displaying details for ID: <span className="text-red-600">{id || 'Loading...'}</span>
                </p>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-gray-700">
                        This component is a placeholder. You will need to implement the API call using 
                        `getMovieDetails(id)` from `../services/omdb` to fetch and display the full movie data here.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;