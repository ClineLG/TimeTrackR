import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/SignuUp";
import PasswordForgotten from "./Pages/auth/PasswordForgotten";
import Statistics from "./Pages/Statistics";
import Welcome from "./Pages/Welcome";
import ResetPassword from "./Pages/auth/resetPassword";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password" element={<PasswordForgotten />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        <Route path="/statistics" element={<Statistics />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
