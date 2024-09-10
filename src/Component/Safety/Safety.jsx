import React from 'react'
import './Safety.css'
import safety from '../../Assets/Pictures/safety-measures.jpg'

const Safety = () => {
  return (
    <div className='safety-sec'>
        <h1 className='safety-h1'>SAFETY TIPS!</h1>
        <div className='safety-div'>
            <div className='safety-div1'>
                <ul className='safety-div1-ul'>
                    <li className='safety-content'>Always keep water or a fire extinguisher nearby when using fireworks.</li>
                    <li className='safety-content'>Never relight a malfunctioning cracker—wait 15-20 minutes before carefully disposing of it.</li>
                    <li className='safety-content'>Ensure children are supervised at all times and handle crackers only with adult assistance.</li>
                    <li className='safety-content'>Wear eye protection and maintain a safe distance while igniting fireworks.</li>
                </ul>
            </div>
            <div className='safety-div2'>
                <img className='safety-div2-img' src={safety}/>
            </div>
        </div>
    </div>
  )
}

export default Safety