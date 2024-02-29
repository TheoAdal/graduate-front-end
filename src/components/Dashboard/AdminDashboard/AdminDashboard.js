import React from "react";
import "./AdminDashboard.scss";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
//https://www.youtube.com/watch?v=pWd29MtFGJA&ab_channel=CodeWithYousaf KANE AUTO TO DASHBOARD POLU OMORFO :P

function AdminDashboard() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Dashboard - SB Admin</title>
        <link rel="icon" href="" />
        <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
        /<link href="AdminDashboard.scss" rel="stylesheet" />
        <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossOrigin="anonymous"></script>
      </head>
      <body className="sb-nav-fixed">
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          {/* Navbar Brand */}
          <a className="navbar-brand ps-3" href="">Admin Dashboard</a>
          {/* Sidebar Toggle */}
          <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!">
            <i className="fas fa-bars"></i>
          </button>
          {/* Navbar Search */}
          {/* <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
              <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
              <button className="btn btn-primary" id="btnNavbarSearch" type="button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form> */}
          {/* Navbar */}
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-user fa-fw"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="">Logout</a></li>
                <li><a className="dropdown-item" href="">Change Password</a></li>
              </ul>
            </li>
          </ul>
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <div className="sb-sidenav-menu-heading">Core</div>
                  <a className="nav-link" href="">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Dashboard
                  </a>
                  <div className="sb-sidenav-menu-heading">Addons</div>
                  {/* Change href */}
                  <a className="nav-link" href="">
                    <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                    Manage Employees
                  </a>
                  {/* Change href */}
                  <a className="nav-link" href="">
                    <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                    Manage Service
                  </a>
                  {/* Change href */}
                  <a className="nav-link" href="">
                    <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                    System Configuration
                  </a>
                  {/* Change href */}
                  <a className="nav-link" href="">
                    <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                    Reports
                  </a>
                </div>
              </div>
              <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Admin
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <h1 className="mt-4">Dashboard</h1>
                <div className="row">
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-primary text-white mb-4">
                      <div className="card-body">Manage Employess</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        {/* Change href to the report */}
                        <a className="small text-white stretched-link" href="">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-warning text-white mb-4">
                      <div className="card-body">Manage Service</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        {/* Change href to the report */}
                        <a className="small text-white stretched-link" href="">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-success text-white mb-4">
                      <div className="card-body">System Configuration</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        {/* Change href to the report */}
                        <a className="small text-white stretched-link" href="">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-danger text-white mb-4">
                      <div className="card-body">Reports</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        {/* Change href to the report */}
                        <a className="small text-white stretched-link" href="">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">Copyright &copy; Your Website 2022</div>
                  <div>
                    <a href="#">Privacy Policy</a>
                    &middot;
                    <a href="#">Terms &amp; Conditions</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script>
        <script src="js/scripts.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossOrigin="anonymous"></script>
        <script src="assets/demo/chart-area-demo.js"></script>
        <script src="assets/demo/chart-bar-demo.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossOrigin="anonymous"></script>
        <script src="js/datatables-simple-demo.js"></script>
      </body>
    </html>
  );
}

export default AdminDashboard;

