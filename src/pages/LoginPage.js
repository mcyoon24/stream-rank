import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import "../styles/LoginPage.css";

function LoginPage(e) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
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
                    <button onClick={handleLogin}>Log In</button>
                </form> 
            </div>
        </div>
    );
}

export default LoginPage;