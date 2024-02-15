import { Button, Stack } from 'react-bootstrap';
import React, { useState } from 'react';
import "./LoginWrapperComponent.scss";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
// import AdminDashboard from "../../Dashboard/AdminDashboard/AdminDashboard";


async function loginUser(credentials) {
  return fetch('http://localhost:5000/login', { ////////////////////
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

 

export default function LoginWrapperComponent({ setToken }){
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  // const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token.token);
    // navigate('/admin-dashboard'); // Use navigate function to redirect to AdminDashboard component
  }

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
              // value={username}
              // onChange={e => setUserName(e.target.value)} // Update username state on change
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              // value={password}
              // onChange={e => setPassword(e.target.value)} // Update password state on change
            />
          </div>
          <div className="form-group mt-2">
            <p>Participate in our program as a <a href="#">Volunteer</a> or a <a href="#">Beneficiary</a></p>
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
  )
    }

    LoginWrapperComponent.propTypes = {
      setToken: PropTypes.func.isRequired
    };



