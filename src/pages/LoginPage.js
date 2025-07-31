import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import "../styles/LoginPage.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('SUCCESS');
            navigate("/");
        }
        catch(error) {
            console.error(error);
        }
    }

    return (
        <div className="login-page-container">
            <div className="login-box-container"> 
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleLogin}> 
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        // value = ''
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        // value = 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                    <button type="submit">Log In</button>
                    <button onClick={() => navigate("/signup")}>Don't have an account?</button>
                </form> 
            </div>
        </div>
    );
}

export default LoginPage;