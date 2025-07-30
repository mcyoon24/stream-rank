import '../styles/DescriptionPage.css';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function DescriptionPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { title, path, description, platform } = location.state || {};
    
    const backButton = () => {
        navigate(`/rankings/${platform}`);
    }

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

            <div className='description-box'>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default DescriptionPage;