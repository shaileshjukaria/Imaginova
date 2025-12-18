import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { motion } from "motion/react";
import { assets } from '../assets/assets';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { backendUrl, setShowLogin } = useContext(AppContext);
    const [verificationStatus, setVerificationStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');
            
            if (!token) {
                setVerificationStatus('error');
                setMessage('Invalid verification link');
                return;
            }

            try {
                const { data } = await axios.get(`${backendUrl}/api/user/verify-email?token=${token}`);
                
                if (data.success) {
                    setVerificationStatus('success');
                    setMessage(data.message);
                    toast.success('Email verified successfully!');
                    
                    // Redirect to home page after 3 seconds
                    setTimeout(() => {
                        navigate('/');
                        setShowLogin(true);
                    }, 3000);
                } else {
                    setVerificationStatus('error');
                    setMessage(data.message);
                    toast.error(data.message);
                }
            } catch (error) {
                setVerificationStatus('error');
                setMessage('Verification failed. Please try again.');
                toast.error(error.message);
            }
        };

        verifyEmail();
    }, [searchParams, backendUrl, navigate, setShowLogin]);

    const handleLoginClick = () => {
        navigate('/');
        setShowLogin(true);
    };

    return (
        <div className='min-h-screen bg-linear-to-b from-orange-50 to-orange-100 flex items-center justify-center px-4'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center'
            >
                {verificationStatus === 'verifying' && (
                    <>
                        <div className='w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-6'></div>
                        <h1 className='text-2xl font-semibold text-gray-800 mb-2'>Verifying Email</h1>
                        <p className='text-gray-600'>{message}</p>
                    </>
                )}

                {verificationStatus === 'success' && (
                    <>
                        <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                            <svg className='w-10 h-10 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
                            </svg>
                        </div>
                        <h1 className='text-2xl font-semibold text-gray-800 mb-2'>Email Verified! 🎉</h1>
                        <p className='text-gray-600 mb-6'>{message}</p>
                        <p className='text-sm text-gray-500'>Redirecting to login...</p>
                    </>
                )}

                {verificationStatus === 'error' && (
                    <>
                        <div className='w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                            <svg className='w-10 h-10 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                            </svg>
                        </div>
                        <h1 className='text-2xl font-semibold text-gray-800 mb-2'>Verification Failed</h1>
                        <p className='text-gray-600 mb-6'>{message}</p>
                        <button 
                            onClick={handleLoginClick}
                            className='bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors'
                        >
                            Go to Login
                        </button>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default VerifyEmail;
