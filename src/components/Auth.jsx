import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(auth?.currentUser?.email);
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("adasdasd", error);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("adasdasd", error);
    }
  };
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("adasdasd", error);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="email"
        className="border border-black rounded"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="border border-black rounded"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="border border-black rounded" onClick={signIn}>
        sign in
      </button>
      <button
        className="border border-black rounded"
        onClick={signInWithGoogle}
      >
        sign in with google
      </button>
      <button className="border border-black rounded" onClick={logOut}>
        logout
      </button>
    </div>
  );
};

export default Auth;
