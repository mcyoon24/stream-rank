import './RankingPage.css';
import { useParams } from 'react-router-dom';
import movieData from '../data/movieData';
import { useNavigate } from 'react-router-dom';


function RankingPage() {
    const params = useParams();
    const platform = params.platform;
    const movies = movieData[platform];
    const sortedMovies = movies ? [...movies].sort((a, b) => b.rating - a.rating) : [];
    const navigate = useNavigate();


    if(!movies) {
        return <div>No rankings found for: {platform.charAt(0).toUpperCase() + platform.slice(1)}.</div>;
    }

    return (
        <div className="rankingpage-container">
            <h2 className="header-title">Top Picks from {platform.charAt(0).toUpperCase() + platform.slice(1)}</h2>
            <h3 className="ranking-title">Rankings</h3>
            <ol className="ranking-ol">
                {sortedMovies.map((movie, i) => (
                    <li className="ranking-li" key={i}>
                        {movie.title} - IMDb Rating: {movie.rating}
                    </li>
                ))}
            </ol>
            <button className = "return-button" onClick={() => navigate(`/`)}>Return to Home</button>
        </div>
    );
}

export default RankingPage;
