import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

export const userAuthContext = createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState({});
  const [query, setQuery] = useState("");
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);

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
        showAddTransactionModal,
        setShowAddTransactionModal,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export default Context;
