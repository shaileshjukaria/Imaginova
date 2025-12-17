import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className='min-h-screen px-4 py-10 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Privacy Policy</h1>
      <div className='space-y-4 text-gray-700'>
        <p className='text-sm text-gray-500'>Last updated: December 17, 2025</p>
        
        <section>
          <h2 className='text-xl font-semibold mb-2'>Information We Collect</h2>
          <p>We collect information you provide directly to us when you create an account, including your name, email address, and payment information.</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-2'>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className='list-disc pl-6 space-y-1'>
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-2'>Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. Payment information is processed securely through Razorpay.</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-2'>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at support@imaginova.com</p>
        </section>
      </div>
    </div>
  )
}

export default PrivacyPolicy
