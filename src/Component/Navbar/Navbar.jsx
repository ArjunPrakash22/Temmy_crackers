import React, { useState } from 'react';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../Assets/Pictures/logo2.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current route location

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close the menu when a link is clicked
  };

  return (
    <header>
      {/* Conditionally render the hero section only on the home page */}
      {location.pathname === '/' && (
        <div className='hero-section'>
          <Link to="/product" className='explore-products'>ORDER NOW</Link>
        </div>
      )}

      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo-img" />
            </Link>
          </div>
          <ul className="portfolio-nav">
            <li className='nav-li'>
              <Link className='nav-a' to='/'>Home</Link>
            </li>
            <li className='nav-li'>
              <Link className='nav-a' to='/product'>Product</Link>
            </li>
            <li className='nav-li'>
              <Link className='nav-a' to='/contact'>Contact</Link>
            </li>
            {/* <li className='nav-li'>
              <Link className='nav-a' to="/login">Login</Link>
            </li> */}
          </ul>
          <button className='nav-btn' onClick={toggleMobileMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`nav-mob ${isOpen ? 'open' : ''}`}>
          <button className="nav-close-btn" onClick={toggleMobileMenu}>
            <FaTimes />
          </button>
          <ul>
            <li className='nav-li'>
              <Link className='nav-a' to='/' onClick={handleLinkClick}>Home</Link>
            </li>
            <li className='nav-li'>
              <Link className='nav-a' to='/product' onClick={handleLinkClick}>Product</Link>
            </li>
            <li className='nav-li'>
              <Link className='nav-a' to='/contact' onClick={handleLinkClick}>Contact</Link>
            </li>
            {/* <li className='nav-li'>
              <Link className='nav-a' to="/login" onClick={handleLinkClick}>Login</Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
