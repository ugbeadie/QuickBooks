import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
export const userAuthContext = createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <userAuthContext.Provider value={{ user }}>
      {children}
    </userAuthContext.Provider>
  );
};

export default Context;

// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth } from "./config/firebase";
// const userAuthContext = createContext();

// export const UserAuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState("");
//   const signUp = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };
//   const login = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => {
//       unsubscribe();
//     };
//   }, []);
//   return (
//     <userAuthContext.Provider value={{ user, signUp, login }}>
//       {children}
//     </userAuthContext.Provider>
//   );
// };

// export const useUserAuth = () => {
//   return useContext(userAuthContext);
// };
