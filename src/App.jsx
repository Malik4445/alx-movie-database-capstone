// src/App.jsx

import { Toaster } from "sonner"; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    
    <QueryClientProvider client={queryClient}>
        {/* 2. Toaster is placed outside the router for global use */}
        <Toaster richColors position="top-right" /> 
        <BrowserRouter>
            <Routes>
                {/* Home route */}
                <Route path="/" element={<Home />} />
                
                {/* Movies and TV Shows main routes */}
                <Route path="/movies" element={<Movies />} />
                <Route path="/tv-shows" element={<TVShows />} />
                
                {/* Detail routes for both movies and TV shows */}
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/tv/:id" element={<MovieDetail />} />
                
                {/* 404/Catch-all route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
);

export default App;
