import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import '../styles/SignUpPage.css';

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
            console.log("email: ", email);
            console.log("password: ", password);
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/login"); // sends to login with successful signup
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