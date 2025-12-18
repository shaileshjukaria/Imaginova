import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { motion } from "motion/react"
import axios from 'axios';
import { toast } from 'react-toastify';

// Load Google Sign-In API
const loadGoogleScript = () => {
    return new Promise((resolve) => {
        if (window.google) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.head.appendChild(script);
    });
};

const Login = () => {

const [state, setState] = useState('Login');
const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

const [name, setName] = useState('');
const [username, setUsername] = useState('');
const [emailOrUsername, setEmailOrUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showResend, setShowResend] = useState(false);
const [usernameAvailable, setUsernameAvailable] = useState(null);
const [checkingUsername, setCheckingUsername] = useState(false);
const [passwordValid, setPasswordValid] = useState(null);
const [showPassword, setShowPassword] = useState(false);

const checkUsernameAvailability = async (usernameToCheck) => {
    if (!usernameToCheck || usernameToCheck.length < 3) {
        setUsernameAvailable(null);
        return;
    }
    
    setCheckingUsername(true);
    try {
        const {data} = await axios.get(backendUrl + '/api/user/check-username', {
            params: { username: usernameToCheck }
        });
        if(data.success){
            setUsernameAvailable(data.available);
        }
    } catch (error) {
        console.error(error);
    } finally {
        setCheckingUsername(false);
    }
}

const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    // Debounce username check
    if (value.length >= 3) {
        setTimeout(() => checkUsernameAvailability(value), 500);
    } else {
        setUsernameAvailable(null);
    }
}

const validatePassword = (pwd) => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return passwordRegex.test(pwd);
}

const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (state !== 'Login' && value.length > 0) {
        setPasswordValid(validatePassword(value));
    } else {
        setPasswordValid(null);
    }
}

const handleResendVerification = async () => {
    try {
        const emailToUse = state === 'Login' ? emailOrUsername : email;
        const {data} = await axios.post(backendUrl + '/api/user/resend-verification', { email: emailToUse });
        if(data.success){
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
}

const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
        if(state === 'Login'){
            const {data} = await axios.post(backendUrl + '/api/user/login', {
                emailOrUsername, password})
            if(data.sucess){
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('token', data.token);
                setShowLogin(false);
                setShowResend(false);
            }else{
                toast.error(data.message);
                // Show resend button if verification is required
                if(data.requiresVerification){
                    setShowResend(true);
                }
            }   

        }else{
            if (!usernameAvailable) {
                toast.error('Please choose an available username');
                return;
            }
            
            if (!passwordValid) {
                toast.error('Password must be at least 8 characters long and contain at least one special character');
                return;
            }
            
            const {data} = await axios.post(backendUrl + '/api/user/register', {
                name, username, email, password})
            if(data.sucess){
                if(data.requiresVerification){
                    toast.success(data.message);
                    setShowResend(true);
                    setState('Login');
                } else {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                }
            }else{
                toast.error(data.message); 

            }

        }
        
        
    } catch (error) {
        toast.error(error.message);
        
    }
}

