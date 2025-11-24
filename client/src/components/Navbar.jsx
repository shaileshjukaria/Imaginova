import React from 'react'
import {assets} from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const [user, setUser] = React.useState(true);

    const navigate = useNavigate();
  
  return (
    <div className='flex items-center justify-between py-4'>
     <Link to='/'>
      <img src = {assets.logo} alt = "" className='w-28
      sm:w-32 lg:w-40' /> 
      </Link>

    <div>
        {
        user ? 
        <div>
          <button>
            <img className='w-5' src={assets.credit_star} 
            alt=''/>
            <p>Credts left : 50</p>
          </button>
          <p>Hi,Shailesh</p>
          <div className='relative group'>
            <img src={assets.profile_icon} className='w-10 drop-shadow'
            alt=''/>
            <div className='absolute hidden group-hover:block
              top-0 right-0 z-10 text-black rounded pt-12'>
                <ul>
                  <li>Logout</li>
                </ul>
          </div>
          </div>
        </div>
        :
        <div className='flex items-center gap-2 sm:gap-5'>
          <p onClick={()=>navigate('/buycredit')} 
          className='cursor-pointer'>Pricing </p>
          <button className='bg-zinc-800 text-white px-7
          py-2 sm:px-10 text-sm rounded-full '>Login</button>    
       </div>
        }
   
    </div>
    </div>
  )
}

export default Navbar;
