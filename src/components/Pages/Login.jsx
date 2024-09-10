import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
// import image from "../assets/jakub-zerdzicki-ykgLX_CwtDw-unsplash.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { userIsAuthenticated } = useGetUserInfo();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setError("");
      setLoading(true);
      let result = await signInWithEmailAndPassword(auth, email, password);
      const authInfo = {
        userId: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        picture: result.user.photoURL,
        userIsAuthenticated: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/menu");
    } catch (err) {
      if (err.message == "Firebase: Error (auth/invalid-credential).") {
        setError("The email address or password is incorrect.");
      } else if (
        err.message ==
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError("The password should contain at least 6 characters.");
      }
    }
    setLoading(false);
  };
  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      let result = await signInWithPopup(auth, googleProvider);
      const authInfo = {
        userId: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        picture: result.user.photoURL,
        userIsAuthenticated: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/menu");
    } catch (err) {
      setError(err.message);
    }
  };
  if (userIsAuthenticated) {
    return <Navigate to="/menu" />;
  }
  return (
    <>
      <section className="bg-gray-50 flex items-center justify-center h-screen font-sans md:rounded-2xl">
        <div className="w-full px-4 sm:w-3/4 md:w-1/2 md:px-8">
          <div className="flex justify-between md:flex-col-reverse md:items-start lg:flex-row ">
            <p className="font-semibold text-[#002D74] text-base underline mt-[13px] sm:mt-[35px] md:mt-[25px] lg:mt-[40px] sm:text-2xl ">
              Login
            </p>
            <div className="italic flex flex-col items-end mb-6 leading-[3px] md:items-start lg:items-end">
              <h2 className="font-serif font-bold text-[#002D74] text-x sm:text-3xl ">
                QUICKBOOKS
              </h2>
              <p className="text-xs mt-4 text-[#002D74]">
                Managing your finances made easier.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border focus:outline-none"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full focus:outline-none"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <IoEyeOutline
                    size={20}
                    className="text-[#2d3e53] hover:text-[#002D74]"
                  />
                ) : (
                  <IoEyeOffOutline
                    size={20}
                    className="text-[#2d3e53] hover:text-[#002D74]"
                  />
                )}
              </span>
            </div>
            {error && <p className="text-red-600">{error}</p>}

            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button
            onClick={signInWithGoogle}
            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
          >
            <FcGoogle className="mr-3" size={20} />
            Sign in with Google
          </button>

          <div className="mt-5 text-sm sm:text-base border-b border-[#002D74] py-4 text-[#002D74]">
            <a href="#">Forgot your password?</a>
          </div>

          <div className="mt-3 text-sm sm:text-base flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <Link to="/signup">
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                Register
              </button>
            </Link>
          </div>
        </div>

        <div className="hidden w-1/2 md:block ">
          {/* <img className="h-screen w-full" src={image} /> */}
        </div>
      </section>
    </>
  );
};
export default Login;
