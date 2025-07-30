import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import "./index.css";

import HomePage from './pages/HomePage';
import RankingPage from './pages/RankingPage';
import NotFound from './pages/NotFound';
import DescriptionPage from './pages/DescriptionPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';


console.log(NotFound);
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/rankings/:platform',
    element: (
      <ProtectedRoute>
        <RankingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/description/:title',
    element: (
      <ProtectedRoute>
        <DescriptionPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);