import '../styles/DescriptionPage.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useFavorites } from '../hooks/useFavorites';
import DiscussionBoard from '../components/DiscussionBoard';


function DescriptionPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, title, path, description, platform, rating } = location.state || {};
    const { favorites, handleFavorite } = useFavorites();

    const backButton = () => {
        navigate(`/rankings/${platform}`);
    }
    // console.log(rating);
    const movie = {
        id: id,
        title: title,
        posterPath: path,
        description: description,
        rating: rating,
    };

    return (
        <div className='description-page'> 
            <div className='left'>
                <img 
                    src={`https://image.tmdb.org/t/p/w185${path}`} 
                    alt={`${title} poster`}
                /> 
                <div className='buttons'>
                    <button onClick={() => navigate(`/`)}>Return to Home</button>
                    <button onClick={() => backButton()}>Return to Rankings</button>
                </div>
            </div>

            <div className='right'>
                <div className='title-row'>
                    <h2>{title}</h2>
                    <button
                        className={`star-button ${favorites.some(fav => fav.id === movie.id) ? 'favorited' : ''}`}
                        onClick={() => handleFavorite(movie)}
                        >
                        ★
                    </button>
                </div>
                <div className='description-box'>
                    <h3>{rating}</h3>    
                    <p>{description}</p>
                </div>
                <DiscussionBoard movieId={movie.id} />
            </div>

        </div>
    )
}

export default DescriptionPage;