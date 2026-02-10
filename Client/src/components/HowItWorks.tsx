import React from 'react';
import { Search, Calendar, Home } from 'lucide-react';

const steps = [
  {
    title: 'Search',
    description: 'Browse through our curated list of homestays across Kashmir',
    icon: Search,
  },
  {
    title: 'Book',
    description: 'Select your perfect stay and book with secure payment',
    icon: Calendar,
  },
  {
    title: 'Experience',
    description: 'Enjoy authentic Kashmiri hospitality and create memories',
    icon: Home,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center bg-white p-8 rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-indigo-100">
                <step.icon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;