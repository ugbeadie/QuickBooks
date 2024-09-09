import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

export const useDeleteTransaction = () => {
  const deleteTransaction = async (id) => {
    try {
      const docRef = doc(db, "transactions", id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error(err);
    }
  };
  return { deleteTransaction };
};
