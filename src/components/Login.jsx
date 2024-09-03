import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { userAuthContext } from "../Context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(userAuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      <Navigate to="/home" />;
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="w-[30%]">
        LOGIN
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
          <button className="border rounded">login</button>
        </form>
        <hr />
        <div className="border rounded">sign in with google</div>
        <div>
          {" "}
          dont have an account? <Link to="/signup">sign up</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
