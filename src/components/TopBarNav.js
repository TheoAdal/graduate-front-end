import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
//#00A98F or #03957F #1B365D #193782 #A61E2F    #D47700 #24785E
function TopBarNav() {
  const navbarStyle = {
    backgroundColor: "#00A98F",
  };
  return (
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
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default TopBarNav;
/* 
<Nav.Link href="#pricing">Pricing</Nav.Link>

<NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
*/
