import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "./LoginWrapperComponent.scss";
import ImgLogin from "../../../images/imglogin.jpg";

import axios from "axios";
import { AuthContext } from "./AuthContext";

const LoginWrapperComponent = () => {
  const [email, setEmail] = useState("");
  // const [verified] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); //For handling error messages

  const navigate = useNavigate();

  const { setToken, token } = useContext(AuthContext);
  // const { setToken, token, loading } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      const userRole = localStorage.getItem("userRole");
      if (userRole === "admin") {
        navigate("/admindash");
      } else if (userRole === "manager") {
        navigate("/managerdash");
      } else if (userRole === "volunteer") {
        navigate("/volunteerdash");
      } else if (userRole === "olduser") {
        navigate("/olduserdash");
      }
    }
  }, [navigate, token]);

  //FOR CREATING LOGIN AUTHENTICATION
  //https://medium.com/@simonsruggi/how-to-implement-jwt-authentication-with-react-and-node-js-5d8bf3e718d0
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
        // verified,
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
    <div>
      {/* <img className="login-image" src={ImgLogin} alt="img" /> */}
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
              <div className="options">
                Participate in our program as a{" "}
                <a href="/volunteer">Volunteer</a> or a{" "}
                <a href="/olduser">Beneficiary</a>
              </div>
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
            <div className="options">
              Forgot your <a href="/forgotpassword">password?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginWrapperComponent;
