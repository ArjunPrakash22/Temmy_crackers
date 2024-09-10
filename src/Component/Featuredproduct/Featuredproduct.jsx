import React from 'react'
import './Featuredproduct.css'
import { Productcard } from '../../Widget'
import products from '../../Constants/Products'

const Featuredproduct = () => {
  return (
    <div className='featured-prod-sec'>
        <h1 className='featured-prod-h1'>FEATURED PRODUCTS</h1>
        <div className="product-list">
      {products.map(product => (
        <Productcard
          key={product.id}
          image={product.image}
          name={product.name}
        />
      ))}
    </div>
    </div>
  )
}

export default Featuredproduct