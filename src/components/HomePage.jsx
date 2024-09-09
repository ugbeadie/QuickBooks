import { Link } from "react-router-dom";
import { useGetUserInfo } from "../hooks/useGetUserInfo";

const HomePage = () => {
  const { isAuth, email } = useGetUserInfo();

  return (
    <section className="h-screen max-w-full flex bg-gradient-to-r from-blue-300 to-blue-100">
      <div className="p-2 flex flex-col justify-center sm:m-5">
        <h1 className="text-4xl font-sans mb-8 sm:text-6xl lg:w-[80%] lg:text-7xl">
          Managing your finances made easier with{" "}
          <span className="text-[#002D74] italic font-semibold font-serif">
            QuickBooks.
          </span>
        </h1>
        {isAuth ? (
          <div>
            <p className="text-lg mb-3 italic font-sans sm:text-xl">
              Already logged in as {email}
            </p>
            <Link to="/login">
              <button className="bg-[#002D74] rounded-xl px-8 py-3 text-sm text-gray-50 hover:scale-105 duration-300 lg:text-base">
                Continue
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-lg mb-3 italic font-sans sm:text-xl">
              Are you ready to level up financially?
            </p>
            <Link to="/login">
              <button className="bg-[#002D74] rounded-xl px-8 py-3 text-sm text-gray-50 hover:scale-105 duration-300 lg:text-base">
                Get Started
              </button>
            </Link>
          </div>
        )}
      </div>
      {/* <div className="hidden md:block">
        <img
          src="https://plus.unsplash.com/premium_vector-1718401354708-94a9190cbe17?q=80&w=1508&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div> */}
    </section>
  );
};

export default HomePage;
