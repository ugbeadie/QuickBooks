import React, { useContext } from "react";
import { userAuthContext } from "../Context";

const HomePage = () => {
  const { user, logout } = useContext(userAuthContext);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1>Welcome {user && user.email}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
