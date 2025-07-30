import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/login"); // sends to login with successful signup
        }
        catch (error) {
            console.error(error);
        }
    }

    return(
        <div>
            <h2>Create Your Account</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button></button>
            </form>
        </div>
    );
}