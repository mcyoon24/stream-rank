import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const navigate = useNavigate();

    const handleClick = (platform) => {
        navigate(`/rankings/${platform}`);
    }

    return (
        <div className="homepage-container">
            <h1>Top Rated Movies for Streaming Services</h1>
            <div className="button-row">
                <button onClick={() => handleClick('netflix')}>Netflix</button>
                <button onClick={() => handleClick('prime')}>Prime Video</button>
                <button onClick={() => handleClick('max')}>HBO Max</button>
                <button onClick={() => handleClick('paramount')}>Paramount+</button>
            </div>
            <div className="button-row">
                <button onClick={() => handleClick('disney')}>Disney+</button>
                <button onClick={() => handleClick('hulu')}>Hulu</button>
                <button onClick={() => handleClick('crunchyroll')}>Crunchyroll</button>
                <button onClick={() => handleClick('youtube')}>Youtube TV</button>
            </div>
        </div>     
    )
}

export default HomePage;