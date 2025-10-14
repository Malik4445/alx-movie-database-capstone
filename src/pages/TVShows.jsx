// src/pages/TVShows.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import SearchBar from "../components/SearchBar"; // Changed from @/
import MovieGrid from "../components/MovieGrid"; // Changed from @/
import { getTVShows } from "../services/omdb"; // Changed from @/
import { toast } from "sonner";

const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTVShows();
  }, []);

  const loadTVShows = async () => {
    setLoading(true);
    try {
      const data = await getTVShows();
      // Map API path to component prop
      const formattedShows = data.map(show => ({
          ...show,
          posterPath: show.poster_path, 
      }));
      setShows(formattedShows);
    } catch (error) {
      toast.error("Failed to load TV shows");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    loadTVShows();
  };

  const handleShowClick = (id) => {
    navigate(`/tv/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
        />
        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">Loading TV shows...</p>
          </div>
        ) : (
          <MovieGrid movies={shows} onMovieClick={handleShowClick} />
        )}
      </main>
    </div>
  );
};

export default TVShows;