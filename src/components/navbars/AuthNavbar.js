import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logoImage from "../assets/images/logo.svg";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "./AuthNavbar.css";

const AuthNavbar = () => {
  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand style={{ marginLeft: "2px" }}>
          <Link to="/">
            <Image src={logoImage} alt="Logo" fluid />
          </Link>
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
        {/* <Navbar.Collapse id="navbarScroll">
          <Button
            variant="outlined"
            className="d-none d-lg-block ml-auto button-hover button-spacing"
          >
            <Link className="nav-link" to="/login">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
          </Button>
          <Button variant="outlined" className="d-none d-lg-block button-hover">
            <Link className="nav-link" to="/register">
              <FontAwesomeIcon icon={faUserPlus} /> SignUp
            </Link>
          </Button>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default AuthNavbar;
