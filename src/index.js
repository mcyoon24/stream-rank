import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import "./index.css";

import HomePage from './pages/HomePage';
import RankingPage from './pages/RankingPage';
import NotFound from './pages/NotFound';
import DescriptionPage from './pages/DescriptionPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <ProtectedRoute>
                    <Layout user={user} />
                </ProtectedRoute>
            ),
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
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
