import "./TopBarNavStyles.scss";
import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo from "../../images/sitelogo2.png";

import { AuthContext } from "../Content/LoginPage/AuthContext";
import LogoutButton from "../Dashboard/LogoutButton";

function TopBarNav() {
  const userRole = localStorage.getItem("userRole");

  const { token } = useContext(AuthContext); // Access token from AuthContext

  // Function to generate the dashboard link based on user's role
  const getDashboardLink = () => {
    switch (userRole) {
      case "admin":
        return "/admindash";
      case "manager":
        return "/managerdash";
      case "volunteer":
        return "/volunteerdash";
      case "olduser":
        return "/olduserdash";
      default:
        return "/";
    }
  };

  const navbarStyle = {
    backgroundColor: "#00A98F",
  };

  return (
    <div className="nav-bar-container">
      <Navbar style={navbarStyle} data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img src={logo} alt="LOGO" className="nav-logo" />
            </Link>
            {/* Site */}
          </Navbar.Brand>
          <Nav className="top-bar-nav">
            <Link to="/">Αρχική</Link>
            <Link to="/about">Σχετικά με εμάς</Link>
            <Link to="/contact">Επικοινωνία</Link>
            {token ? (
              <>
                <Link to={getDashboardLink()}>Dashboard</Link>
                <NavDropdown
                  title="Options"
                  id="basic-nav-dropdown"
                  className="nav-dropdown"
                >
                  <NavDropdown.Item as="div">
                    <Link to="/profile">
                      <button className="dropdown-item">Profile</button>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item as="div">
                    <LogoutButton />
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Link to="/login">Log in</Link>
                <NavDropdown
                  title="Εγγραφή ως"
                  id="basic-nav-dropdown"
                  className="nav-dropdown"
                >
                  <NavDropdown.Item as="div" className="dropdown-item">
                    <Link to="/volunteer">Εθελοντής</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item as="div" className="dropdown-item">
                    <Link to="/olduser">Άτομο τρίτης ηλικίας</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default TopBarNav;

//
