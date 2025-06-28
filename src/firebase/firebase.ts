import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User} from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, setDoc,updateDoc,increment ,addDoc,onSnapshot,Unsubscribe,DocumentData} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBt7srtISPx0BfQtN8WGs5UiXO8D68_5Ns",
    authDomain: "quizapp-e5658.firebaseapp.com",
    projectId: "quizapp-e5658",
    storageBucket: "quizapp-e5658.firebasestorage.app",
    messagingSenderId: "163832744176",
    appId: "1:163832744176:web:7786d9ba0a46687caa9a35",
    measurementId: "G-FN4QXHQ1TL"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, collection, query, where, getDocs, doc, setDoc,updateDoc,increment ,addDoc,onSnapshot};
export type {User,Unsubscribe,DocumentData}