import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    // catch (err) {
    //   if (err.message == "auth/email-already-in-use") {
    //     setError("The email address is already in use");
    //     // alert();
    //   } else if (err.message == "auth/invalid-email") {
    //     setError("The email address is not valid.");
    //   } else if (err.message == "auth/operation-not-allowed") {
    //     setError("Operation not allowed.");
    //   } else if (err.message == "auth/weak-password") {
    //     setError("The password is too weak.");
    //   }
    // }
  };

  return (
    <>
      <div className="w-[30%]">
        SIGN UP
        <form onSubmit={handleSubmit} className="flex flex-col ">
          {error && <p className="text-red-600">{error}</p>}
          <input
            type="email"
            placeholder="email"
            className="border rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="border rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="border rounded">sign up</button>
        </form>
        <hr />
        <div>
          already have an account? <Link to="/">sign in</Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
