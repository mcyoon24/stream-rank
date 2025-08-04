import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMoviesForPlatform } from '../api/movieService';
import { platformNames } from '../data/platformNames';
import { useFavorites } from '../hooks/useFavorites';

import '../styles/RankingPage.css';


function RankingPage() {
    const params = useParams();
    const platform = params.platform;
    const formattedPlatform = platformNames[platform];

    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { favorites, handleFavorite } = useFavorites();

    const handleImgClick = (id, title, imgPath, description, platform, rating) => {
        navigate(`/description/${title}`, {
            state: {
                id: id,
                title: title,
                path: imgPath,
                description: description,
                platform: platform,
                rating: rating,
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
                                className={`star-button ${favorites.some(fav => fav.id === movie.id) ? 'favorited' : ''}`}
                                onClick={() => handleFavorite(movie)}
                            >       
                                ★
                            </button>
                            <span className="rank-number">{i + 1}.</span>
                            <button onClick={() => handleImgClick(movie.id, movie.title, movie.posterPath, movie.description, platform, movie.rating)}>
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