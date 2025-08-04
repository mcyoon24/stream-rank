import '../styles/FavoritesPage.css';
import { useFavorites } from '../hooks/useFavorites';
import { useNavigate } from 'react-router-dom';
import { platformKeys } from '../data/platformNames';


function FavoritesPage() {
    const { favorites, handleFavorite } = useFavorites();
    const navigate = useNavigate();

    const handleCardClick = (movie) => {
        navigate(`/description/${movie.title}`, {
            state: {
                id: movie.id,
                title: movie.title,
                path: movie.posterPath,
                description: movie.description,
                platform: platformKeys[movie.platform],
                rating: movie.rating,
            }
        });
    };

    return (
        <div className="favorites-page">
            <h2>Your Favorite Movies</h2>
            {favorites.length === 0 ? (
                <p>You have no favorites yet.</p>
            ) : (
                <ul className="favorites-list">
                    {favorites.map((movie) => (
                        <li 
                            key={movie.id} 
                            className="favorite-item"
                            onClick={() => handleCardClick(movie)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img 
                                src={`https://image.tmdb.org/t/p/w185${movie.posterPath}`} 
                                alt={`${movie.title} poster`} 
                            />
                            <div>
                                <h4>{movie.title}</h4>
                                <p>Rating: {movie.rating}</p>
                                <button 
                                    className='remove-fav-button' 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the card's onClick
                                        handleFavorite(movie)

                                    }}
                                >
                                    Remove from Favorites
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FavoritesPage;