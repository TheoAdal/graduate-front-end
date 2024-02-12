import React from "react";
import { Button, Stack } from 'react-bootstrap';
import "./LoginWrapperComponent.scss";


function LoginWrapperComponent() {
    return (
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign in</h3>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
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

export default LoginWrapperComponent;


