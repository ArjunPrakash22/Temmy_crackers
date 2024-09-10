// src/components/ProductCard.js
import React from 'react';
import './Productcard.css'; 
import { Link } from 'react-router-dom';

const Productcard = ({ image, name }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <Link to='/product' className='view-more'>VIEW MORE</Link>
      </div>
    </div>
  );
};

export default Productcard;
