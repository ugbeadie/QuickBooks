import { useDeleteTransaction } from "../hooks/useDeleteTransaction";
import { useContext } from "react";
import { userAuthContext } from "../Context";

const Transactions = ({ transactions }) => {
  const { deleteTransaction } = useDeleteTransaction();

  const handleDelete = async (id) => {
    await deleteTransaction(id);
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
            <button onClick={() => handleDelete(transaction.id)} type="submit">
              delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Transactions;
