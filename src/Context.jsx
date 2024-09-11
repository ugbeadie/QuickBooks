import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

export const userAuthContext = createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState({});
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [showDeleteTransactionModal, setShowDeleteTransactionModal] =
    useState(false);

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
        loading,
        setLoading,
        showAddTransactionModal,
        setShowAddTransactionModal,
        showDeleteTransactionModal,
        setShowDeleteTransactionModal,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export default Context;
