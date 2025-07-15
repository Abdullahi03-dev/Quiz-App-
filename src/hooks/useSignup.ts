import { auth, db, createUserWithEmailAndPassword, collection, query, where, getDocs, doc, setDoc } from "../firebase/firebase";
import {useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { useUser } from "../context/UsernameContext";
import toast from 'react-hot-toast'

const useSignup = () => {
    const navigate=useNavigate()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    // Function to check if the name already exists in Firestore
    const checkIfNameExists = async (name: string): Promise<boolean> => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("name", "==", name));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty; // Returns true if name exists
      };
const directPath=()=>{
setTimeout(()=>{
        navigate('/categories')
    },2000)
}
    

       // Function to handle sign-up
  const signup = async (Username:string,email:string,password:any) => {
    setError("");
    setLoading(true);

    try {
      // Check if the name already exists in Firestore
      const nameExists = await checkIfNameExists(Username);
      if (nameExists) {
        setError("This name is already taken. Please choose another one.");
        toast.error('This name is already taken. Please choose another one.');
        setLoading(false);
        return;
      }

      // Create user with email and password in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email,password);
      const user = userCredential.user;

      ///CONTEXT API
// const {setUsername}=useUser()




      // Store the user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: Username,
        email: email,
        userId: user.uid,
        scores: {
          JavaScript:0,
              Golang:0,
              Python: 0,
              java:0,
              react:0
        }
      });
      localStorage.setItem('username',Username)

      console.log("User signed up successfully!");
      toast.success("User signed up successfully!")
      directPath()

    } catch (error: any) {
      setError(error.message);
    }
    if(error){
      toast.error(error)

    }

    setLoading(false);
  }


  return {signup,loading}
}

export default useSignup