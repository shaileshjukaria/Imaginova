import React from 'react'
import Header from '../components/Header';
import Steps from '../components/Steps';
import Description from '../components/Description';
import Testimonials from '../components/Testimonials';
import ReviewSection from '../components/ReviewSection';
import GenerateBtn from '../components/GenerateBtn';

const Home = () => {
  return (
    <div>
      <Header/>
      <Steps/>
      <Description/>
      <Testimonials/>
      <ReviewSection/>
      <GenerateBtn/>
    </div>
  )
}

export default Home;
