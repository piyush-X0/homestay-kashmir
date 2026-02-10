import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including but not limited to:
          </p>
          <ul className="list-disc pl-6">
            <li>Name and contact information</li>
            <li>Payment details</li>
            <li>Booking history</li>
            <li>Communication preferences</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p>
            Your information is used to provide and improve our services, process transactions, and communicate with you about your bookings.
          </p>
        </section>

        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default Privacy;