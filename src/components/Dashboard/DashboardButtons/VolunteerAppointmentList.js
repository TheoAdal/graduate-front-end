import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Button.scss";

import Sidebar from "../DashboardNav/Sidebar";
import TopNav from "../DashboardNav/TopNav";
import Footer from "../DashboardNav/Footer";

import { AuthContext } from "../../Content/LoginPage/AuthContext";

export default function ListAppointments() {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("userSurname");
  const userRole = localStorage.getItem("userRole");

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [visits, setVisits] = useState([]);
  const [appointmentState, setAppointmentState] = useState("pending");
  const [selectedDate, setSelectedDate] = useState("");
  const [matchingRequests, setMatchingRequests] = useState([]);

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
      getMatchingRequests();
    } else if (userRole === "olduser") {
      navigate("/olduserdash");
    }
  }, [navigate]);

  const getMatchingRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/volunteers/matching-requests/${userId}`
      );
      console.log("Response data:", response.data);
      const sortedRequests = response.data.sort((a, b) => {
        return new Date(a.appointmentDate) - new Date(b.appointmentDate);
      });
      setMatchingRequests(sortedRequests);
      setMatchingRequests(response.data);
    } catch (error) {
      console.error("Error fetching matching requests:", error);
    }
  };

  // Function to accept an appointment request
  const handleAccept = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/requests/accept/${id}`, {
        volunteerId: userId, // Assuming the volunteer ID is stored in localStorage
      });
      // Refresh the list of appointments after accepting
      alert("You have accepted an appointment");
      getMatchingRequests(); // Navigate to the manager list page after successful registration
    } catch (error) {
      console.error("Error accepting request:", error);
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

  // Paginate matching requests
const indexOfLastAppointment = currentPage * appointmentsPerPage;
const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
const currentAppointments = matchingRequests.slice(
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
                  <h3 className="mt-4">Matching Requests</h3>
                  <div className="table-container-user">
                    <table className="table-user">
                      {/* Table headers */}
                      <thead>
                        <tr>
                          <th>Beneficiary Name</th>
                          {/* <th>Old User Phone Number</th> */}
                          <th>Preferred Age</th>
                          <th>Preferred City</th>
                          <th>Preferred Gender</th>
                          <th>Appointment Date</th>
                          <th>Appointment Time</th>
                          <th>Description</th>
                          <th>Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Matching Requests data */}
                        {currentAppointments.map((request, key) => (
                          <tr key={key}>
                            <td>
                              {request.oldUserId.name}{" "}
                              {request.oldUserId.surname}
                            </td>
                            {/* <td>{request.oldUserId.mobile}</td> */}
                            <td>{request.preferredAge}</td>
                            <td>{request.preferredCity}</td>
                            <td>{request.preferredGender}</td>
                            <td>{request.appointmentDate}</td>
                            <td>{request.appointmentTime}</td>
                            <td>{request.description}</td>
                            <td>
                              <div className="button-container">
                                <button
                                  className="change-state"
                                  onClick={() => handleAccept(request._id)}
                                >
                                  Accept
                                </button>
                                {/* <button className="delete"
                                onClick={() => handleDecline(request._id)}
                              >
                                Decline
                              </button> */}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="pagination-container">
                      {Array.from({
                        length: Math.ceil(
                          matchingRequests.length / appointmentsPerPage
                        ),
                      }).map((_, index) => (
                        <button
                          key={index}
                          className={`pagination-button ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
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
