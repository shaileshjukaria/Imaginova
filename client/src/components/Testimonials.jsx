import React from 'react'
import { testimonialsData } from '../assets/assets'   // make sure this is correct

const Testimonials = () => {
  return (
    <div className='flex flex-col items-center justify-center my-20 py-12'>
      
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>
        Customer Testimonials
      </h1>

      <p className='text-gray-500 mb-12'>What our users are Saying</p>

      <div className='flex flex-wrap gap-6'>
        {testimonialsData.map((testimonial, index) => (
          <div key={index}>
            <div>
              <img 
                src={testimonial.image} alt="" 
                className='rounded-full w-14'
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Testimonials
