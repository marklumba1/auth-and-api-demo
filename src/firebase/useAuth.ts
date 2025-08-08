import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import getFirebaseAuthErrorMessage from "./errorCodes";
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true)

  const handleAuthMethod = async (authMethod: any, args: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authMethod(...args);
      return response;
    } catch (error: any) {
      setError(getFirebaseAuthErrorMessage(error.code));
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user){ 
        setUser(user)
      }
      else setUser(null);
      setInitializing(false)
    });

    return unsubscribe;
  }, []);

  const handleSignInAnon = () => {
    handleAuthMethod(signInAnonymously,[auth]).then(data => console.log(data))
  }

  const handleSignIn = (email: string, password: string) =>
    handleAuthMethod(signInWithEmailAndPassword, [auth, email, password]);

  const handleSignOut = () => handleAuthMethod(signOut, [auth]);

  const handleRegister = (email: string, password: string) =>
    handleAuthMethod(createUserWithEmailAndPassword, [auth, email, password]);

  const handleUpdateUser = (payload: {}) => {
    if (!user) {
      setError("No logged in user");
      return;
    }
    return handleAuthMethod(updateProfile, [user, payload]);
  };

  return {
    user,
    loading,
    error,
    initializing,
    setError,
    handleSignIn,
    handleRegister,
    handleUpdateUser,
    handleSignOut,
    handleSignInAnon
  };
};
export default useAuth;
