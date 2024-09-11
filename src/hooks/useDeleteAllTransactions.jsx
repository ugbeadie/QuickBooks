import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";

export const useDeleteAllTransactions = () => {
  const { userId } = useGetUserInfo();

  const deleteAllTransactions = async () => {
    const transactionCollectionRef = collection(db, "transactions");
    const queryTransaction = query(
      transactionCollectionRef,
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(queryTransaction);
    const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // console.log(result);
    results.forEach(async (result) => {
      let docRef = doc(db, "transactions", result.id);
      await deleteDoc(docRef);
    });
  };
  return { deleteAllTransactions };
};
