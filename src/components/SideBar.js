import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';


function SideBar ({ user }) {
    const navigate = useNavigate();
    if(!user) {
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
                <h2>Hello {user.email}</h2>
            </div>

            <button className="logout-button" onClick={() => handleSignout()}>Log Out</button>
        </aside>
    );
}

export default SideBar;