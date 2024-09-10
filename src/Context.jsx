import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { useGetTransactions } from "../hooks/useGetTransactions";

export const userAuthContext = createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState({});
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(products);
  const { transactions, transactionValues } = useGetTransactions();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <userAuthContext.Provider value={{ user, query, setQuery }}>
      {children}
    </userAuthContext.Provider>
  );
};

export default Context;
