// src/hooks/useAutoDeleteLocalStorageOnLeave.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Deletes the specified localStorage key
 * when the user leaves the current page.
 */
export function useAutoDeleteLocalStorageOnLeave(key: string) {
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    // Handle browser refresh or tab close
    const handleUnload = () => {
      localStorage.removeItem(key);
    };
    window.addEventListener("beforeunload", handleUnload);

    // Handle route change away from this page
    return () => {
      localStorage.removeItem(key);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [key, currentPath]);
}