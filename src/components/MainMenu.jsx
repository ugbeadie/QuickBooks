import React, { useContext } from "react";
import { userAuthContext } from "../Context";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAddTransaction } from "../hooks/useAddTransaction";

const HomePage = () => {
  const { addTransaction } = useAddTransaction();
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
      description: "haircut",
      transactionAmount: 45,
      transactionType: "income",
    });
  };

  return (
    <>
      <div>
        <h1>Welcome {user && user.email}</h1>
        <button onClick={handleLogout}>Logout</button>
        <div>
          <h3>balance</h3>
          <h3>$0.00</h3>
        </div>
        <div>
          <div className="income">
            <h3>income</h3>
            <h3>$0.00</h3>
          </div>
          <div className="expenses">
            <h3>expenses</h3>
            <h3>$0.00</h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="add-transaction">
          <input type="text" placeholder="description" required />
          <input type="number" placeholder="amount" required />
          <input
            type="radio"
            id="expense"
            name="name"
            value="expense"
            required
          />
          <label htmlFor="expense">expense</label>
          <input type="radio" id="income" name="name" value="income" required />
          <label htmlFor="income">income</label>
          <button type="submit">add</button>
        </form>
      </div>

      <div className="transactions">
        <h3></h3>
      </div>
    </>
  );
};

export default HomePage;
