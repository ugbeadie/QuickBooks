import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const handleResetPassword = async (email) => {
    try {
      setError("");
      setMessage("");
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setMessage("check your inbox for further instructions");
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="w-[30%]">
      FORGOT PASSWORD
      {error && <p>{error}</p>}
      <form onSubmit={handleResetPassword} className="flex flex-col ">
        {/* {error && <p className="text-red-600">{error}</p>} */}
        <input
          type="email"
          placeholder="email"
          className="border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="border">
          {loading ? "Loading" : "Reset Password"}
        </button>
        <Link to="/">sign in</Link>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
export default ForgotPassword;
