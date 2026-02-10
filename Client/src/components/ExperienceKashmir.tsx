import React from 'react';

const experiences = [
  {
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?fit=crop&w=800&h=500',
    title: 'Traditional Cuisine',
    description: 'Savor authentic Wazwan and local delicacies prepared by your hosts'
  },
  {
    image: 'https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?fit=crop&w=800&h=500',
    title: 'Cultural Activities',
    description: 'Participate in local crafts, music, and traditional activities'
  },
  {
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?fit=crop&w=800&h=500',
    title: 'Scenic Beauty',
    description: 'Wake up to breathtaking views of mountains, lakes, and valleys'
  }
];

const ExperienceKashmir = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Experience Kashmir</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Immerse yourself in the rich culture and natural beauty of Kashmir through authentic experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
            >
              <div className="relative h-96">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-3">{experience.title}</h3>
                  <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {experience.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="/experiences"
            className="inline-block px-8 py-3 bg-white text-gray-900 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore All Experiences
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExperienceKashmir;