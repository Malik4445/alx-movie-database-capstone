// src/services/omdb.js

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || "OMDB_API_KEY_MISSING";
const BASE_URL = "https://www.omdbapi.com/";

// Utility function to check API key 
const checkApiKey = () => {
    if (OMDB_API_KEY === "OMDB_API_KEY_MISSING") {
        console.error("OMDB API Key not found. Please check your .env file.");
        return false;
    }
    return true;
};
// Fetch movie details by IMDB ID (tt1234567) 
export const getMovieDetails = async (id) => {
    if (!checkApiKey()) return null;

    try {
        // Fetch using the unique ID (?i=) and request full plot
        const response = await fetch(
            `${BASE_URL}?apikey=${OMDB_API_KEY}&i=${encodeURIComponent(id)}&plot=full`
        );
        const data = await response.json();

        if (data.Response === "True") {
            // Map the single-item response fields to component structure
            return {
                ...data,
                posterPath: data.Poster, // Map Poster
                title: data.Title,       // Map Title
                id: data.imdbID,         // Ensure ID is present
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching OMDB details:", error);
        return null;
    }
};


// Search movies by title 
export const searchMovies = async (query = 'popular') => {
    if (!checkApiKey()) return [];

    try {
        // 1. Initial Search Request (uses '&s=')
        const searchResponse = await fetch(
            `${BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`
        );
        const searchData = await searchResponse.json();

        if (searchData.Response === "True" && searchData.Search) {
            const briefResults = searchData.Search;

            // 2. Prepare a list of promises for the detailed lookup (the "double-tap")
            const detailPromises = briefResults.map(async (item) => {
                // Use a try/catch here so a single failed detail lookup doesn't crash Promise.all
                try {
                    return await getMovieDetails(item.imdbID);
                } catch (error) {
                    // Log the error for the specific ID but allow the main search to continue
                    console.error(`Failed to fetch details for ID ${item.imdbID}:`, error);
                    return null; // Return null on error
                }
            });

            // 3. Wait for all detail lookups to complete
            const fullDetails = await Promise.all(detailPromises);
            
            // 4. Filter out any null values (failed lookups) and return the successful results
            return fullDetails.filter(movie => movie !== null);

        } else {
            console.log(`No results found for query: ${query}`);
            // IMPORTANT: If the search returns an error (e.g., "Movie not found!")
            if (searchData.Error) {
                throw new Error(searchData.Error);
            }
            return [];
        }
    } catch (error) {
        console.error("Error searching OMDB:", error);
        // Throw the error so the component can catch it and display the "Failed to load" message
        throw new Error("Failed to load movies list: " + error.message);
    }
};

export const getTVShows = async () => {
    // Uses OMDB search for 'series' type 
    return searchMovies('tv series');
};