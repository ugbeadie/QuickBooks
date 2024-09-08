import { useContext, useState } from "react";
import { userAuthContext } from "../Context";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAddTransaction } from "../hooks/useAddTransaction";
import { useGetTransaction } from "../hooks/useGetTransactions";

const HomePage = () => {
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");

  const { addTransaction } = useAddTransaction();
  const { transactions, transactionValues } = useGetTransaction();
  const { balance, income, expenses } = transactionValues;
  const { user } = useContext(userAuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
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

  return (
    <>
      <div>
        <h1>Welcome {user && user.email}</h1>
        <button onClick={handleLogout}>Logout</button>
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
        <ul>
          {transactions?.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
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
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default HomePage;
