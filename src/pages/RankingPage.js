import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMoviesForPlatform } from '../api/movieService';
import platformNames from '../data/platformNames';

import { addFavoriteMovie, getUserFavorites, removeFavoriteMovie } from '../firestore';
import { auth } from '../firebase';

import '../styles/RankingPage.css';


function RankingPage() {
    const params = useParams();
    const platform = params.platform;
    const formattedPlatform = platformNames[platform];

    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);


    
    const handleFavorite = async(movie) => {
        const user = auth.currentUser;
        // console.log(movie.title);
        // console.log(movie.posterPath);
        // console.log(movie.id);
        if(!user) {
            alert("Must be logged in to favorite movies")
            return;
        }

        try {
            if (favorites.includes(movie.id)){
                await removeFavoriteMovie(user.uid, {
                    id: movie.id,
                    title: movie.title,
                    path: movie.posterPath,
                }) 
                setFavorites((prev) => prev.filter(id => id !== movie.id));
            } else {
                await addFavoriteMovie(user.uid, {
                    id: movie.id,
                    title: movie.title,
                    path: movie.posterPath,
                })
                setFavorites((prev) => [...prev, movie.id]);
            }
        }
        catch(error){
            console.error("Error adding favorite:", error);
        }
    }

    const handleImgClick = (title, imgPath, description, platform) => {
        navigate(`/description/${title}`, {
            state: {
                title: title,
                path: imgPath,
                description: description,
                platform: platform,
            }
        });
    }
    // console.log(formattedPlatform);

    useEffect(() => {
        getMoviesForPlatform(formattedPlatform)
            .then((data) => {
                console.log('Returned movies:', data);
                setMovies(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError('Failed to load movies');
                setLoading(false);
            });
    }, [formattedPlatform]);

    useEffect(() => {
        const user = auth.currentUser;
        if(user) {
            getUserFavorites(user.uid)
                .then(favs => {
                    setFavorites(favs.map(movie => movie.id));
                })
                .catch(console.error);
        }
    }, [])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (movies.length === 0) {
        return (
        <div className = "not-found-container">
            <h1>No rankings found for: {platform.charAt(0).toUpperCase() + platform.slice(1)}</h1>
            <button onClick={() => navigate(`/`)}>Return to Home</button>
        </div>
        );
    }

    return (
        <div className="ranking-page">
            <h2>Top Picks from {formattedPlatform}</h2>
            <h3>Rankings</h3>
            <ol className="ranking-list">
                {movies.map((movie, i) => (
                    <li key={i}>
                        <div className="ranking-item-container">
                            <button
                                className={`star-button ${favorites.includes(movie.id) ? 'favorited' : ''}`}
                                onClick={() => handleFavorite(movie)}
                            >       
                                ★
                            </button>
                            <span className="rank-number">{i + 1}.</span>
                            <button onClick={() => handleImgClick(movie.title, movie.posterPath, movie.description, platform)}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w185${movie.posterPath}`} 
                                    alt={`${movie.title} poster`}
                                />
                            </button>
                            {movie.title} - Rating: {movie.rating}
                        </div>
                    </li>
                ))}
            </ol>
            <button className = "rank-return-button" onClick={() => navigate(`/`)}>Return to Home</button>
        </div>
    );
}

export default RankingPage;