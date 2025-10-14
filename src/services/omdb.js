// src/services/omdb.js

// Reads the key directly from the environment variables exposed by Vite
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || "OMDB_API_KEY_MISSING";
const BASE_URL = "https://www.omdbapi.com/";

// Search movies by title

export const searchMovies = async (query = 'popular') => {
  if (OMDB_API_KEY === "OMDB_API_KEY_MISSING") {
    console.error("OMDB API Key not found. Please check your .env file.");
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    if (data.Response === "True" && data.Search) {
      // Map OMDB fields to our expected structure for components
      return data.Search.map(item => ({
          ...item,
          poster_path: item.Poster, // Used by the movie grid
          title: item.Title
      }));
    } else {
      console.log(`No results found for query: ${query}`);
      return [];
    }
  } catch (error) {
    console.error("Error searching OMDB:", error);
    return [];
  }
};

export const getTVShows = async () => {
  // Use OMDB search for 'series' type
  return searchMovies('tv series');
};

export const getMovieDetails = async (id) => {
  if (OMDB_API_KEY === "OMDB_API_KEY_MISSING") {
    return null;
  }

  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${OMDB_API_KEY}&i=${encodeURIComponent(id)}&plot=full`
    );
    const data = await response.json();

    if (data.Response === "True") {
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching OMDB details:", error);
    return null;
  }
};