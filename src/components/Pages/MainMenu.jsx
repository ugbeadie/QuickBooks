import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import Transactions from "../Transactions";
import { SearchTransactions } from "../SearchTransactions";
import { FilterButtons } from "../FilterButtons";
import { AddTransactionModal } from "../Modals/AddTransactionModal";
import { IoIosAddCircle } from "react-icons/io";
import { TransactionInputs } from "../TransactionInputs";
import { userAuthContext } from "../../Context";

const MainMenu = () => {
  const { transactions, transactionValues } = useGetTransactions();
  const { name, email, picture } = useGetUserInfo();
  const { balance, income, expenses } = transactionValues;
  const { showAddtransactionModal, setShowAddtransactionModal } =
    useContext(userAuthContext);
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

  return (
    <>
      {name && <h1>Welcome {name}</h1>}
      <p>signed in as {email}</p>
      {picture && <img src={picture} alt="display photo" />}
      <SearchTransactions />

      {/* ACCESS MODAL START*/}
      <button
        onClick={() => setShowAddtransactionModal(true)}
        className="border bg-slate-600 text-gray-50 p-2"
      >
        <IoIosAddCircle size={25} />
      </button>
      <AddTransactionModal
        showAddtransactionModal={showAddtransactionModal}
        onClose={() => setShowAddtransactionModal(false)}
      >
        <TransactionInputs />
      </AddTransactionModal>
      {/* ACCESS MODAL END */}

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
      </div>

      <div className="transactions">
        <h3>transactions</h3>
        <FilterButtons />
        {transactions.length > 0 ? (
          <Transactions transactions={transactions} />
        ) : (
          <div>
            <p>You don't have any transactions</p>
            <button>Add</button>
          </div>
        )}
      </div>
    </>
  );
};
export default MainMenu;
