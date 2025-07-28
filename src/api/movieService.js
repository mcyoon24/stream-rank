const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// gets the top rated movies 
export async function getTopRated() {
    const urls = [];
    for (let i = 1; i <= 8; i++) {
        urls.push(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${i}`);
    }
    try{
        // get data
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
        // condense data into single array
        const movies = data.flatMap(page => page.results);
        // console.log(Object.keys(movies[0]));
        // console.log(movies[0].overview);
        return movies;
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
        console.log('PLATFORMS');
        console.log(usData);
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
                // console.log(Object.keys(movie));
                const platforms = await getProvider(movie.id);
                const platformNames = platforms.map((p) => p.provider_name);
                // console.log(movie.title);
                // console.log(movie);
                // console.log(platformNames);
                // console.log(movie.overview);
                return {
                    description: movie.overview,
                    rating: movie.vote_average,
                    title: movie.title,
                    platform: platformNames,
                    posterPath: movie.poster_path,
                }
            })
        );

        // filter for only the ones with the desired platform
        // const filtered = platformMovies;
        const filtered = platformMovies.filter((movie) => movie.platform.includes(platformName));

        //sort movies
        return filtered ? [...filtered].sort((a, b) => b.rating - a.rating) : [];
    }
    catch(error) {
        console.error(error);
        return [];
    }
}