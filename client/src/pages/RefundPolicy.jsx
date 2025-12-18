import React from 'react'

const RefundPolicy = () => {
  return (
    <div className='min-h-screen px-4 py-10 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Refund Policy</h1>
      <div className='space-y-4 text-gray-700'>
        <p className='text-sm text-gray-500'>Last updated: December 17, 2025</p>
        
        <section>
          <h2 className='text-xl font-semibold mb-2'>General Policy</h2>
          <p>All credit purchases on Imaginova are final and non-refundable. Once credits are added to your account, they cannot be refunded or exchanged for cash.</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-2'>Exceptions</h2>
          <p>We may consider refund requests in the following exceptional circumstances:</p>
          <ul className='list-disc pl-6 space-y-1'>
            <li>Technical errors that prevented credit delivery</li>
            <li>Duplicate charges for the same transaction</li>
            <li>Service outages that prevented credit usage</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-2'>How to Request a Refund</h2>
          <p>If you believe you qualify for a refund under our exception policy, please contact us at teamshaileshjukaria@outlook.com within 7 days of purchase with:</p>
          <ul className='list-disc pl-6 space-y-1'>
            <li>Your transaction ID</li>
            <li>Detailed description of the issue</li>
            <li>Screenshots if applicable</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-2'>Processing Time</h2>
          <p>If a refund is approved, it will be processed within 7-10 business days to the original payment method.</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-2'>Contact</h2>
          <p>For refund inquiries, email us at teamshaileshjukaria@outlook.com</p>
        </section>
      </div>
    </div>
  )
}

export default RefundPolicy
