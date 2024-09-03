import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userAuthContext } from "../Context";

const ProtectedRoute = ({ children }) => {
  let { user } = useContext(userAuthContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
