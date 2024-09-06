import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import image from "../assets/jakub-zerdzicki-ykgLX_CwtDw-unsplash.jpg";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err) {
      if (err.message == "Firebase: Error (auth/email-already-in-use).") {
        setError("The email address is already in use");
        // alert();
      } else if (err.message == "Firebase: Error (auth/invalid-email).") {
        setError("The email address is not valid.");
      } else if (err.message == "Firebase: Error (auth/invalid-credential).") {
        setError("User does not exist.");
      } else if (
        err.message ==
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError("The password should contain at least 6 characters.");
      }
    }

    setLoading(false);
  };

  return (
    <>
      <section className="bg-gray-50 flex items-center justify-center h-screen font-sans md:rounded-2xl">
        <div className="w-full sm:w-3/4 md:w-1/2 px-4 md:px-8">
          <div className="flex justify-between md:flex-col-reverse md:items-start lg:flex-row ">
            <p className="font-semibold text-[#002D74] text-base underline mt-[13px] sm:mt-[35px] md:mt-[25px] lg:mt-[40px] sm:text-2xl ">
              Register
            </p>
            <div className="italic flex flex-col items-end mb-6 leading-[3px] md:items-start lg:items-end">
              <h2 className="font-serif font-bold text-[#002D74] text-x sm:text-3xl ">
                QUICKBOOKS
              </h2>
              <p className="text-xs mt-4 text-[#002D74] lg:text-base">
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
              {loading ? "Loading..." : "Sign up"}
            </button>
          </form>

          <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]"></div>

          <div className="mt-3 text-sm flex justify-between items-center text-[#002D74]">
            <p>Already have an account?</p>
            <Link to="/login">
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                Login
              </button>
            </Link>
          </div>
        </div>

        <div className="md:block hidden w-1/2 ">
          <img className=" h-screen w-full" src={image} />
        </div>
      </section>
    </>
  );
};

export default SignUp;
