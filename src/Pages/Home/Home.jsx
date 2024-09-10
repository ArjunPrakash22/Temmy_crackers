import React from 'react'
import './Home.css'
import { Navbar,About,Safety,FeaturedProduct,Contact } from '../../Component';
import hero from '../../Assets/Pictures/HERO-IMG.jpg'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <About/>
      <FeaturedProduct/>
      <Safety/>
      <Contact/>
    </div>
  )
}

export default Home