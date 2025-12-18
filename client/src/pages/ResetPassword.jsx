import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(null);
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      toast.error('Invalid reset link');
      navigate('/');
    }
  }, [token, navigate]);

  const validatePassword = (pwd) => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?\":{}|<>]).{8,}$/;
    return passwordRegex.test(pwd);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    if (value.length > 0) {
      setPasswordValid(validatePassword(value));
    } else {
      setPasswordValid(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordValid) {
      toast.error('Password must be at least 8 characters long and contain at least one special character');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.post(backendUrl + '/api/user/reset-password', {
        token,
        newPassword
      });

      if (data.success) {
        toast.success(data.message);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 to-orange-100'>
      <form onSubmit={handleSubmit} className='bg-white p-10 rounded-xl shadow-lg max-w-md w-full'>
        <h1 className='text-center text-3xl text-neutral-700 font-semibold mb-2'>Reset Password</h1>
        <p className='text-center text-sm text-gray-500 mb-6'>Enter your new password</p>

        <div className='border px-6 py-2 items-center gap-2 rounded-full mt-4 flex'>
          <img src={assets.lock_icon} alt='' className='w-4' />
          <input 
            onChange={handlePasswordChange} 
            value={newPassword} 
            type={showPassword ? 'text' : 'password'} 
            className='outline-none text-sm flex-1' 
            placeholder='New Password' 
            required 
          />
          <button 
            type='button' 
            onClick={() => setShowPassword(!showPassword)}
            className='text-gray-500 hover:text-gray-700 text-sm px-2'
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
          {passwordValid === false && <span className='text-xs text-red-600'>✗ Weak</span>}
          {passwordValid === true && <span className='text-xs text-green-600'>✓ Strong</span>}
        </div>
        <p className='text-xs text-gray-500 px-6 mt-2'>At least 8 characters with one special character</p>

        <div className='border px-6 py-2 items-center gap-2 rounded-full mt-4 flex'>
          <img src={assets.lock_icon} alt='' className='w-4' />
          <input 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            value={confirmPassword} 
            type='password' 
            className='outline-none text-sm flex-1' 
            placeholder='Confirm Password' 
            required 
          />
        </div>

        <button className='bg-orange-500 w-full text-white py-3 rounded-full cursor-pointer mt-6 hover:bg-orange-600 transition-all'>
          Reset Password
        </button>

        <p className='mt-5 text-center'>
          <span className='text-blue-600 cursor-pointer hover:underline' onClick={() => navigate('/')}>
            Back to Home
          </span>
        </p>
      </form>
    </div>
  )
}

export default ResetPassword
