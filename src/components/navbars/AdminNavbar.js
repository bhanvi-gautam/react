import React, { useState, useEffect } from "react";
import { setToken } from "../rtk/app/slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/logo.svg";
import { Image } from "react-bootstrap";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(window.innerWidth > 768); // Default open on regular screens

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    dispatch(setToken(""));
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand onClick={() => setShow(!show)}>
          <Link to="/">
            <Image src={logo} alt="Logo" fluid />
          </Link>
        </Navbar.Brand>

        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse> */}
      </Navbar>

      <div className={`sidebar ${show ? "open" : ""}`}>
        <h2>Menu</h2>
        <Nav className="flex-column">
          <Nav.Link>Profile</Nav.Link>
          <Nav.Link>Settings</Nav.Link>
          <Nav.Link>Change Password</Nav.Link>
          <hr />
          <Nav.Link onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Nav.Link>
        </Nav>
      </div>

      {show && <div className="backdrop" onClick={() => setShow(false)} />}
    </>
  );
};

export default AdminNavbar;
