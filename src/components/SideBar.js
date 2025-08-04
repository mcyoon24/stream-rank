import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';


function SideBar ({ user }) {
    const [showPlatforms, setShowPlatforms] = useState(false);
    const navigate = useNavigate();
    if(!user) {
        return null;
    }

    if (!user){
        return null;
    }

    const handleSignout = async () => {
        try {
            await signOut(auth);
            navigate("/");

        }
        catch(error) {
            console.error(error);
        }
    }

    return (
        <aside className="sidebar-container">
            <div className="profile-container">
                <h2>Hello,</h2>
                <p>{user.email}</p>
            </div>

            <nav className="sidebar-nav">
                <div className="profile-links">
                    <h3>Profile</h3>
                    <button className="sidebar-link" onClick={() => navigate('/favorites')}>Favorites</button>
                </div>

                <div className="platform-links">
                    <h3
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowPlatforms(prev => !prev)}
                    >
                        Platforms {showPlatforms ? '▼' : '▶'}
                    </h3>
                    {showPlatforms && (
                        <div className="platform-button-list">
                            <button className="sidebar-link" onClick={() => navigate('/rankings/netflix')}>Netflix</button>
                            <button className="sidebar-link" onClick={() => navigate('/rankings/prime')}>Amazon Prime</button>
                            <button className="sidebar-link" onClick={() => navigate('/rankings/max')}>HBO Max</button>
                            <button className="sidebar-link" onClick={() => navigate('/rankings/paramount')}>Paramount+</button>
                            <button className="sidebar-link" onClick={() => navigate('/rankings/disney')}>Disney+</button>
                            <button className="sidebar-link" onClick={() => navigate('/rankings/hulu')}>Hulu</button>
                            <button className="sidebar-link" onClick={() => navigate('/rankings/crunchyroll')}>Crunchyroll</button>
                            <button className="sidebar-link" onClick={() => navigate('/rankings/youtube')}>YouTube TV</button>
                            <button className="sidebar-link" onClick={() => navigate('/')}>Home</button>
                        </div>
                    )}
                </div>
            </nav>

            {/* pushes logout button to the bottom */}
            <div style={{ flexGrow: 1 }}></div> 
            <button className="logout-button" onClick={() => handleSignout()}>Log Out</button>
        </aside>
    );
}

export default SideBar;