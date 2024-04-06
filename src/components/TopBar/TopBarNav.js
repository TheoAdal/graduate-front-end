import "./TopBarNavStyles.scss";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo192.png";

//#00A98F or #03957F #1B365D #193782 #A61E2F    #D47700 #24785E
function TopBarNav() {
  // const userId = localStorage.getItem("userId");
  // const userName = localStorage.getItem("userName");
  // const userSurname = localStorage.getItem("userSurname");
  // const userRole = localStorage.getItem("userRole");

  // const navigate = useNavigate();

  // const getDashboardRoute = () => {
  //   if (userId) {
  //     // Navigate to the dashboard based on the user's role
  //     switch (userRole) {
  //       case "admin":
  //         navigate("/admindash");
  //         break;
  //       case "manager":
  //         navigate("/managerdash");
  //         break;
  //       case "volunteer":
  //         navigate("/volunteerdash");
  //         break;
  //       case "olduser":
  //         navigate("/olduserdash");
  //         break;
  //       default:
  //         navigate("/sjdvbfjsfvbuhsd");
  //         break;
  //     }
  //   } else {
  //     // Navigate to login if user is not logged in
  //     navigate("/login");
  //   }
  // };

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
            {/* {userId ? ( */}
              {/*  <> */}
                {/* <Link to={getDashboardRoute(userRole)}>Dashboard</Link> */}
                {/* <Link onClick={handleDashboardClick}>Dashboard</Link> */}
                {/* <NavDropdown title="Options" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/profile">Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/logout">Logout</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <> */}
                <Link to="/login">Log in</Link>
                <NavDropdown title="Register as" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/volunteer">Volunteer</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/olduser">Person in need</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              {/* </> */}
            {/* )} */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default TopBarNav;

//
