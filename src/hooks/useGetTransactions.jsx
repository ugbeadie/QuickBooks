import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionValues, setTransactionValues] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const transactionCollectionRef = collection(db, "transactions");
  const { userId } = useGetUserInfo();

  const getTransactions = async () => {
    let unsubscribe;
    //CREATING A QUERY
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt")
      );
      //CHECK FOR CHANGES IN THE DATABASE
      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });
          if (data.transactionType === "income") {
            totalIncome += Number(data.transactionAmount);
          } else {
            totalExpenses += Number(data.transactionAmount);
          }
        });
        setTransactions(docs);
        let balance = totalIncome - totalExpenses;
        setTransactionValues({
          balance,
          income: totalIncome,
          expenses: totalExpenses,
        });
      });
    } catch (error) {
      console.error(error);
    }
    return () => unsubscribe();
  };
  useEffect(() => {
    getTransactions();
  }, []);
  return { transactions, transactionValues };
};
