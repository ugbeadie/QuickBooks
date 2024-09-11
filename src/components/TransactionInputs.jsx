import { useContext, useState } from "react";
import { useAddTransaction } from "../hooks/useAddTransaction";
import { userAuthContext } from "../Context";

export const TransactionInputs = () => {
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");

  const { setShowAddTransactionModal, loading, setLoading } =
    useContext(userAuthContext);
  const { addTransaction } = useAddTransaction();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addTransaction({
        description,
        transactionAmount,
        transactionType,
      });
    } catch (err) {
      console.error(err);
    }
    setDescription("");
    setTransactionAmount("");
    setLoading(false);

    setShowAddTransactionModal(false);
  };

  return (
    <form onSubmit={handleSubmit} className="add-transaction">
      <input
        type="text"
        placeholder="description"
        value={description}
        required
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="amount"
        value={transactionAmount}
        required
        onChange={(e) => setTransactionAmount(e.target.value)}
      />
      <input
        type="radio"
        id="expense"
        value="expense"
        checked={transactionType === "expense"}
        onChange={(e) => setTransactionType(e.target.value)}
      />
      <label htmlFor="expense">expense</label>
      <input
        type="radio"
        id="income"
        value="income"
        checked={transactionType === "income"}
        onChange={(e) => setTransactionType(e.target.value)}
      />
      <label htmlFor="income">income</label>
      <div>
        <button onClick={() => setShowAddTransactionModal(false)}>
          cancel
        </button>
        <button type="submit">{loading ? "Adding" : "Add"}</button>
      </div>
    </form>
  );
};
