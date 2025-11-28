import React from 'react'
import { stepsData } from '../assets/assets'

const Steps = () => {
  return (
    <div>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it Works?</h1>
      <p className='text-lg text-gray-600 mb-8'>
        Transform Words into Stunning Images
      </p>

      <div>
        {stepsData.map((item, index) => (
          <div key={index}>
            <img src={item.icon} alt="" />
            <div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div> {/* <-- Missing closing div added here */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Steps
