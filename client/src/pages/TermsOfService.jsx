import React from 'react'

const TermsOfService = () => {
  return (
    <div className='min-h-screen px-4 py-10 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Terms of Service</h1>
      <div className='space-y-4 text-gray-700'>
        <p className='text-sm text-gray-500'>Last updated: December 17, 2025</p>
        
        <section>
          <h2 className='text-xl font-semibold mb-2'>Acceptance of Terms</h2>
          <p>By accessing and using Imaginova, you accept and agree to be bound by the terms and provisions of this agreement.</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-2'>Use of Service</h2>
          <p>You agree to use our service only for lawful purposes. You must not use our service:</p>
          <ul className='list-disc pl-6 space-y-1'>
            <li>In any way that violates any applicable law or regulation</li>
            <li>To generate inappropriate, offensive, or illegal content</li>
            <li>To infringe upon the rights of others</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-2'>Credits and Payments</h2>
          <p>Credits are purchased through our payment processor. All purchases are final and non-refundable unless required by law.</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-2'>Intellectual Property</h2>
          <p>Images generated using our service are owned by you. However, you grant us a license to use generated images for service improvement and marketing purposes.</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-2'>Limitation of Liability</h2>
          <p>We shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service.</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-2'>Contact</h2>
          <p>For questions about these Terms, contact us at support@imaginova.com</p>
        </section>
      </div>
    </div>
  )
}

export default TermsOfService
