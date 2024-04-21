// Footer.js
import React from "react";
import { Link } from "react-router-dom";
// import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small">
          <div className="text-muted">
            Copyright &copy; Your Website 2024
          </div>
          <div>
          <Link to= "https://youtu.be/FSxU80akXB4?si=KiOMxE1-Wrd3pBox"  target="_blank">Privacy Policy  </Link>
          <Link to= "https://youtu.be/U2XP8B7uQ5A?si=RabCBwPs8vthEYQq"  target="_blank">Terms &amp; Conditions  </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

