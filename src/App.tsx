import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/SignuUp";
import PasswordForgotten from "./Pages/auth/PasswordForgotten";
import Statistics from "./Pages/Statistics";
import Welcome from "./Pages/Welcome";
import ResetPassword from "./Pages/auth/resetPassword";
import MyAccount from "./Pages/MyAccount";

import { UserContext } from "./context/UserContext";

const App = () => {
  const login = (token: string) => {
    Cookies.set("token", token, { expires: 30 });
  };

  const logout = () => {
    Cookies.remove("token");
  };

  const checkUser = () => Cookies.get("token");

  return (
    <Router>
      <UserContext.Provider value={{ checkUser, logout, login }}>
        <Header checkUser={checkUser} />
        <Routes>
          <Route path="/home" element={<Home checkUser={checkUser} />} />
          <Route path="/" element={<Welcome checkUser={checkUser} />} />
          <Route path="/signup" element={<Signup login={login} />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/password" element={<PasswordForgotten />} />
          <Route
            path="/account"
            element={<MyAccount checkUser={checkUser} logout={logout} />}
          />
          <Route
            path="/resetPassword"
            element={<ResetPassword login={login} />}
          />

          <Route path="/statistics" element={<Statistics />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </Router>
  );
};

export default App;
