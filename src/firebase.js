import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDG4pmsDJ1-sYDk7aPuzMwN2_0O78DG2zA",
    authDomain: "streamrank-8356c.firebaseapp.com",
    projectId: "streamrank-8356c",
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);