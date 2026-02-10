import React, { useEffect, useRef } from 'react';

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Delhi",
    review: "The hospitality was excellent, and the location was perfect for a peaceful getaway.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=100&h=100"
  },
  {
    id: 2,
    name: "Rishi Pathak",
    location: "Rewa",
    review: "A truly wonderful stay! The room was cozy, and the host made us feel at home.",
    rating: 4,
    image: "/src/components/Images/rishi.png"
  },
  {
    id: 3,
    name: "Mohammad Yunus",
    location: "Lucknow",
    review: "A serene and refreshing experience with top-notch service. Highly recommended!",
    rating: 5,
    image: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww"
  },
  {
    id: 4,
    name: "Ritika Yadav",
    location: "Jaipur",
    review: "Fantastic homestay with great amenities. The food was delicious too!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1596309405988-b16d9e2852c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluZGlhbiUyMHdvbWFufGVufDB8fDB8fHww"
  },
  {
    id: 5,
    name: "Alex Smith",
    location: "New York",
    review: "The perfect retreat for a relaxing vacation. The hosts were incredibly kind.",
    rating: 5,
    image: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 6,
    name: "Rock Selmon",
    location: "South Africa",
    review: "An unforgettable experience! The scenic beauty and warm hospitality stood out.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8fHww"
  },
  {
    id: 7,
    name: "Mehul Patel",
    location: "Varanasi",
    review: "The host's attention to detail made our stay truly memorable.",
    rating: 5,
    image: "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww"
  },
  {
    id: 8,
    name: "Adam Salroo",
    location: "London",
    review: "A delightful experience! The rooms were spotless, and the view was spectacular.",
    rating: 4,
    image: "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 9,
    name: "Emily Parker",
    location: "USA",
    review: "A slice of heaven on earth! The hospitality was outstanding.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=100&h=100"
  }
];


const ReviewCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const totalWidth = scrollContainer.scrollWidth;
    const containerWidth = scrollContainer.clientWidth;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 1;
      if (scrollPosition >= totalWidth - containerWidth) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
    };

    const intervalId = setInterval(scroll, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-gray-50 py-12">
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .scroll-container {
            animation: scroll 60s linear infinite;
          }
        `}
      </style>
      <h2 className="text-3xl font-bold text-center mb-8">What Our Guests Say</h2>
      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex space-x-6 scroll-container"
        >
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                  <p className="text-gray-600 text-sm">{review.location}</p>
                </div>
              </div>
              <p className="text-gray-700">{review.review}</p>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCarousel;