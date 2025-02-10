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

import { UserContext } from "./context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";

import { UserType } from "./UserTypes";

const App = () => {
  const [user, setUser] = useState<UserType | null>(null);

  const login = (userInfo: UserType) => {
    Cookies.set("token", userInfo.token, { expires: 30 });
    console.log("userInfo", userInfo);
    const obj = {
      id: userInfo.id,
      token: userInfo.token,
      username: userInfo.username,
    };
    setUser(obj);
    console.log(user);
  };
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/user/details",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          console.log("response", response.data);
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ user, logout, login }}>
        <Header user={user} />
        <Routes>
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/" element={<Welcome user={user} />} />
          <Route path="/signup" element={<Signup login={login} />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/password" element={<PasswordForgotten />} />
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
