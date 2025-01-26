import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

interface User {
  id: string;
  email: string;
  name: string;
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser({
          id: user.uid,
          email: user.email || "",
          name: user.displayName || user.email || "",
        });
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      setError("");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      setCurrentUser({
        id: userCredential.user.uid,
        email: userCredential.user.email || "",
        name: name,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      setError("");
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoggedIn,
    currentUser,
    error,
    isLoading,
    login,
    signup,
    logout,
    resetPassword,
    setError,
  };
}
