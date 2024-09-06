import React, { useContext } from "react";
import { userAuthContext } from "../Context";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const HomePage = () => {
  const { user } = useContext(userAuthContext);
  const handleLogout = async () => {
    try {
      await signOut(auth);
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
