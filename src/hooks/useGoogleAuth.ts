import { useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const useGoogleAuth = () => {
    const [googleLoading, setGoogleLoading] = useState<boolean>(false);
    const navigate=useNavigate()
    const directPath=()=>{
      setTimeout(()=>{
              navigate('/categories')
          },3000)
      }
    const googleAuth = async (): Promise<{ type: string; message: string } | null> => {
      setGoogleLoading(true);
      const provider = new GoogleAuthProvider();
      
  
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
  
        const email = user.email || "";
        const username = email.split("@")[0].toLowerCase();
        const userRef = doc(db, "users", username);
  
        const q = query(collection(db, "users"), where("email", "==", email));
        const snapshot = await getDocs(q);
  
        if (snapshot.empty) {
          await updateProfile(user, { displayName: username });
  
          await setDoc(userRef, {
            name: username,
            email: email,
            userId: user.uid,
            joinedAt: serverTimestamp(),
            scores: {
              JavaScript:0,
              Golang:0,
              Python: 0,
              java:0,
              react:0
            },
            completedChallenges: {
              easy: [],
              medium: [],
              hard: []
            }
          });
          localStorage.setItem('username',username)
          directPath()
  
          return { type: "success", message: "Sign up successful." };
        } else {
          directPath()
          return { type: "success", message: "Welcome back, Chapter Chaser!" };
        }
      } catch (err: any) {
        console.error("Error signing in with Google:", err);
        return { type: "error", message: err.message };
      } finally {
        setGoogleLoading(false);
      }
    };
  
    return { googleAuth, googleLoading };
  };
  
  export default useGoogleAuth;