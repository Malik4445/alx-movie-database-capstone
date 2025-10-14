// src/pages/NotFound.jsx
import React from 'react';
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-xl mx-auto py-24 px-4 text-center">
                <h1 className="text-9xl font-extrabold text-red-600 mb-4">404</h1>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Page Not Found</h2>
                <p className="text-lg text-gray-600 mb-10">
                    Oops! The page you are looking for doesn't exist. It might have been moved or deleted.
                </p>
                <Link 
                    to="/" 
                    className="inline-block px-8 py-3 text-lg font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition duration-300"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;