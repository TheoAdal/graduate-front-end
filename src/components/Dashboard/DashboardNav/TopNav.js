// TopNav.js
import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoutButton from "../LogoutButton";

const TopNav = ({ handleLogout, userRole }) => {
  // Function to get the title based on the user's role
  const getTitleLink = () => {
    switch (userRole) {
      case "admin":
        return { title: "Admin Dashboard", link: "/admindash" };
      case "manager":
        return { title: "Manager Dashboard", link: "/managerdash" };
      case "volunteer":
        return { title: "Volunteer Dashboard", link: "/volunteerdash" };
      case "olduser":
        return { title: "Old User Dashboard", link: "/olduserdash" };
      default:
        return "Dashboard";
    }
  };

  const { title, link } = getTitleLink();

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      {/* Navbar content */}
      <a className="navbar-brand ps-3" href={link}>
        {title}
      </a>
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        href="#"
      >
        <i className="fas fa-bars"></i>
      </button>
      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <NavDropdown title="Options" id="basic-nav-dropdown">
        <NavDropdown.Item>
            <Link to="/">Homepage</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/profile">Profile</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <LogoutButton handleLogout={handleLogout} />
          </NavDropdown.Item>
        </NavDropdown>
      </ul>
    </nav>
  );
};

export default TopNav;
