import React from 'react'
import { stepsData } from '../assets/assets'

const Steps = () => {
  return (
    <div className="flex flex-col items-center text-center my-28">

      <h1 className="text-4xl font-semibold mb-2">How it Works?</h1>
      <p className="text-lg text-gray-600 mb-10">
        Transform Words into Stunning Images
      </p>

      {/* Main container */}
      <div className="w-full max-w-2xl space-y-6">

        {stepsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 bg-white/30 border rounded-xl p-6 shadow-lg 
            hover:scale-[1.02] transition duration-300 cursor-pointer"
          >
            <img src={item.icon} width={40} alt="" />

            <div className="text-left">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Steps
