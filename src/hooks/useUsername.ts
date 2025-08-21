import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, getDocs, where } from "firebase/firestore";
import { auth, db } from "../firebase/firebase"; // update this path as needed

const useUsername = () => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       try {
  //         const userDoc = await getDoc(doc(db, "users", user.uid));
  //         if (userDoc.exists()) {
  //           setUsername(userDoc.data().name);
  //         } else {
  //           console.log("User document not found");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     }
  //     setLoading(false);
  //   });

  //   // Cleanup
  //   return () => unsubscribe();


    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
  
            if (!querySnapshot.empty) {
              const data = querySnapshot.docs[0].data();
              setUsername(data.name || null);
            } else {
              setUsername(null);
            }
          } catch (err) {
            console.error("Error fetching user name:", err);
            setUsername(null);
          } finally {
            setLoading(false);
          }
        } else {
          setUsername(null);
          setLoading(false);
        }
      });
  
      return () => unsubscribe();
  }, []);

  return { username, loading };
};

export default useUsername;
