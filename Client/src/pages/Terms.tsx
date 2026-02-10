import React from 'react';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using AlpineStay's services, you agree to be bound by these Terms and Conditions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Booking and Cancellation</h2>
          <ul className="list-disc pl-6">
            <li>All bookings are subject to availability and confirmation</li>
            <li>Cancellation policies vary by property</li>
            <li>Refunds are processed within 7-14 business days</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <p>
            Users must provide accurate information and follow local regulations during their stay.
          </p>
        </section>

        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default Terms;