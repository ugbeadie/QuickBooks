import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };
  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="w-[30%]">
        LOGIN
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
          <button className="border rounded">login</button>
        </form>
        <hr />
        <button className="border rounded" onClick={signInWithGoogle}>
          sign in with google
        </button>
        <div>
          {" "}
          dont have an account? <Link to="/signup">sign up</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
