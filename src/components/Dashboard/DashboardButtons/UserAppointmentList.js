import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Button.scss";

import Sidebar from "../DashboardNav/Sidebar";
import TopNav from "../DashboardNav/TopNav";
import Footer from "../DashboardNav/Footer";

import { AuthContext } from "../../Content/LoginPage/AuthContext";

const statuses = ["all", "pending", "expired"];

export default function ListAppointments() {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("userSurname");
  const userRole = localStorage.getItem("userRole");

  const { setToken, token, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [visits, setVisits] = useState([]);
  const [appointmentState, setAppointmentState] = useState("pending");
  const [selectedDate, setSelectedDate] = useState("");
  const [setFilteredAppointments] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  useEffect(() => {
    if (!token && !userRole) {
      navigate("/login");
    } else if (userRole === "admin") {
      navigate("/admindash");
    } else if (userRole === "manager") {
      navigate("/managerdash");
    } else if (userRole === "volunteer") {
      getAppointments();
    } else if (userRole === "olduser") {
      getAppointments();
    }
  }, [navigate, token, userRole]);

  const getAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/visits/getuserappointments/${userId}`
      );
      console.log("Response data:", response.data);

      // Ensure response data is an array
      const appointments = response.data.userAppointments || [];

      // Sort appointments by appointment date
      const sortedAppointments = appointments.sort((a, b) => {
        return new Date(a.appointmentdate) - new Date(b.appointmentdate);
      });

      setVisits(sortedAppointments);
    } catch (error) {
      console.error("Error fetching users appointments:", error);
    }
  };

  const handleStateChange = (e) => {
    setAppointmentState(e.target.value);
  };

  const currentDate = new Date();

  const filteredAppointments = visits.filter((visit) => {
    if (selectedDate !== "") {
      // If a date is selected, filter by date
      return visit.appointmentdate === selectedDate;
    } else {
      // Otherwise, filter by appointment state
      if (appointmentState === "pending") {
        const appointmentDate = new Date(visit.appointmentdate);
        return appointmentDate >= currentDate;
      } else if (appointmentState === "expired") {
        const appointmentDate = new Date(visit.appointmentdate);
        return appointmentDate < currentDate;
      } else {
        return true;
      }
    }
  });

  const sortedAppointments = [...visits].sort((a, b) => {
    // Convert appointment dates to Date objects for comparison
    const dateA = new Date(a.appointmentdate);
    const dateB = new Date(b.appointmentdate);

    // Compare the dates
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  });

  // Paginate filtered appointments
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
              <div className="row">
                <div className="col-xs-12">
                  <h3 className="mt-4">My Appointments</h3>
                  <div className="filters-container">
                    <div className="filters-state">
                      <label htmlFor="filter">Appointment State:</label>
                      <select
                        id="filter"
                        value={appointmentState}
                        onChange={handleStateChange}
                      >
                        <option value="pending">Pending Appointments</option>
                        <option value="expired">Expired Appointments</option>
                        <option value="all">All Appointments</option>
                      </select>
                    </div>
                  </div>
                  <div className="table-container-user">
                    <table className="table-user">
                      {/* Table headers */}
                      <thead>
                        <tr>
                          <th>Olduser Name</th>
                          <th>Phone Number</th>
                          <th>Volunteer Name</th>
                          <th>Phone Number</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Kind of Appointment</th>
                          {/* <th>Options</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Appointments data */}
                        {currentAppointments.map((visit, key) => (
                          <tr key={key}>
                            <td>
                              {visit.oldname} {visit.oldsurname}
                            </td>
                            <td>{visit.old_number}</td>
                            <td>
                              {visit.volname} {visit.volsurname}
                            </td>
                            <td>{visit.vol_number}</td>
                            <td>{visit.appointmentdate}</td>
                            <td>{visit.appointmenttime}</td>
                            <td>{visit.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="pagination-container">
                        {Array.from({
                          length: Math.ceil(
                            filteredAppointments.length / appointmentsPerPage
                          ),
                        }).map((_, index) => (
                          <button
                            key={index}
                            className={`pagination-button ${
                              currentPage === index + 1 ? "active" : ""
                            }`} // Added active class for current page
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        ))}
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
