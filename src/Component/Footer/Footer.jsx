// src/components/Footer.js
import React from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";
import logo from '../../Assets/Pictures/temmycrackerslogo.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-left1">
            <a
              href="tel:+916380519757"
              className="footer-item"
              aria-label="Call Us"
            >
              <FaPhoneAlt className="footer-icon" />
            </a>
            <a
              href="https://wa.me/6380519757"
              className="footer-item"
              aria-label="Chat on WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="footer-icon" />
            </a>
            <a
              href="mailto:Rathan.industries.svks@gmail.com"
              className="footer-item"
              aria-label="Email Us"
            >
              <FaEnvelope className="footer-icon" />
            </a>
          </div>
          <div className="footer-left2">
            <FaMapMarkerAlt className="footer-icon" />
            <div className="company-info">
              <p>66-G,Gandhi Road,Mani Nagar,Sivakasi - 626123</p>
            </div>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-right-logo-cont">
            <img className="footer-right-logo-img" src={logo} alt="logo"/>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-bot-p">
          &copy; 2024 Temmy Crackers Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
