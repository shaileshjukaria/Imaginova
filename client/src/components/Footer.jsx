import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex flex-col gap-4 py-3 mt-20'>
      
      <div className='flex items-center justify-between gap-4'>
        <img src={assets.logo} alt='' width={150} />

        <p className='flex-1 border-l border-gray-400 pl-4
        text-sm text-gray-500 max-sm:hidden'> 
        Copyright @<a href='https://shaileshjukaria.netlify.app' target='_blank' rel='noopener noreferrer' className='hover:text-gray-700 transition-colors'>Shailesh Jukaria</a>   | All rights reserved.</p>

        <div className='flex gap-2.5'>
          <a href="https://www.facebook.com/jukariashailesh" target="_blank" rel="noopener noreferrer">
            <img src={assets.facebook_icon} alt="Facebook" width={35} />
          </a>
          <a href="https://twitter.com/jukariashailesh" target="_blank" rel="noopener noreferrer">
            <img src={assets.twitter_icon} alt="Twitter" width={35} />
          </a>
          <a href="https://www.instagram.com/shaileshjukaria" target="_blank" rel="noopener noreferrer">
            <img src={assets.instagram_icon} alt="Instagram" width={35} />
          </a>
        </div>
      </div>

      <div className='flex gap-4 text-sm text-gray-600 justify-center border-t pt-4'>
        <Link to='/privacy-policy' className='hover:text-gray-900 cursor-pointer'>Privacy Policy</Link>
        <span>|</span>
        <Link to='/terms-of-service' className='hover:text-gray-900 cursor-pointer'>Terms of Service</Link>
        <span>|</span>
        <Link to='/refund-policy' className='hover:text-gray-900 cursor-pointer'>Refund Policy</Link>
      </div>

    </div>
  )
}

export default Footer
