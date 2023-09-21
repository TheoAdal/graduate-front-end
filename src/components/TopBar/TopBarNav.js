import "./TopBarNavStyles.scss";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo from "../../images/logo192.png";

//#00A98F or #03957F #1B365D #193782 #A61E2F    #D47700 #24785E
function TopBarNav() {
  const navbarStyle = {
    backgroundColor: "#00A98F",
  };
  return (
    <div className="nav-bar-container">
      <Navbar style={navbarStyle} data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img src={logo} alt="LOGO" width="30" height="24" />
            </Link>
            Site
          </Navbar.Brand>
          <Nav className="top-bar-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About us</Link>
            <Link to="/contact">Contact us</Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">1st option</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">2nd option</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default TopBarNav;
