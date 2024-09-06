import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserAuthContextProvider from "./Context";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MainMenu from "./components/MainMenu";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                <MainMenu />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
