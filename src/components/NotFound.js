import './NotFound.css';
import { useNavigate } from 'react-router-dom';


function NotFound() {
    const navigate = useNavigate();

    return(
        <div className = "notfound-container">
            <h1>Page Not Found</h1>
            <p>Sorry, we couldn't find the page you were looking for</p>
            <button className = "return-button" onClick={() => navigate(`/`)}>Return to Home</button>
        </div>
    );
}

export default NotFound;