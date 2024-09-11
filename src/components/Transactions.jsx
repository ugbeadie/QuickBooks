import { useDeleteTransaction } from "../hooks/useDeleteTransaction";
import { useContext } from "react";
import { userAuthContext } from "../Context";
import { MdDelete } from "react-icons/md";
import { DeleteTransactionModal } from "./Modals/DeleteTransactionModal";

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
          <div key={transaction.id} className="flex">
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
              onClick={() => setShowDeleteTransactionModal(true)}
              className="border bg-slate-600 text-gray-50 p-2"
            >
              <MdDelete size={25} />
            </button>
            <DeleteTransactionModal
              showDeleteTransactionModal={showDeleteTransactionModal}
              onClose={() => setShowDeleteTransactionModal(false)}
            >
              <div>         
                <h1>Confirm Delete</h1>
                <p>
                  Are you sure you want to delete this transaction, this action
                  can't be undone
                </p>
              </div>
              <div>
                <button onClick={() => setShowDeleteTransactionModal(false)}>
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
        );
      })}
    </>
  );
};

export default Transactions;
