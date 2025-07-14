
import { useState } from "react";
import toast from 'react-hot-toast'
// import { useUser } from "../context/UsernameContext";
import {useNavigate } from 'react-router-dom';

import { auth,signInWithEmailAndPassword} from "../firebase/firebase";

const useSignIn = () => {
    const navigate=useNavigate()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const directPath=()=>[
      setTimeout(()=>{
          navigate('/categories')
      },2000)
  ]

         // Function to handle sign-up
    const handleSignIn = async (email:string,password:string) => {
      setError("");
      setLoading(true);
      try {
// Create user with email and password in Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      userCredential.user;
      let name=email.split("@")[0].toLowerCase();
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

    

return {loading,error,handleSignIn}
}

export default useSignIn