import { db } from "./firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";


export async function createUserProfile(uid, email) {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
        email,
        favoriteMovies:[]
    }, { merge: true })
}

export async function addFavoriteMovie(uid, movie) {
    const userRef = doc(db, "users", uid);
    const normalizedMovie = normalizeMovie(movie);
    await updateDoc(userRef, {favoriteMovies: arrayUnion(normalizedMovie)});
}

export async function removeFavoriteMovie(uid, movie) {
    const userRef = doc(db, "users", uid);
    const normalizedMovie = normalizeMovie(movie);
    await updateDoc(userRef, { favoriteMovies: arrayRemove(normalizedMovie) })
}

export async function getUserFavorites(uid) {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        const data = userDoc.data();
        return data.favoriteMovies || [];
    } else {
        return [];
    }
}

export function normalizeMovie(movie) {
    return {
        id: movie.id,
        title: movie.title,
        description: movie.description || "No description available.",
        rating: movie.rating || 0,
        posterPath: movie.posterPath || movie.path || "",
        platform: movie.platform || [],
    };
}