const handleGoogleSignIn = async (response) => {
    try {
        // Decode JWT token from Google
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const googleUser = JSON.parse(jsonPayload);
        
        // Send to backend
        const {data} = await axios.post(backendUrl + '/api/user/google-auth', {
            email: googleUser.email,
            name: googleUser.name,
            googleId: googleUser.sub,
            profilePicture: googleUser.picture
        });
        
        if(data.sucess){
            setToken(data.token);
            setUser(data.user);
            localStorage.setItem('token', data.token);
            setShowLogin(false);
            toast.success('Successfully logged in with Google!');
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.error('Google sign-in error:', error);
        toast.error('Failed to sign in with Google');
    }
}

    useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Initialize Google Sign-In
    loadGoogleScript().then(() => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '1018816628124-m2uajrkq7e81inh5htvjb8b7kc6m1e6m.apps.googleusercontent.com',
                callback: handleGoogleSignIn
            });
            window.google.accounts.id.renderButton(
                document.getElementById('googleSignInButton'),
                { 
                    theme: 'outline', 
                    size: 'large',
                    width: 350,
                    text: state === 'Login' ? 'signin_with' : 'signup_with'
                }
            );
        }
    });
    
    return () => {
        document.body.style.overflow = 'unset';
    }
}, [state]);

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0
    z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      
    <motion.form onSubmit={onSubmitHandler}
    initial={{ opacity: 0.2, y: 50 }}
    transition={{duration:0.3}}
    whileInView={{opacity:1,y:0}}
    viewport={{ once: true }}
    className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm'>Welcome back! Please Sign In to continue</p>

       { state!=='Login' && <div className='border px-6 py-2 items-center gap-2 rounded-full mt-4'>
            <img src={assets.user_icon} alt='' />
            <input onChange={e => setName(e.target.value)} value={name}
             type='text' className='outline-none text-sm' placeholder='Full Name' required />
        </div>}

        { state!=='Login' && <div className='border px-6 py-2 items-center gap-2 rounded-full mt-4'>
            <img src={assets.user_icon} alt='' />
            <input onChange={handleUsernameChange} value={username}
             type='text' className='outline-none text-sm' placeholder='Username' required />
            {checkingUsername && <span className='text-xs text-gray-400'>Checking...</span>}
            {!checkingUsername && usernameAvailable === true && <span className='text-xs text-green-600'>✓ Available</span>}
            {!checkingUsername && usernameAvailable === false && <span className='text-xs text-red-600'>✗ Taken</span>}
        </div>}

        <div className='border px-6 py-2 items-center gap-2 rounded-full mt-4'>
            <img src={assets.email_icon} alt='' />
            {state === 'Login' ? (
                <input onChange={e => setEmailOrUsername(e.target.value)} value={emailOrUsername} 
                type='text' className='outline-none text-sm' placeholder='Email or Username' required />
            ) : (
                <input onChange={e => setEmail(e.target.value)} value={email} 
                type='email' className='outline-none text-sm' placeholder='Email ID' required />
            )}
        </div>

        <div className='border px-6 py-2 items-center gap-2 rounded-full mt-4 flex'>
            <img src={assets.lock_icon} alt='' />
            <input onChange={handlePasswordChange} value={password} type={showPassword ? 'text' : 'password'} className='outline-none text-sm flex-1' placeholder='Password' required />
            <button 
                type='button' 
                onClick={() => setShowPassword(!showPassword)}
                className='text-gray-500 hover:text-gray-700 text-sm px-2'
            >
                {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
            {state !== 'Login' && passwordValid === false && <span className='text-xs text-red-600'>✗ Weak</span>}
            {state !== 'Login' && passwordValid === true && <span className='text-xs text-green-600'>✓ Strong</span>}
        </div>
        {state !== 'Login' && <p className='text-xs text-gray-500 px-6 -mt-2'>At least 8 characters with one special character</p>}
        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password?</p>

        <button className='bg-orange-500 w-full text-white py-2 rounded-full cursor-pointer'>{state === 'Login' ? 'Login' : 'Create Account'}</button>

       <div className='flex items-center gap-2 my-4'>
            <div className='flex-1 h-px bg-gray-300'></div>
            <p className='text-xs text-gray-500'>OR</p>
            <div className='flex-1 h-px bg-gray-300'></div>
       </div>

       <div id='googleSignInButton' className='flex justify-center'></div>

       {showResend && (
            <div className='mt-4 text-center'>
                <p className='text-sm text-gray-600 mb-2'>Didn't receive the email?</p>
                <button 
                    type='button'
                    onClick={handleResendVerification}
                    className='text-orange-500 text-sm font-medium hover:text-orange-600'
                >
                    Resend Verification Email
                </button>
            </div>
       )}

       {state === 'Login' ? <p className='mt-5 text-center'>Don't have an account? 
            <span className='text-blue-600 cursor-pointer' onClick={() => {setState('Sign Up'); setShowResend(false);}}> Sign Up</span></p>
       :
        <p className='mt-5 text-center'>Already have an account? 
            <span className='text-blue-600 cursor-pointer' onClick={() => {setState('Login'); setShowResend(false);}}> Login</span></p>}

            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt='' className='absolute top-5 right-5 cursor-pointer'/>

    </motion.form>

    </div>
  ) 
}

export default Login
