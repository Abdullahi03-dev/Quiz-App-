import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth, User } from "../firebase/firebase";
import {  onAuthStateChanged } from "firebase/auth";

// Define the shape of our Auth Context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(firebaseUser) => {
      if(firebaseUser){
      setUser(firebaseUser)
      }else{
        setUser(null)
      }
      setLoading(false)
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};