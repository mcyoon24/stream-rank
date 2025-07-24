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
                <button onClick={() => handleClick('hulu')}>Hulu</button>
                <button onClick={() => handleClick('disney')}>Disney+</button>
            </div>
        </div>     
    )
}

export default HomePage;