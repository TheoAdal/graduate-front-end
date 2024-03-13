<<<<<<< HEAD
import "./TopBarNavStyles.scss";
=======
>>>>>>> 9cfd167b871717774231c61a86c0717bc29e86fc
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import logo from "../../images/logo192.png";

=======
>>>>>>> 9cfd167b871717774231c61a86c0717bc29e86fc
//#00A98F or #03957F #1B365D #193782 #A61E2F    #D47700 #24785E
function TopBarNav() {
  const navbarStyle = {
    backgroundColor: "#00A98F",
  };
  return (
<<<<<<< HEAD
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
            <Link to="/login">Log in</Link> 
            <NavDropdown title="Register as" id="basic-nav-dropdown">
            <NavDropdown.Item><Link to="/volunteer">Volunteer</Link></NavDropdown.Item>
            <NavDropdown.Item><Link to="/olduser">Person in need</Link></NavDropdown.Item>
=======
    <div>
      <Navbar style={navbarStyle} data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <a class="navbar-brand" href="#">
              <img src="/logo192.png" alt="LOGO" width="30" height="24" />
            </a>
            Site
          </Navbar.Brand>
          <Nav className="top-bar-nav">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">1st option</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">2nd option</NavDropdown.Item>
>>>>>>> 9cfd167b871717774231c61a86c0717bc29e86fc
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default TopBarNav;
<<<<<<< HEAD

//
=======
/* 
<Nav.Link href="#pricing">Pricing</Nav.Link>

<NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
*/
>>>>>>> 9cfd167b871717774231c61a86c0717bc29e86fc
