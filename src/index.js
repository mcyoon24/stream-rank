import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import "./index.css";

import HomePage from './pages/HomePage';
import RankingPage from './pages/RankingPage';
import NotFound from './pages/NotFound';
import DescriptionPage from './pages/DescriptionPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
// import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import FavoritesPage from './pages/FavoritesPage';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: user ? <Layout user={user} /> : <Navigate to="/login" replace />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: 'rankings/:platform',
                    element: <RankingPage />,
                },
                {
                    path: 'description/:title',
                    element: <DescriptionPage />,
                },
                {
                    path: 'favorites',
                    element: <FavoritesPage />,
                },
            ],
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/signup',
            element: <SignUpPage />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]);

    return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);