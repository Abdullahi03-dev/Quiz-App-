
import { useState } from "react";
import toast from 'react-hot-toast'
// import { useUser } from "../context/UsernameContext";
import {useNavigate } from 'react-router-dom';

import { auth,signInWithEmailAndPassword,signInWithPopup,doc,setDoc,getDoc,db} from "../firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth";

const useSignIn = () => {
  const provider=new GoogleAuthProvider()
    const navigate=useNavigate()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const directPath=()=>[
      setTimeout(()=>{
          navigate('/categories')
      },2000)
  ]

         // Function to handle sign-up
    const handleSignIn = async (email:string,name:string,password:string) => {
      setError("");
      setLoading(true);
      try {
// Create user with email and password in Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      userCredential.user;
      localStorage.setItem('username',name)
      // setUsername(name)
      console.log("User signed up successfully!");
      toast.success("User signed in successfully!")
      directPath()
        
      } catch (error: any) {
        setError(error.message);
      }finally{
        setLoading(false)
      }
      if(error){
        toast.error(error)
      }
  
    };

    const signupwithGoogle = async () => {
      setError("");
      setLoading(true);
  const result=await signInWithPopup(auth,provider)
  const user=result.user;  
      const userDoc=doc(db,'users',user.uid)
      const docSnap=await getDoc(userDoc);
      if(!docSnap.exists()){
        await setDoc(userDoc, {
          name: user.displayName,
          email: user.email,
          userId: user.uid,
          scores: {
            JavaScript:0,
            Golang:0,
            Python: 0,
          }
        });
      }
  
  
  
  
  }

return {loading,error,handleSignIn,signupwithGoogle}
}

export default useSignIn