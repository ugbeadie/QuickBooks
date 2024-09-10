import { useContext } from "react";
import { userAuthContext } from "../Context";

export const SearchTransactions = () => {
  const { query, setQuery } = useContext(userAuthContext);
  return (
    <div>
      <input
        className="border"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
