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
    await updateDoc(userRef, {favoriteMovies: arrayUnion(movie)});
}

export async function removeFavoriteMovie(uid, movie) {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {favoriteMovies: arrayRemove(movie)});
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