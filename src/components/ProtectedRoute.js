import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                navigate('/login'); // sends user back to login if not logged in
            } else {
                setUser(currentUser);
                setLoading(false); 
            }
        });

        return () => unsubscribe(); 
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>
    }

    return children;
}

export default ProtectedRoute;