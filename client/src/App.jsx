import React, { useContext } from 'react';
import { Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Result from './pages/Result';
import BuyCredit from './pages/BuyCredit';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import VerifyEmail from './pages/VerifyEmail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppContext } from './context/AppContext';

const App = () => {

  const {showLogin} = useContext(AppContext);

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28
    min-h-screen bg-linear-to-b from-teal-50 to-orange-50'>
      <ToastContainer  position='bottom-right'/>
<Navbar/>
{showLogin && <Login/>}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/result' element={<Result/>} />
        <Route path='/buycredit' element={<BuyCredit/>} />
        <Route path='/verify-email' element={<VerifyEmail/>} />
        <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
        <Route path='/terms-of-service' element={<TermsOfService/>} />
        <Route path='/refund-policy' element={<RefundPolicy/>} />
      </Routes>
     <Footer/>
    </div>
  );
};

export default App;
