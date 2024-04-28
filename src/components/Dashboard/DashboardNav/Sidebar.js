// Sidebar.js
import React from "react";

const Sidebar = ({ userRole, userName, userSurname }) => {
  const getNavigationLinks = () => {
    switch (userRole) {
      case "admin":
        return [
          { title: "Volunteer List", path: "/volunteerlist" },
          { title: "Old User List", path: "/olduserlist" },
          { title: "Manager List", path: "/employeelist" },
          { title: "Appointments", path: "/appointmentslist" },
        ];
      case "manager":
        return [
          { title: "Volunteer List", path: "/volunteerlist" },
          { title: "Old User List", path: "/olduserlist" },
          { title: "Appointments", path: "/appointmentslist" },
        ];
      case "volunteer":// SHOWS ONLY THE USERS APPOINTMENT AND PROFILE
        return [{ title: "Profile", path: "/profile" },
                { title: "Appointments", path: "/userappointments" }
        ];  
      case "olduser":// SHOWS ONLY THE USERS APPOINTMENT AND PROFILE                                                 
        return [{ title: "Profile", path: "/profile" },
                { title: "Appointments", path: "/userappointments" }
        ]; 
      default:
        return [];
    }
  };

  const navigationLinks = getNavigationLinks();

  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      {/* Sidebar content */}
      {/* Navigation items */}
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading">Menu</div>
          {navigationLinks.map((link, index) => (
            <a key={index} className="nav-link" href={link.path}>
              <div className="sb-nav-link-icon">
                <i className="fas fa-chart-area"></i>
              </div>
              {link.title}
            </a>
          ))}
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Logged in as:</div>
        {userName} {userSurname}
      </div>
    </nav>
  );
};

export default Sidebar;
