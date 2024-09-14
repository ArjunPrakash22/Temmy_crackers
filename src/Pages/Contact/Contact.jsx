import React from 'react';
import './Contact.css'; 
import { Navbar } from '../../Component';

const Contact = () => {
  return (
    <div className='contact-page'>
        <Navbar/>
      <h1 className='contact-h1'>CONTACT US</h1>
      <div className='contact-info'>
        <div className='contact-item'>
          <h2 className='contact-head'>MOBILE NUMBER</h2>
          <a href="tel:+916380519757" className='contact-link'>+916380519757</a>
        </div>
        <div className='contact-item'>
          <h2 className='contact-head' >EMAIL ID</h2>
          <a href="mailto:Rathan.industries.svks@gmail.com" className='contact-link'>Rathan.industries.svks@gmail.com</a>
        </div>
        </div>
        <div className='contact-info2'>
        <div className='contact-item'>
          <h2 className='contact-head' >WHATSAPP</h2>
          <a href="https://wa.me/6380519757" className='contact-link' target="_blank" rel="noopener noreferrer">Chat with us on WhatsApp: +916380519757</a>
        </div>
      </div>
      <div className='shop-location'>
        <h2 className='contact-head' >OUR LOCATION</h2>
        <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3935.7257834415173!2d77.79826737502397!3d9.445427890633487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMjYnNDMuNSJOIDc3wrA0OCcwMy4wIkU!5e0!3m2!1sen!2sin!4v1726295647667!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
};

export default Contact;
