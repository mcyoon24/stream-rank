const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// gets the top rated movies
export async function getTopRated() {
    try{
        const res = await fetch(
            `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
        );
        const data = await res.json();
        return data.results;
    }
    catch(error) {
        console.error('Fetch error: ' + error);
        return [];
    }
}

// gets the streaming service based on movie id
export async function getProvider(movieId) {
    try{
        const res = await fetch(
            `${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`
        );
        const data = await res.json();
        const usData = data.results?.US; // assigns if US region exists in results
        return  usData?.flatrate ?? []; // returns the platforms if flatrate exists otherwise empty array
    } 
    catch(error) {
        console.error('Fetch error: ' + error);
        return [];
    }
}

// returns top rated movies for specific platform
export async function getMoviesForPlatform(platformName) {
    try {
        const allMovies = await getTopRated();

        // goes through every movie and returns title rating and platform
        const platformMovies = await Promise.all(
            allMovies.map(async (movie) => {
                const platforms = await getProvider(movie.id);
                const platformNames = platforms.map((p) => p.provider_name);
                return {
                    rating: movie.vote_average,
                    title: movie.title,
                    platform: platformNames,
                    posterPath: movie.poster_path,
                }
            })
        );

        // filter for only the ones with the desired platform
        const filtered = platformMovies.filter((movie) => movie.platform.includes(platformName));

        //sort movies
        return filtered ? [...filtered].sort((a, b) => b.rating - a.rating) : [];
    }
    catch(error) {
        console.error(error);
        return [];
    }
}