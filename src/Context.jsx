import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

export const userAuthContext = createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState({});
  const [query, setQuery] = useState("");
  const [showAddtransactionModal, setShowAddtransactionModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <userAuthContext.Provider
      value={{
        user,
        query,
        setQuery,
        showAddtransactionModal,
        setShowAddtransactionModal,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export default Context;
