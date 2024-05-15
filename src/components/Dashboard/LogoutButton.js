import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Content/LoginPage/AuthContext";

  
const LogoutButton = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleLogout = () => {
    // Clear token from context
    setToken(null);
    // Remove items from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userSurname");
    // Navigate user to homepage
    navigate("/");
  };

  return (
    <button className="dropdown-item" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
