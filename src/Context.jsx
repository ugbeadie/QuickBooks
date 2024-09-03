import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./config/firebase";
export const userAuthContext = createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState("");
  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <userAuthContext.Provider value={{ user, signUp, login }}>
      {children}
    </userAuthContext.Provider>
  );
};

export default Context;
