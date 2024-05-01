import React, { useContext, useEffect } from "react";
// import "./AdminDashboard.scss";
import { useNavigate } from "react-router-dom";

import Sidebar from "../DashboardNav/Sidebar";
import TopNav from "../DashboardNav/TopNav";
import Footer from "../DashboardNav/Footer";

import { AuthContext } from "../../Content/LoginPage/AuthContext";

const AdminDashboard = () => {
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("userSurname");
  const userRole = localStorage.getItem("userRole");

  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !userRole) {
      navigate("/login");
    } else if (userRole === "admin") {
      //
    } else if (userRole === "manager") {
      navigate("/managerdash");
    } else if (userRole === "volunteer") {
      navigate("/volunteerdash");
    } else if (userRole === "olduser") {
      navigate("/olduserdash");
    }
  }, [navigate, token]);

  return (
    <div className="sb-nav-fixed">
      <TopNav userRole={userRole} />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar
            userRole={userRole}
            userName={userName}
            userSurname={userSurname}
          />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Admin Dashboard</h1>
              <div className="row">
                {/* <div className="button-menu"></div> */}
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-primary text-white mb-4">
                    <div className="card-body">Volunteer List</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {/* Change href to the report */}
                      <a
                        className="small text-white stretched-link"
                        href="/volunteerlist"
                      >
                        View Details
                      </a>
                      <div className="small text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-warning text-white mb-4">
                    <div className="card-body">Old User List</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {/* Change href to the report */}
                      <a
                        className="small text-white stretched-link"
                        href="/olduserlist"
                      >
                        View Details
                      </a>
                      <div className="small text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-success text-white mb-4">
                    <div className="card-body">Manager List</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {/* Change href to the report */}
                      <a
                        className="small text-white stretched-link"
                        href="/employeelist"
                      >
                        View Details
                      </a>
                      <div className="small text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-danger text-white mb-4">
                    <div className="card-body">Appointments</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <a
                        className="small text-white stretched-link"
                        href="/appointmentslist"
                      >
                        View Details
                      </a>
                      <div className="small text-white">
                        <i className="fas fa -angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-info text-white mb-4">
                    <div className="card-body">Reports</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <a
                        className="small text-white stretched-link"
                        href="/reports"
                      >
                        View Details
                      </a>
                      <div className="small text-white">
                        <i className="fas fa -angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/* MAKE SEPARATE FILE FOR THE FOOTER */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
