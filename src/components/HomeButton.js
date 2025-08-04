import "./HomeButton.css"


function HomeButton() {
    return (
        <button className='home' onClick={() => navigate(`/`)}>Return to Home</button> 
    )
}

export default HomeButton;