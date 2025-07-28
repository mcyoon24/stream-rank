import './RankingPage.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMoviesForPlatform } from '../api/movieService';
import platformNames from '../data/platformNames';


function RankingPage() {
    const params = useParams();
    const platform = params.platform;
    const formattedPlatform = platformNames[platform];

    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                        <button onClick={() => handleImgClick(movie.title, movie.posterPath, movie.description, platform)}>
                            <img
                                src={`https://image.tmdb.org/t/p/w185${movie.posterPath}`} 
                                alt={`${movie.title} poster`}
                            />
                        </button>
                        {movie.title} - Rating: {movie.rating}
                    </li>
                ))}
            </ol>
            <button className = "rank-return-button" onClick={() => navigate(`/`)}>Return to Home</button>
        </div>
    );
}

export default RankingPage;