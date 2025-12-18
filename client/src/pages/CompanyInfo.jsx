import React from 'react';
import { motion } from "motion/react";
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const CompanyInfo = () => {
  return (
    <div className='min-h-screen py-10'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-6xl mx-auto'
      >
        {/* Header */}
        <div className='text-center mb-12'>
          <img src={assets.logo} alt='Imaginova' className='w-48 mx-auto mb-4' />
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>Company Information</h1>
          <p className='text-gray-600'>Everything you need to know about Imaginova</p>
        </div>

        {/* About Us Section */}
        <section id='about' className='mb-16 bg-white p-8 rounded-2xl shadow-lg'>
          <h2 className='text-3xl font-bold text-orange-500 mb-6'>About Us</h2>
          <div className='space-y-4 text-gray-700'>
            <p>
              <strong>Imaginova</strong> is a cutting-edge AI-powered image generation platform that transforms your creative ideas into stunning visuals. Founded with a vision to democratize AI art creation, we've built a platform that makes professional-quality image generation accessible to everyone.
            </p>
            <p>
              Our platform leverages state-of-the-art artificial intelligence models to generate high-quality images from simple text descriptions. Whether you're a designer, marketer, content creator, or just someone with a creative spark, Imaginova provides the tools you need to bring your imagination to life.
            </p>
            <p>
              <strong>Our Mission:</strong> To empower creators worldwide with accessible, powerful AI tools that unlock unlimited creative potential.
            </p>
            <div className='grid md:grid-cols-3 gap-6 mt-8'>
              <div className='text-center p-4 bg-orange-50 rounded-xl'>
                <h3 className='text-2xl font-bold text-orange-500 mb-2'>10K+</h3>
                <p className='text-gray-600'>Images Generated</p>
              </div>
              <div className='text-center p-4 bg-orange-50 rounded-xl'>
                <h3 className='text-2xl font-bold text-orange-500 mb-2'>1K+</h3>
                <p className='text-gray-600'>Active Users</p>
              </div>
              <div className='text-center p-4 bg-orange-50 rounded-xl'>
                <h3 className='text-2xl font-bold text-orange-500 mb-2'>99.9%</h3>
                <p className='text-gray-600'>Uptime</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Center Section */}
        <section id='trust' className='mb-16 bg-white p-8 rounded-2xl shadow-lg'>
          <h2 className='text-3xl font-bold text-orange-500 mb-6'>Trust & Security Center</h2>
          <div className='space-y-6 text-gray-700'>
            <div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>🔒 Data Security</h3>
              <p>
                Your data security is our top priority. We implement industry-standard encryption protocols (SSL/TLS) for all data transmission. User passwords are hashed using bcrypt, and authentication is managed through secure JWT tokens.
              </p>
            </div>
            
            <div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>✉️ Email Verification</h3>
              <p>
                We require email verification for all new accounts to ensure platform security and prevent unauthorized access. Only verified users can access our image generation features.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>💳 Payment Security</h3>
              <p>
                All payment transactions are processed through Razorpay, a PCI-DSS compliant payment gateway. We never store your credit card information on our servers.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>🔐 Privacy Protection</h3>
              <p>
                We respect your privacy. Your generated images are private by default, and we never share your personal information with third parties without your consent. Read our <Link to='/privacy-policy' className='text-orange-500 hover:underline'>Privacy Policy</Link> for more details.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>📊 Compliance</h3>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>GDPR Compliant (European data protection)</li>
                <li>CCPA Compliant (California privacy rights)</li>
                <li>Regular security audits and updates</li>
                <li>Transparent data handling practices</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id='contact' className='mb-16 bg-white p-8 rounded-2xl shadow-lg'>
          <h2 className='text-3xl font-bold text-orange-500 mb-6'>Contact Us</h2>
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-6'>
              <div>
                <h3 className='text-xl font-semibold text-gray-800 mb-3'>Get in Touch</h3>
                <p className='text-gray-700 mb-4'>
                  Have questions or need assistance? We're here to help! Reach out to us through any of the following channels:
                </p>
              </div>

              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <div className='w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <span className='text-orange-500 text-xl'>📧</span>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800'>Email Support</h4>
                    <a href='mailto:support@imaginova.com' className='text-orange-500 hover:underline'>
                      support@imaginova.com
                    </a>
                    <p className='text-sm text-gray-600'>Response time: 24-48 hours</p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <span className='text-orange-500 text-xl'>💬</span>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800'>Help Desk</h4>
                    <Link to='/helpdesk' className='text-orange-500 hover:underline'>
                      Visit our Help Desk
                    </Link>
                    <p className='text-sm text-gray-600'>24/7 self-service support</p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <span className='text-orange-500 text-xl'>🌐</span>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800'>Social Media</h4>
                    <div className='flex gap-3 mt-2'>
                      <a href='https://www.facebook.com/jukariashailesh' target='_blank' rel='noopener noreferrer' className='text-orange-500 hover:text-orange-600'>
                        Facebook
                      </a>
                      <span className='text-gray-400'>|</span>
                      <a href='https://twitter.com/jukariashailesh' target='_blank' rel='noopener noreferrer' className='text-orange-500 hover:text-orange-600'>
                        Twitter
                      </a>
                      <span className='text-gray-400'>|</span>
                      <a href='https://www.instagram.com/shaileshjukaria' target='_blank' rel='noopener noreferrer' className='text-orange-500 hover:text-orange-600'>
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <span className='text-orange-500 text-xl'>👨‍💻</span>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800'>Developer</h4>
                    <a href='https://shaileshjukaria.netlify.app' target='_blank' rel='noopener noreferrer' className='text-orange-500 hover:underline'>
                      Shailesh Jukaria
                    </a>
                    <p className='text-sm text-gray-600'>Full Stack Developer</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-orange-50 p-6 rounded-xl'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4'>Business Hours</h3>
              <div className='space-y-3 text-gray-700'>
                <div className='flex justify-between'>
                  <span className='font-medium'>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM IST</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium'>Saturday:</span>
                  <span>10:00 AM - 4:00 PM IST</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium'>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
              <div className='mt-6 pt-6 border-t border-orange-200'>
                <p className='text-sm text-gray-600'>
                  <strong>Emergency Support:</strong> For critical issues, please email us with "URGENT" in the subject line.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className='bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-2xl text-white text-center'>
          <h2 className='text-2xl font-bold mb-4'>Need More Information?</h2>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link to='/privacy-policy' className='bg-white text-orange-500 px-6 py-2 rounded-full hover:bg-orange-50 transition-colors'>
              Privacy Policy
            </Link>
            <Link to='/terms-of-service' className='bg-white text-orange-500 px-6 py-2 rounded-full hover:bg-orange-50 transition-colors'>
              Terms of Service
            </Link>
            <Link to='/refund-policy' className='bg-white text-orange-500 px-6 py-2 rounded-full hover:bg-orange-50 transition-colors'>
              Refund Policy
            </Link>
            <Link to='/helpdesk' className='bg-white text-orange-500 px-6 py-2 rounded-full hover:bg-orange-50 transition-colors'>
              Help Desk
            </Link>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default CompanyInfo;
