import { useDeleteTransaction } from "../hooks/useDeleteTransaction";
import { useContext } from "react";
import { userAuthContext } from "../Context";
import { MdDelete } from "react-icons/md";
import { DeleteTransactionModal } from "./Modals/DeleteTransactionModal";
import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";

const Transactions = ({ transactions }) => {
  const { deleteTransaction } = useDeleteTransaction();
  const {
    showDeleteTransactionModal,
    setShowDeleteTransactionModal,
    loading,
    setLoading,
  } = useContext(userAuthContext);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteTransaction(id);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    setShowDeleteTransactionModal(false);
  };

  const { query } = useContext(userAuthContext);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {filteredTransactions.map((transaction) => {
        const { description, transactionAmount, transactionType } = transaction;
        return (
          <div key={transaction.id} className="mt-8">
            <h3 className="text-white text-xl mb-5">Transactions</h3>
            <div className="flex justify-between">
              <div className=" grid-rows-2">
                <p className="text-white">{description}</p>
                <div className="flex items-center gap-1">
                  {transactionType === "income" ? (
                    <AiOutlineRise
                      size={15}
                      className=" p-[2px] bg-green-200 text-green-600 rounded-full"
                    />
                  ) : (
                    <AiOutlineFall
                      size={15}
                      className=" p-[2px] bg-red-200 text-red-600 rounded-full"
                    />
                  )}
                  <label
                    className={
                      transactionType === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {transactionType}
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <p
                  className={`text-xl font-semibold
                    ${
                      transactionType === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  `}
                >
                  ${transactionAmount}
                </p>

                <MdDelete
                  className="text-white cursor-pointer"
                  size={25}
                  onClick={() => setShowDeleteTransactionModal(true)}
                />

                <DeleteTransactionModal
                  showDeleteTransactionModal={showDeleteTransactionModal}
                  onClose={() => setShowDeleteTransactionModal(false)}
                >
                  <div>
                    <h1>Confirm Delete</h1>
                    <p>
                      Are you sure you want to delete this transaction, this
                      action can't be undone
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => setShowDeleteTransactionModal(false)}
                    >
                      cancel
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      type="submit"
                    >
                      {loading ? "deleting" : "delete"}
                    </button>
                  </div>
                </DeleteTransactionModal>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Transactions;

// <ul>
//               <li>
//                 <h4>{description}</h4>
//                 <p>
//                   {transactionAmount} |{" "}
// <label
//   style={{
//     color: transactionType === "income" ? "green" : "red",
//   }}
// >
//   {transactionType}
// </label>
//                 </p>
//               </li>
//             </ul>
// <button
//   onClick={() => setShowDeleteTransactionModal(true)}
//   className="border bg-slate-600 text-gray-50 p-2"
// >
//   <MdDelete size={25} />
// </button>
// <DeleteTransactionModal
//   showDeleteTransactionModal={showDeleteTransactionModal}
//   onClose={() => setShowDeleteTransactionModal(false)}
// >
//   <div>
//     <h1>Confirm Delete</h1>
//     <p>
//       Are you sure you want to delete this transaction, this action
//       can't be undone
//     </p>
//   </div>
//   <div>
//     <button onClick={() => setShowDeleteTransactionModal(false)}>
//       cancel
//     </button>
//     <button
//       onClick={() => handleDelete(transaction.id)}
//       type="submit"
//     >
//       {loading ? "deleting" : "delete"}
//     </button>
//   </div>
// </DeleteTransactionModal>
