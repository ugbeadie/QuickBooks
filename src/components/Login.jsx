import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setError("");
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
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
      <section className="w-full mx-auto flex flex-col gap-10 text-center font-serif">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">QuickBooks</h1>
          <p className="w-3/4 mx-auto text-gray-500">
            Managing your finances made easier.
          </p>
        </div>
        <form className="flex flex-col gap-5">
          <div className="flex border rounded-xl relative">
            <input
              className="w-full py-2 px-5 border rounded-xl bg-slate-50 focus:outline-none border:none"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="flex border rounded-md relative">
            <input
              className="w-full py-2 px-5 border rounded-xl bg-slate-50 focus:outline-none border:none"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
            />
            <span
              className="icon flex items-center px-4 absolute top-[10px] right-0 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoEyeOutline
                  size={25}
                  className="text-[#2d3e53] hover:text-[#6366f1]"
                />
              ) : (
                <IoEyeOffOutline
                  size={25}
                  className="text-[#2d3e53] hover:text-[#6366f1]"
                />
              )}
            </span>
          </div>
          <div className="input-btn">
            <button
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded text-gray-50 text-lg "
              type="submit"
            >
              Login
            </button>
            <div>
              <button className="w-full border py-3 mt-5 flex justify-center items-center gap-2 hover:bg-gray-200">
                Sign in with Google <FcGoogle size={20} />
              </button>
            </div>
          </div>
        </form>
        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link className="text-blue-700" to="/signup">
            sign up
          </Link>
        </p>
      </section>
    </>
  );
};

export default Login;

{
  /* <div className="w-[30%]">
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
          <button className="border rounded">
            {loading ? "Loading..." : "login"}
          </button>
        </form>
        <hr />
        <button className="border rounded" onClick={signInWithGoogle}>
          sign in with google
        </button>
        <div>
          {" "}
          dont have an account? <Link to="/signup">sign up</Link>
        </div>
      </div> */
}
