import React from 'react';
import { PlusCircle } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Host Your Property?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our community of hosts and start earning by sharing your space with travelers seeking authentic Kashmiri experiences
        </p>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2 mx-auto">
          <PlusCircle className="h-5 w-5" />
          <span>List Your Property</span>
        </button>
      </div>
    </section>
  );
};

export default CallToAction;