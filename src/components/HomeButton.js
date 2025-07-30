import styles from "./HomeButton.css"


function HomeButton() {
    return (
        <button className={styles.home} onClick={() => navigate(`/`)}>Return to Home</button> 
    )
}

export default HomeButton;