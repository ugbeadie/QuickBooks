import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserAuthContextProvider from "./Context";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import MainMenu from "./components/Pages/MainMenu";
import ProtectedRoute from "./components/Pages/ProtectedRoute";
import HomePage from "./components/Pages/HomePage";

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
