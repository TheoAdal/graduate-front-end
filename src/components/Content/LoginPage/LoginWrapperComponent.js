import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "./LoginWrapperComponent.scss";

import axios from "axios";
import { AuthContext } from "./AuthContext";

const LoginWrapperComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); //For handling error messages

  const navigate = useNavigate();

  const { setToken } = useContext(AuthContext);

  //FOR CREATING LOGIN AUTHENTICATION
  //https://medium.com/@simonsruggi/how-to-implement-jwt-authentication-with-react-and-node-js-5d8bf3e718d0
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      const { token, _id, name, surname, role } = response.data; // Extract role from response.data
      setToken(token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", _id); // Store user ID in local storage
      localStorage.setItem("userName", name); // Store user's name in local storage
      localStorage.setItem("userSurname", surname); // Store user's surname in local storage
      localStorage.setItem("userRole", role); // Store user's surname in local storage

      //Role redirect
      if (role === "admin") {
        navigate("/admindash");
      } else if (role === "manager") {
        navigate("/managerdash");
      } else if (role === "volunteer") {
        navigate("/volunteerdash");
      } else if (role === "olduser") {
        navigate("/olduserdash");
      }
    } catch (error) {
      //window.alert('Wrong email or password')
      console.error("Authentication failed:", error);
      setToken(null);
      localStorage.removeItem("token");
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data); // Set the error message if present in the error response
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign in</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              value={password}
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
          <div className="form-group mt-2">
            <p>
              Participate in our program as a <a href="/volunteer">Volunteer</a> or a{" "}
              <a href="/olduser">Beneficiary</a>
            </p>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={setToken}
            >
              Log In
            </button>
          </div>
          {/* <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p> */}
        </div>
      </form>
    </div>
  );
};

export default LoginWrapperComponent;
