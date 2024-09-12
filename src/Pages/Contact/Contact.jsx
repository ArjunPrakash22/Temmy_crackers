import React from 'react';
import './Contact.css'; 
import { Navbar } from '../../Component';

const Contact = () => {
  return (
    <div className='contact-page'>
        <Navbar/>
      <h1 className='contact-h1'>Contact Us</h1>
      <div className='contact-info'>
        <div className='contact-item'>
          <h2>Mobile Number</h2>
          <a href="tel:+1234567890" className='contact-link'>+1 (234) 567-890</a>
        </div>
        <div className='contact-item'>
          <h2>Email</h2>
          <a href="mailto:info@example.com" className='contact-link'>info@example.com</a>
        </div>
        <div className='contact-item'>
          <h2>WhatsApp</h2>
          <a href="https://wa.me/1234567890" className='contact-link' target="_blank" rel="noopener noreferrer">Chat with us on WhatsApp</a>
        </div>
      </div>
      <div className='shop-location'>
        <h2>Our Location</h2>
        <iframe 
          title="Shop Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.755247020262!2d-122.41941868468199!3d37.774929279759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085805c8c66d7b3%3A0x9b78e4372f5f8f48!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1633348041364!5m2!1sen!2sin" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
