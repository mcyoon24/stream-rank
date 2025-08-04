import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { addFavoriteMovie, removeFavoriteMovie, getUserFavorites, normalizeMovie } from '../firestore';

export function useFavorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
        getUserFavorites(user.uid)
            .then(favs => setFavorites(favs))
            .catch(console.error);
        }
    }, []);

    const handleFavorite = async (movie) => {
        const user = auth.currentUser;
        if (!user) {
            alert("Must be logged in to favorite movies");
            return;
        }

        try {
            if (favorites.some(fav => fav.id === movie.id)) {
                await removeFavoriteMovie(user.uid, normalizeMovie(movie));
                setFavorites(prev => prev.filter(fav => fav.id !== movie.id));
            } else {
                await addFavoriteMovie(user.uid, movie);
                setFavorites(prev => [...prev, normalizeMovie(movie)]);
            }
        } catch (error) {
            console.error("Error updating favorites:", error);
        }
    };

    return { favorites, handleFavorite };
}