// import { useContext, useState } from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "../../config/firebase";
// import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
// import { useNavigate } from "react-router-dom";
// import Transactions from "../Transactions";
// import { SearchTransactions } from "../SearchTransactions";
// // import { FilterButtons } from "../FilterButtons";
// import { AddTransactionModal } from "../Modals/AddTransactionModal";
// import { IoIosAddCircle } from "react-icons/io";
// import { TransactionInputs } from "../TransactionInputs";
// import { userAuthContext } from "../../Context";
// import { useClearAllTransactions } from "../../hooks/useClearAllTransactions";
// import { ClearAllTransactionsModal } from "../Modals/ClearAllTransactionsModal";
import { CiSearch } from "react-icons/ci";
import { IoAddCircle } from "react-icons/io5";
const MainMenu = () => {
  // const { transactions, transactionValues } = useGetTransactions();
  const { name, email, picture } = useGetUserInfo();
  // const { balance, income, expenses } = transactionValues;
  // const {
  //   showAddTransactionModal,
  //   setShowAddTransactionModal,
  //   showClearAllTransactionsModal,
  //   setShowClearAllTransactionsModal,
  //   loading,
  //   setLoading,
  // } = useContext(userAuthContext);
  // const { clearAllTransactions } = useClearAllTransactions();

  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth);
  //     localStorage.clear();
  //     navigate("/login");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleDeleteAll = async () => {
  //   try {
  //     setLoading(true);
  //     await clearAllTransactions();
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   setShowClearAllTransactionsModal(false);
  //   setLoading(false);
  // };

  return (
    <>
      <main>
        <div className="font-sans bg-slate-100 h-screen">
          <nav className="flex justify-between items-center  p-3">
            <div className="flex">
              {picture && (
                <img
                  className="rounded-full w-12 h-12"
                  src={picture}
                  alt="display photo"
                />
              )}
              <div className="ml-2 ">
                {name && (
                  <p className="text-sm text-gray-400 mt-4 leading-[5px]">
                    Welcome <br />
                    <span className="text-base text-black font-bold">
                      {" "}
                      {name}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <h3 className="font-serif font-bold text-[#002D74] text-lg sm:text-3xl ">
              QUICKBOOKS
            </h3>
          </nav>

          <div>
            <div>
              <p>Total Balance</p>
              <h3>$100.00</h3>
            </div>
            <div>
              <CiSearch size={30} />
              <IoAddCircle size={30} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default MainMenu;

// {name && <h1>Welcome {name}</h1>}
//       <p>signed in as {email}</p>
//       {picture && <img src={picture} alt="display photo" />}
//       <SearchTransactions />

//       {/* ACCESS MODAL START*/}
//       <button
//         onClick={() => setShowAddTransactionModal(true)}
//         className="border bg-slate-600 text-gray-50 p-2"
//       >
//         <IoIosAddCircle size={25} />
//       </button>
//       <AddTransactionModal
//         showAddTransactionModal={showAddTransactionModal}
//         onClose={() => setShowAddTransactionModal(false)}
//       >
//         <TransactionInputs />
//       </AddTransactionModal>
//       {/* ACCESS MODAL END */}

//       <button onClick={handleLogout}>Logout</button>
//       <div>
//         <div>
//           <h3>balance</h3>
//           {balance >= 0 ? <h3>${balance}</h3> : <h3>-${balance * -1}</h3>}
//         </div>
//         <div>
//           <div className="income">
//             <h3>income</h3>
//             <h3>${income}</h3>
//           </div>
//           <div className="expenses">
//             <h3>expenses</h3>
//             <h3>${expenses}</h3>
//           </div>
//         </div>
//       </div>

//       <div className="transactions">
//         <h3>transactions</h3>
//         <button
//           onClick={() => setShowClearAllTransactionsModal(true)}
//           disabled={transactions.length < 1}
//           className="border bg-slate-600 text-gray-50 p-2"
//         >
//           clear
//         </button>
//         <ClearAllTransactionsModal
//           showClearAllTransactionsModal={showClearAllTransactionsModal}
//           onClose={() => setShowClearAllTransactionsModal(false)}
//         >
//           <div>
//             <h1>Clear All Transactions</h1>
//             <p>
//               Are you sure you want to clear all transactions, this action can't
//               be undone
//             </p>
//           </div>
//           <div>
//             <button onClick={() => setShowClearAllTransactionsModal(false)}>
//               cancel
//             </button>
//             <button
//               onClick={handleDeleteAll}
//               className={
//                 transactions.length > 0
//                   ? "border text-green-500"
//                   : "border text-red-500"
//               }
//             >
//               {loading ? "clearing" : "clear"}
//             </button>
//           </div>
//         </ClearAllTransactionsModal>

//         {/* <FilterButtons /> */}
//         {transactions.length > 0 ? (
//           <Transactions transactions={transactions} />
//         ) : (
//           <div>
//             <p>You don't have any transactions</p>
//             <button onClick={() => setShowAddTransactionModal(true)}>
//               Add
//             </button>
//           </div>
//         )}
//       </div>
