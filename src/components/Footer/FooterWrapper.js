import React from "react";
import "./FooterStyles.scss";
import logo from "../../images/logo192.png"; // Import your company logo

function FooterWrapper() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="company-info">
          <img src={logo} alt="Company Logo" className="company-logo" />
          <div>
            <h4>Friendship at All Ages</h4>
            <p>123 Company St, Cityville, Country</p>
          </div>
        </div>
        <div className="contact-info">
          <p>Phone: +123 456 7890</p>
          <p>Email: info@friendshipatallages.com</p>
        </div>
      </div>
    </div>
  );
}

export default FooterWrapper;
