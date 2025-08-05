import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { createUserProfile } from "../firestore";

import '../styles/SignUpPage.css';


function SignUpPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        // Clears previous errors
        setError(null);

        // Client-side validation
        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {
            console.log("SIGNUP RAN");
            console.log( {username} );
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { username });
            await createUserProfile(user.uid, email, username);
            window.location.href = "/";
        }
        catch (error) {
            console.error(error);
        }
    }

    return(
        <div className='signup-page-container'>
            <div className='signup-box-container'>
                <h2>Create Your Account</h2>
                <form className='signup-form' onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                    {error && <p className="signup-error">{error}</p>}      
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;