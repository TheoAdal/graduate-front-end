import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Button.scss";

import Sidebar from "../DashboardNav/Sidebar";
import TopNav from "../DashboardNav/TopNav";
import Footer from "../DashboardNav/Footer";

import { AuthContext } from "../../Content/LoginPage/AuthContext";

export default function RequestPage() {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("userSurname");
  const userRole = localStorage.getItem("userRole");

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [minDate, setMinDate] = useState("");

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [preferredAge, setPreferredAge] = useState("");
  const [preferredGender, setPreferredGender] = useState("");
  const [preferredCity, setPreferredCity] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!token && !userRole) {
      navigate("/login");
    } else if (userRole === "admin") {
      navigate("/admindash");
    } else if (userRole === "manager") {
      navigate("/managerdash");
    } else if (userRole === "volunteer") {
      navigate("/volunteerdash");
    } else if (userRole === "olduser") {
      const today = new Date();
      const formattedDate = today.toISOString().substr(0, 10); // Format: YYYY-MM-DD
      setMinDate(formattedDate);
    }
  }, [navigate]);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();

    if (
      !preferredAge ||
      !preferredGender ||
      !preferredCity ||
      !appointmentDate ||
      !appointmentTime ||
      !description
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      // console.log("Appointment Date:", appointmentDate);
      const response = await axios.post(
        "http://localhost:5000/requests/create",
        {
          oldUserId: userId,
          preferredAge,
          preferredGender,
          preferredCity,
          appointmentDate,
          appointmentTime,
          description,
        }
      );

      console.log("Request created:", response.data);
      alert("Request created succesfully");
      resetForm();
      // Navigate to a success page or display a success message
    } catch (error) {
      // console.log("Appointment Date:", appointmentDate);
      console.error("Error creating request:", error);
      // Check if the error message contains the specific message for appointment conflict
      if (
        error.response &&
        error.response.data &&
        error.response.data.message ===
          "An appointment already exists for this date"
      ) {
        alert("An appointment already exists for this date");
        //   console.log("Error response data:", error.response.data);
      } else {
        alert("Error creating request. Please try again later.");
      }
    }
  };

  const resetForm = () => {
    setPreferredAge("");
    setPreferredGender("");
    setPreferredCity("");
    setAppointmentDate("");
    setAppointmentTime("");
    setDescription("");
  };

  return (
    <div className="sb-nav-fixed ">
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
                  <h3 className="mt-4">Δημιουργία Request</h3>
                  <h5 className="mt-4">
                    Διαλέξτε τα χαρακτηριστικά του εθελοντή:
                  </h5>

                  <div className="request-creation">
                    <div className="request-age-container">
                      <label htmlFor="preferredAge" className="form-label">
                        Preferred Age Range:
                      </label>
                      <select
                        id="preferredAge"
                        className="form-select"
                        value={preferredAge}
                        onChange={(e) => setPreferredAge(e.target.value)}
                      >
                        <option value="">Select Age Range</option>
                        <option value="all">All</option>
                        <option value="16-20">16-20</option>
                        <option value="21-30">21-30</option>
                        <option value="31-40">31-40</option>
                        <option value="41-50">41-50</option>
                        <option value="51++">51++</option>
                      </select>
                    </div>
                    <div className="request-gender-container">
                      <label htmlFor="preferredGender" className="form-label">
                        Preferred Gender:
                      </label>
                      <select
                        id="preferredGender"
                        className="form-select"
                        value={preferredGender}
                        onChange={(e) => setPreferredGender(e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        <option value="all">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="request-city-container">
                      <label htmlFor="preferredCity" className="form-label">
                        Preferred City:
                      </label>
                      <select
                        id="preferredCity"
                        className="form-select"
                        value={preferredCity}
                        onChange={(e) => setPreferredCity(e.target.value)}
                      >
                        <option value="">Select City</option>
                        {/* <option value="all">All</option> */}
                        <option value="Nicosia">Nicosia</option>
                        <option value="Limassol">Limassol</option>
                        <option value="Famagusta">Famagusta</option>
                        <option value="Paphos">Paphos</option>
                        <option value="Kyrenia">Kyrenia</option>
                        <option value="Protaras">Protaras</option>
                        <option value="Polis">Polis</option>
                        <option value="Ayia Napa">Ayia Napa</option>
                        <option value="Troodos">Troodos</option>
                      </select>
                    </div>
                    <div className="request-date-container">
                      <label htmlFor="appointmentDate" className="form-label">
                        Appointment Date:
                      </label>
                      <input
                        type="date"
                        id="appointmentDate"
                        className="form-control"
                        value={appointmentDate}
                        min={minDate} // Set the min attribute to the minimum date
                        onChange={(e) => {
                          const selectedDate = e.target.value;
                          setAppointmentDate(selectedDate); // Update the state
                        }}
                      />
                    </div>
                    <div className="request-time-container">
                      <label htmlFor="appointmentTime" className="form-label">
                        Appointment Time:
                      </label>
                      <input
                        type="time"
                        id="appointmentTime"
                        className="form-control"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                      />
                    </div>
                    <div className="request-description-container">
                      <label htmlFor="description" className="form-label">
                        Description:
                      </label>
                      <div className="textarea-description">
                        <textarea
                          id="description"
                          as="textarea"
                          rows={2}
                          className="form-control"
                          placeholder="Type here"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleRequestSubmit}
                    >
                      Submit
                    </button>
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
