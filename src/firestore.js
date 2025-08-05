import { db } from "./firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { collection, addDoc, deleteDoc, query, orderBy, onSnapshot } from 'firebase/firestore';


export async function createUserProfile(uid, email, username) {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
        email,
        username,
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

export async function getUserProfile(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data(); // returns { email, username, favoriteMovies }
    } else {
        return null;
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

// Discussion Board functions

export async function postComment(movieId, comment) {
  const discussionRef = collection(db, "movies", movieId.toString(), "discussion");
  await addDoc(discussionRef, {
    ...comment,
    timestamp: new Date()
  });
}

export function subscribeToComments(movieId, callback) {
  const discussionRef = collection(db, "movies", movieId.toString(), "discussion");
  const q = query(discussionRef, orderBy("timestamp", "asc"));

  return onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(comments);
  });
}

export async function deleteComment(movieId, commentId) {
  const commentRef = doc(db, "movies", movieId.toString(), "discussion", commentId);
  await deleteDoc(commentRef);
}