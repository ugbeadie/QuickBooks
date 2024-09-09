import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAddTransaction } from "../hooks/useAddTransaction";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useDeleteTransaction } from "../hooks/useDeleteTransaction";
import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");

  const { addTransaction } = useAddTransaction();
  const { transactions, transactionValues } = useGetTransactions();
  const { name, email, picture, userId } = useGetUserInfo();
  const { deleteTransaction } = useDeleteTransaction();
  const { balance, income, expenses } = transactionValues;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("");
    setTransactionAmount("");
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
  };

  return (
    <>
      {name && <h1>Welcome {name}</h1>}
      <p>signed in as {email}</p>
      {picture && <img src={picture} alt="display photo" />}
      <button onClick={handleLogout}>Logout</button>
      <div>
        <div>
          <h3>balance</h3>
          {balance >= 0 ? <h3>${balance}</h3> : <h3>-${balance * -1}</h3>}
        </div>
        <div>
          <div className="income">
            <h3>income</h3>
            <h3>${income}</h3>
          </div>
          <div className="expenses">
            <h3>expenses</h3>
            <h3>${expenses}</h3>
          </div>
        </div>
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
          <button type="submit">add</button>
        </form>
      </div>

      <div className="transactions">
        <h3>transactions</h3>
        {transactions?.map((transaction) => {
          const { description, transactionAmount, transactionType } =
            transaction;
          return (
            <div className="flex">
              <ul>
                <li>
                  <h4>{description}</h4>
                  <p>
                    {transactionAmount} |{" "}
                    <label
                      style={{
                        color: transactionType === "income" ? "green" : "red",
                      }}
                    >
                      {transactionType}
                    </label>
                  </p>
                </li>
              </ul>
              <button
                onClick={() => handleDelete(transaction.id)}
                type="submit"
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default MainMenu;
