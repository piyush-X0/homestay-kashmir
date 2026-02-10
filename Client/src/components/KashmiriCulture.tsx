import React from 'react';

const KashmiriCulture = () => {
  const culturalElements = [
    {
      title: "Traditional Wazwan",
      image: "https://dialkashmir.com/blog/wp-content/uploads/2016/02/1470414_593308084062863_677391955_n.jpg",
      description: "Experience authentic Kashmiri cuisine, including the royal feast of Wazwan"
    },
    {
      title: "Pashmina Crafts",
      image: "https://plus.unsplash.com/premium_photo-1679852311462-733ae167dbc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8UGFzaG1pbmElMjBDcmFmdHN8ZW58MHx8MHx8fDA%3D",
      description: "Discover the intricate artistry of handwoven Pashmina shawls"
    },
    {
      title: "Shikara Rides",
      image: "https://www.carrentalsrinagar.com/wp-content/uploads/2023/06/Book-Shikara-Ride-in-Dal-Lake-1.webp",
      description: "Glide through the serene waters of Dal Lake in traditional wooden boats"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Experience Authentic Kashmiri Culture
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {culturalElements.map((element, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover-glow"
            >
              <div className="relative h-80">
                <img
                  src={element.image}
                  alt={element.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{element.title}</h3>
                    <p className="text-sm opacity-90">{element.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-2">🏔️</div>
            <div className="font-semibold">Mountain Views</div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-2">🍵</div>
            <div className="font-semibold">Kahwa Tea</div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-2">🏺</div>
            <div className="font-semibold">Local Crafts</div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-2">🌺</div>
            <div className="font-semibold">Saffron Fields</div>
          </div>
        </div>

        {/* Traditional Pattern */}
        <div className="mt-16 p-8 bg-white rounded-2xl shadow-lg">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20"></div>
            <div className="relative text-center p-8">
              <h3 className="text-2xl font-bold mb-4">Discover Kashmir's Rich Heritage</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Immerse yourself in centuries-old traditions, from the warmth of Kashmiri hospitality to the intricate artistry of local crafts. Each stay offers a unique glimpse into the valley's cultural tapestry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KashmiriCulture;