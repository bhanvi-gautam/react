import React from "react";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/todoList/Home";
import Landing from "./components/Landing";
import AdminNavbar from "./components/navbars/AdminNavbar";
import AuthNavbar from "./components/navbars/AuthNavbar";
import { Navbar } from "react-bootstrap";

const App = () => {
  let token = useSelector((state) => state.token.strValue);

  if (!token) {
    token = localStorage.getItem("token");
  }
  return (
    <BrowserRouter>
      {!token ? (
        <>
          <Navbar expand="md" className="bg-body-tertiary">
            <AuthNavbar />
          </Navbar>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </>
      ) : (
        <>
          <div style={{ backgroundColor: "#dedeca91" }}>
            {/* <div className="bg-light"> */}
            <AdminNavbar />

            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
