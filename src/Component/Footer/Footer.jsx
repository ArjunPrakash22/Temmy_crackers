// src/components/Footer.js
import React from 'react';
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <FaMapMarkerAlt className="footer-icon" />
          <div className="company-info">
            <p>Temmy Crackers Shop</p>
            <p>66-G,Gandhi Road,Mani Nagar,Sivakasi - 626123</p>
          </div>
        </div>
        <div className="footer-right">
          <a href="tel:+1234567890" className="footer-item" aria-label="Call Us">
            <FaPhoneAlt className="footer-icon" />
          </a>
          <a href="https://wa.me/1234567890" className="footer-item" aria-label="Chat on WhatsApp" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="footer-icon" />
          </a>
          <a href="mailto:Rathan.industries.svks@gmail.com" className="footer-item" aria-label="Email Us">
            <FaEnvelope className="footer-icon" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Temmy Crackers Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
