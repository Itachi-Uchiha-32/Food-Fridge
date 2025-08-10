import React, { useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile, 
  getIdToken 
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { AuthContext } from './AuthContext/AuthContext';

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleProvider = new GoogleAuthProvider();
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Always get a fresh token
        const freshToken = await getIdToken(currentUser, true);
        setToken(freshToken);
        setUser({
          ...currentUser,
          accessToken: freshToken
        });
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
      console.log('User in auth state:', currentUser);
    });
    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    token, // can use if needed
    loading,
    createUser,
    loginUser,
    logOut,
    signInGoogle,
    setUser,
    updateUser,
  };

  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;
