import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserAuthContextProvider from "./Context";
// import Auth from "./components/Auth";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          {/* <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
