// src/components/NavBar.jsx
import React from 'react';
import { SearchIcon, MenuIcon, UserIcon } from '@heroicons/react/outline';

const NavBar = ({ setSearchTerm }) => {
    

    return (
        // 🎯 Header Container: White background, shadow, fixed width to match content
        <nav className="w-full bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Left Section: Logo/Title */}
                    <div className="flex-shrink-0">
                        {/* Use the vibrant red accent for the primary logo text */}
                        <a href="/" className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-accent-red)' }}>
                            MovieApp
                        </a>
                    </div>
                    
                    {/* Center Section: Navigation Links (Hidden on small screens) */}
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        {/* Using dark text for navigation */}
                        <a href="/movies" className="text-gray-800 hover:text-red-700 px-3 py-2 text-sm font-medium">Movies</a>
                        <a href="/tv" className="text-gray-800 hover:text-red-700 px-3 py-2 text-sm font-medium">TV Shows</a>
                        <a href="/people" className="text-gray-800 hover:text-red-700 px-3 py-2 text-sm font-medium">People</a>
                    </div>

                    {/* Right Section: Icons and User */}
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-500 hover:text-red-600 focus:outline-none">
                            <SearchIcon className="h-6 w-6" />
                        </button>
                        <button className="p-1 rounded-full text-gray-500 hover:text-red-600 focus:outline-none">
                            <UserIcon className="h-6 w-6" />
                        </button>
                        
                        {/* Mobile Menu Button */}
                        <button className="sm:hidden text-gray-500 hover:text-red-600 focus:outline-none">
                            <MenuIcon className="h-6 w-6" />
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default NavBar;