import React, { useState } from 'react';
import { motion } from "motion/react";
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Helpdesk = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click the "Get Started" button on the homepage, fill in your name, email, and password. You\'ll receive a verification email - click the link to verify your account and start generating images!'
        },
        {
          q: 'Why do I need to verify my email?',
          a: 'Email verification ensures account security and helps us prevent spam and unauthorized access. Only verified users can generate images and access premium features.'
        },
        {
          q: 'I didn\'t receive the verification email. What should I do?',
          a: 'Check your spam/junk folder first. If you still can\'t find it, click on "Resend Verification Email" on the login page. Make sure you entered the correct email address during registration.'
        },
        {
          q: 'How many free credits do I get?',
          a: 'Every new verified user receives 5 free credits to get started with AI image generation. Each image generation typically uses 1 credit.'
        }
      ]
    },
    {
      category: 'Image Generation',
      questions: [
        {
          q: 'How do I generate an image?',
          a: 'After logging in, enter a descriptive text prompt in the input field and click "Generate Image". The AI will create an image based on your description. Be specific and detailed for best results!'
        },
        {
          q: 'What makes a good prompt?',
          a: 'Good prompts are detailed and specific. Include information about the subject, style, lighting, colors, and mood. Example: "A majestic lion in a savanna at sunset, cinematic lighting, photorealistic style"'
        },
        {
          q: 'How long does it take to generate an image?',
          a: 'Image generation typically takes 10-30 seconds depending on complexity and server load. You\'ll see a loading indicator while the AI creates your image.'
        },
        {
          q: 'Can I download my generated images?',
          a: 'Yes! All your generated images are automatically saved to your gallery and can be downloaded in high resolution at any time.'
        }
      ]
    },
    {
      category: 'Credits & Pricing',
      questions: [
        {
          q: 'How do credits work?',
          a: 'Each image generation uses credits from your account balance. Different features may use different amounts of credits. You can check your current balance in the top navigation bar.'
        },
        {
          q: 'How can I purchase more credits?',
          a: 'Click on the "Buy Credits" button in the navigation menu. We offer three plans: Basic (100 credits - ₹199), Advanced (400 credits - ₹599), and Business (2500 credits - ₹2949).'
        },
        {
          q: 'Do credits expire?',
          a: 'No, your credits never expire! Use them whenever you need them, at your own pace.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major payment methods through Razorpay including credit/debit cards, UPI, net banking, and digital wallets.'
        }
      ]
    },
    {
      category: 'Account & Security',
      questions: [
        {
          q: 'How do I reset my password?',
          a: 'Click on "Forgot Password?" on the login page. Enter your registered email address and we\'ll send you instructions to reset your password.'
        },
        {
          q: 'Is my data secure?',
          a: 'Absolutely! We use industry-standard encryption (SSL/TLS) for all data transmission. Passwords are hashed using bcrypt, and we never store your payment information on our servers.'
        },
        {
          q: 'Can I change my email address?',
          a: 'For security reasons, email address changes require contacting our support team at teamshaileshjukaria@outlook.com with your account details.'
        },
        {
          q: 'How do I delete my account?',
          a: 'To delete your account, please contact our support team at teamshaileshjukaria@outlook.com. Please note that this action is irreversible and all your data will be permanently deleted.'
        }
      ]
    },
    {
      category: 'Technical Issues',
      questions: [
        {
          q: 'The verification link says it\'s expired. What do I do?',
          a: 'Verification links expire after 24 hours for security. Simply go to the login page and click "Resend Verification Email" to get a new link.'
        },
        {
          q: 'Image generation failed. What should I do?',
          a: 'Try these steps: 1) Check your internet connection 2) Ensure you have enough credits 3) Try a different prompt 4) Refresh the page. If the issue persists, contact support.'
        },
        {
          q: 'The website is loading slowly. How can I fix this?',
          a: 'Try clearing your browser cache and cookies, or use a different browser. If the issue continues, it might be temporary server congestion - please try again in a few minutes.'
        },
        {
          q: 'I made a payment but didn\'t receive credits. What now?',
          a: 'Don\'t worry! Payments can take up to 5 minutes to process. If credits don\'t appear after 10 minutes, contact teamshaileshjukaria@outlook.com with your transaction ID.'
        }
      ]
    },
    {
      category: 'Refunds & Policies',
      questions: [
        {
          q: 'What is your refund policy?',
          a: 'We offer refunds within 7 days of purchase if you haven\'t used any of the credits. Once credits are used, they are non-refundable. Please see our full Refund Policy for details.'
        },
        {
          q: 'Can I get a refund if I\'m not satisfied?',
          a: 'Yes, if you haven\'t used any credits and it\'s within 7 days of purchase, you can request a full refund by contacting teamshaileshjukaria@outlook.com with your order details.'
        },
        {
          q: 'How long do refunds take to process?',
          a: 'Approved refunds are processed within 5-7 business days and will be credited back to your original payment method.'
        }
      ]
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const filteredFAQs = searchQuery
    ? faqs.map(category => ({
        ...category,
        questions: category.questions.filter(
          item =>
            item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqs;

  return (
    <div className='min-h-screen py-10'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-5xl mx-auto'
      >
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>Help Desk 💡</h1>
          <p className='text-gray-600 text-lg'>Find answers to common questions and get help</p>
        </div>

        {/* Search Bar */}
        <div className='mb-10'>
          <div className='relative max-w-2xl mx-auto'>
            <input
              type='text'
              placeholder='Search for help...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full px-6 py-4 rounded-full border-2 border-orange-200 focus:border-orange-500 outline-none text-gray-700 pr-12'
            />
            <span className='absolute right-5 top-1/2 transform -translate-y-1/2 text-orange-500 text-xl'>🔍</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='grid md:grid-cols-3 gap-6 mb-12'>
          <Link to='/company-info#contact' className='bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl hover:shadow-xl transition-shadow text-center'>
            <div className='text-4xl mb-3'>📧</div>
            <h3 className='font-bold text-lg mb-2'>Email Support</h3>
            <p className='text-sm opacity-90'>Get help via email</p>
          </Link>
          <Link to='/company-info#about' className='bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl hover:shadow-xl transition-shadow text-center'>
            <div className='text-4xl mb-3'>ℹ️</div>
            <h3 className='font-bold text-lg mb-2'>About Us</h3>
            <p className='text-sm opacity-90'>Learn about Imaginova</p>
          </Link>
          <Link to='/company-info#trust' className='bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl hover:shadow-xl transition-shadow text-center'>
            <div className='text-4xl mb-3'>🔒</div>
            <h3 className='font-bold text-lg mb-2'>Trust Center</h3>
            <p className='text-sm opacity-90'>Security & Privacy</p>
          </Link>
        </div>

        {/* FAQs */}
        <div className='bg-white rounded-2xl shadow-lg p-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Frequently Asked Questions</h2>
          
          {filteredFAQs.map((category, catIndex) => (
            <div key={catIndex} className='mb-8'>
              <h3 className='text-2xl font-bold text-orange-500 mb-4 flex items-center gap-2'>
                <span className='w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm'>
                  {catIndex + 1}
                </span>
                {category.category}
              </h3>
              <div className='space-y-3'>
                {category.questions.map((faq, qIndex) => {
                  const globalIndex = `${catIndex}-${qIndex}`;
                  const isOpen = openFAQ === globalIndex;
                  
                  return (
                    <div key={qIndex} className='border border-gray-200 rounded-xl overflow-hidden'>
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className='w-full px-6 py-4 text-left hover:bg-orange-50 transition-colors flex justify-between items-center'
                      >
                        <span className='font-semibold text-gray-800 pr-4'>{faq.q}</span>
                        <span className={`text-orange-500 text-xl transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className='px-6 pb-4 text-gray-600 bg-orange-50'
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredFAQs.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-gray-500 text-lg'>No results found for "{searchQuery}"</p>
              <p className='text-gray-400 mt-2'>Try searching with different keywords or contact our support team</p>
            </div>
          )}
        </div>

        {/* Still Need Help */}
        <div className='mt-12 bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-2xl text-white text-center'>
          <h2 className='text-2xl font-bold mb-4'>Still Need Help?</h2>
          <p className='mb-6 opacity-90'>Can't find what you're looking for? Our support team is here to help!</p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link to='/company-info#contact' className='bg-white text-orange-500 px-8 py-3 rounded-full hover:bg-orange-50 transition-colors font-semibold'>
              Contact Support
            </Link>
            <a href='mailto:teamshaileshjukaria@outlook.com' className='bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-orange-500 transition-colors font-semibold'>
              Email Us
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Helpdesk;
