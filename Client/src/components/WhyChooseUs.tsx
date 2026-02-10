import React from 'react';
import { Shield, Users, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Verified Homestays',
    description: 'All properties are personally verified for quality and safety standards'
  },
  {
    icon: Users,
    title: 'Local Experience',
    description: 'Connect with local hosts and experience authentic Kashmiri culture'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for a worry-free stay'
  },
  {
    icon: Award,
    title: 'Best Price Guarantee',
    description: 'Get the best rates with our price match guarantee'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose HomeStayKashmir</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best homestay experience in Kashmir, combining comfort, authenticity, and reliability
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-indigo-100">
                <feature.icon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;