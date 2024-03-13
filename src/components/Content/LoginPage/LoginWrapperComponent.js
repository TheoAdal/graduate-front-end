import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "./LoginWrapperComponent.scss";
import PropTypes from "prop-types";
import useToken from "../../Token/useToken";

async function loginUser(credentials) {
  return fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken: saveToken } = useToken(); // Destructure setToken from useToken

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { token, role } = await loginUser({ email, password });
  //     if (token && role) {
  //       saveToken({ token }); // Save token to local storage
  //       setToken({ token, role }); // Set token and role in parent component
  //       switch (role) {
  //         case "admin":
  //           navigate("/admindash");
  //           break;
  //         case "manager":
  //           navigate("/managerdash");
  //           break;
  //         case "volunteer":
  //           navigate("/volunteerdash");
  //           break;
  //         case "oldUser":
  //           navigate("/olduserdash");
  //           break;
  //         default:
  //           navigate("/about");
  //           break;
  //       }
  //     } else {
  //       console.error("Login error: Token or role is missing.");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, role } = await loginUser({ email, password });
      console.log("Received token in login component:", token); // Debugging statement
      if (token && role) {
        console.log("Role:", role); // Debugging statement
        saveToken({ token }); // Save token to local storage
        setToken({ token, role }); // Set token and role in parent component
        // Other code...
      } else {
        console.error("Login error: Token or role is missing.");
      }
    } catch (error) {
      console.error("Login error:", error);
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
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <p>
              Participate in our program as a <a href="#">Volunteer</a> or a{" "}
              <a href="#">Beneficiary</a>
            </p>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </div>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};