import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { userAuthContext } from "../Context";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signUp } = useContext(userAuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      <Navigate to="/" />;
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
          {error && <p>{error}</p>}
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
