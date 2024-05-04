// Sidebar.js
import React from "react";

const Sidebar = ({ userRole, userName, userSurname }) => {
  const getNavigationLinks = () => {
    switch (userRole) {
      case "admin":
        return [
          { title: "Volunteer List", path: "/volunteerlist" },
          { title: "Beneficiary List", path: "/olduserlist" },
          { title: "Manager List", path: "/employeelist" },
          { title: "Appointments", path: "/appointmentslist" }, 
          { title: "Reports", path: "/reports" },
        ];
      case "manager":
        return [
          { title: "Volunteer List", path: "/volunteerlist" },
          { title: "Beneficiary List", path: "/olduserlist" },
          { title: "Appointments", path: "/appointmentslist" },
        ];
      case "volunteer":
        return [{ title: "Profile", path: "/profile" },
                { title: "Appointments", path: "/userappointmentlist", },
                { title: "Requests", path: "/volunteerappointmentlist" }
        ];  
      case "olduser":                                                 
        return [{ title: "Profile", path: "/profile" },
                { title: "Appointments", path: "/userappointmentlist" },
                { title: "Create Requests", path: "/createrequestpage" }
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
