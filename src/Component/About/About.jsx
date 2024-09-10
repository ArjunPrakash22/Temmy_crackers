import React from 'react'
import './About.css'
import about from '../../Assets/Pictures/temmycrackerslogo.png'

const About = () => {
  return (
    <div className='about-sec'>
        <h1>ABOUT US</h1>
        <div className='about-cont'>
        <div className='abt-img-cont'>
        <img className='abt-img' src={about}/>
        </div>
        <div className='abt-content-cont'>
            <p className='abt-content'>We believe in lighting up every celebration with joy and sparkle! Our wide variety of crackers are not just made to delight you but also designed with utmost care and safety in mind. From traditional favorites to modern marvels, we’ve been serving our customers with the best quality fireworks.
            Whether it's a festival, a wedding, or any special occasion, we have just the right fireworks to add a spark to your moments. Let’s celebrate together, safely!
            </p>
        </div>
        </div>
    </div>
  )
}

export default About