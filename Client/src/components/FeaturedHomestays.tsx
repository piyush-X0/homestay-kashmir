import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Importing images
import jhs1 from './Images/jhs1.jpeg'; 
import ja2 from './Images/ja2.jpg';
import ja3 from './Images/ja3.jpg';
import ja4 from './Images/ja4.jpg';

import eeh1 from './Images/eeh1.jpg';
import eeh2 from './Images/eeh2.jpg';
import eeh3 from './Images/eeh3.jpg';
import eeh4 from './Images/eeh4.jpg';

import ad1 from './Images/ad1.jpeg';
import adh2 from './Images/adh2.jpg';
import ad3 from './Images/ad3.jpg';
import ad4 from './Images/ad4.jpg'; // Adjust if duplicate or incorrect

import aj1 from './Images/aj1.jpg';
import aj2 from './Images/aj2.jpg';
import aj3 from './Images/aj3.jpg';
import aj4 from './Images/aj4.jpg';

import alh1 from './Images/alh1.jpg';
import alh2 from './Images/alh2.jpg';
import alh3 from './Images/alh3.jpg';
import alh4 from './Images/alh4.jpg';

import ifc1 from './Images/ifc1.jpg';
import ifc2 from './Images/ifc2.jpg';
import ifc3 from './Images/ifc3.jpg';
import ifc4 from './Images/ifc4.jpg';

import gn1 from './Images/gn1.jpg';
import gn2 from './Images/gn2.jpg';
import gn3 from './Images/gn3.jpg';
import gn4 from './Images/gn4.jpg';

import khg1 from './Images/khg1.jpg';
import khg2 from './Images/khg2.jpg';
import khg3 from './Images/khg3.jpg';
import khg4 from './Images/khg4.jpg';

import mg1 from './Images/mg1.jpg';
import mg2 from './Images/mg2.jpg';
import mg3 from './Images/mg3.jpg';
import mg4 from './Images/mg4.jpg';

import abg1 from './Images/abg1.jpg';
import abg2 from './Images/abg2.jpg';
import abg3 from './Images/abg3.jpg';
import abg4 from './Images/abg4.jpg';

import phs1 from './Images/phs1.jpg';
import phs2 from './Images/phs2.jpg';
import phs3 from './Images/phs3.jpg';
import phs4 from './Images/phs4.jpg';

import mhs1 from './Images/mhs1.jpeg';
import mhs2 from './Images/mhs2.jpg';
import mhs3 from './Images/mhs3.jpg';
import mhs4 from './Images/mhs4.jpg';

import ahg1 from './Images/ahg1.jpg';
import ahg2 from './Images/ahg2.jpg';
import ahg3 from './Images/ahg3.jpg';
import ahg4 from './Images/ahg4.jpg';

import zhs1 from './Images/zhs1.jpg';
import zhs2 from './Images/zhs2.jpg';
import zhs3 from './Images/zhs3.jpg';
import zhs4 from './Images/zhs4.jpg';

import azg1 from './Images/azg1.jpg';
import azg2 from './Images/azg2.jpg';
import azg3 from './Images/azg3.jpg';
import azg4 from './Images/azg4.jpg';

import kvg1 from './Images/kvg1.jpg';
import kvg2 from './Images/kvg2.jpg';
import kvg3 from './Images/kvg3.jpg';
import kvg4 from './Images/kvg4.jpg';

import mal1 from './Images/mal1.jpg';
import mal2 from './Images/mal2.jpg';
import mal3 from './Images/mal3.jpg';
import mal4 from './Images/mal4.jpg';

import RE1 from './Images/RE1.jpg';
import RE2 from './Images/RE2.jpg';
import RE3 from './Images/RE3.jpg';
import RE4 from './Images/RE4.jpg'; 

import sr1 from './Images/sr1.jpg';
import sr2 from './Images/sr2.jpg';
import sr3 from './Images/sr3.jpg';
import sr4 from './Images/sr4.jpg';

// Homestay data
const homestays = [
  {
    images: [jhs1, ja2, ja3, ja4],
    title: 'Jasir Home Stay',
    location: 'Kokernag maih, Kashmir',
    price: '₹1,000/night',
    rating: 4.8,
    description: 'Experience luxury living by the serene Dal Lake with panoramic mountain views.',
    amenities: ['Lake View', 'Garden', 'Free WiFi', 'Traditional Breakfast'],
  },
  {
    images: [eeh1, eeh2, eeh3, eeh4],
    title: 'Eagle Eye Home Stay',
    location: 'Nagbal, Yusmarg, Kashmir',
    price: '₹1,000/night',
    rating: 4.9,
    description: 'Cozy mountain cottage with stunning views of snow-capped peaks.',
    amenities: ['Mountain View', 'Fireplace', 'Skiing Equipment', 'Room Service'],
  },
  {
    images: [aj1, aj2, aj3, aj4],
    title: 'Aijaz Homestay',
    location: 'Aharbal, Shopian, Kashmir',
    price: '₹1,000/night',
    rating: 4.9,
    description: 'Cozy mountain cottage with stunning views of snow-capped peaks.',
    amenities: ['Mountain View', 'Fireplace', 'Skiing Equipment', 'Room Service'],
  },
  {
    images: [ad1, adh2, ad3, ad4],
    title: 'Adnan Home Stay',
    location: 'Nagbal(B) Yusmarg, Kashmir',
    price: '₹1,000/night',
    rating: 4.7,
    description: 'Luxurious villa overlooking the beautiful Lidder Valley.',
    amenities: ['Valley View', 'Private Balcony', 'Heated Rooms', 'Restaurant'],
  },
  {
    images: [alh1, alh2, alh3, alh4],
    title: 'Al Huda Home Stay',
    location: 'Raiyar, Doodhpathri, Kashmir',
    price: '₹1,000/night',
    rating: 4.9,
    description: 'Serene lakeside cabin with picturesque views of crystal-clear waters.',
    amenities: ['Mountain View', 'Fireplace', 'Skiing Equipment', 'Room Service'],
  },
  {
    images: [ifc1, ifc2, ifc3, ifc4],
    title: 'Irfan Chandi Homes Homestay',
    location: 'Lolab,Kupwara , Kashmir',
    price: '₹1,000/night',
    rating: 4.7,
    description: 'Elegant garden villa surrounded by blooming flowers and vibrant greenery.',
    amenities: ['Valley View', 'Private Balcony', 'Heated Rooms', 'Restaurant'],
  },
  {
    images: [gn1, gn2, gn3, gn4],
    title: 'Garib Nawaz Homestay',
    location: 'Faqir Gujri Dara, Kashmir',
    price: '₹1,000/night',
    rating: 4.7,
    description: 'Cliffside retreat with dramatic views of rugged coastal cliffs.',
    amenities: ['Valley View', 'Private Balcony', 'Heated Rooms', 'Restaurant'],
  },
  {
    images: [khg1, khg2, khg3, khg4],
    title: 'Khatana Guest House',
    location: 'Faqir Gujri Dara, Kashmir',
    price: '₹1,000/night',
    rating: 4.7,
    description: 'Quaint alpine cabin with views of snow-dusted fir trees.',
    amenities: ['Valley View', 'Private Balcony', 'Heated Rooms', 'Restaurant'],
  },
   //
   {
    images: [mg1, mg2, mg3, mg4],
    title: 'Mehraj Guest House',
    location: 'Sonamarg, Kashmir',
    price: '₹1,000/night',
    rating: 4.7,
    description: 'Secluded jungle treehouse enveloped by exotic flora and fauna',
    amenities: ['Valley View', 'Private Balcony', 'Heated Rooms', 'Restaurant'],
  },
  //Khatana Guest House
  {
    images: [abg1, abg2, abg3, abg4],
    title: 'Abrar Guest House',
    location: 'Nagbal Yousmarg, Kashmir',
    price: '₹1,000/night',
    rating: 4.7,
    description: 'Historic castle stay with commanding views of the surrounding countryside',
    amenities: ['Valley View', 'Private Balcony', 'Heated Rooms', 'Restaurant'],
  },
  {
    images: [phs1, phs2, phs3, phs4],
    title: 'Paswal Home Stay',
    location: 'Nagbal Yousmarg, Kashmir',
    price: '₹1,000/night',
    rating: 4.7,
    description: 'Minimalist desert dome with expansive views of starry night skies.',
    amenities: ['Valley View', 'Private Balcony', 'Heated Rooms', 'Restaurant'],
  },
  {
    images: [mhs1, mhs2, mhs3, mhs4],
    title: 'Mohmood Home Stay',
    location: 'Nagbal Yousmarg, Kashmir',
    price: '₹1,000/night',
    rating: 4.7,
    description: 'Rustic stone cottage overlooking a babbling brook and open fields.',
    amenities: ['Valley View', 'Private Balcony', 'Heated Rooms', 'Restaurant'],
  },
  {
    images: [ahg1, ahg2, ahg3, ahg4],
    title: 'Ahanger Guest House',
    location: 'Nagbal Yousmarg, Kashmir',
    price: '₹1,000/night',
    rating: 4.7,
    description: 'Spacious mountain lodge with floor-to-ceiling windows showcasing the peaks.',
    amenities: ['Valley View', 'Private Balcony', 'Heated Rooms', 'Restaurant'],
  },
  {
    images: [azg1, azg2, azg3, azg4],
    title: 'Azla guest house',
    location: 'Kokernag, Kashmir',
    price: '₹1,000/night',
    rating: 4.7,
    description: 'Cozy Nordic cabin surrounded by the dancing Northern Lights.',
    amenities: ['Valley View', 'Private Balcony', 'Heated Rooms', 'Restaurant'],
  },
  {
    images: [zhs1, zhs2, zhs3, zhs4],
    title: 'Zubairs home stay',
    location: 'Nagbal Yousmarg, Kashmir',
    price: '₹1,000/night',
    rating: 4.7,
    description: 'Tropical beach hut with hammocks and uninterrupted sea views.',
    amenities: ['Valley View', 'Private Balcony', 'Heated Rooms', 'Restaurant'],
  },
  {
    images: [kvg1, kvg2, kvg3, kvg4],
    title: 'Knight View Guest House',
    location: 'Kokernag, Kashmir',
    price: '₹1,000/night',
    rating: 4.7,
    description: 'Warm hillside bungalow with sweeping vistas of terraced landscapes.',
    amenities: ['Valley View', 'Private Balcony', 'Heated Rooms', 'Restaurant'],
  },
  {
    images: [mal1, mal2, mal3, mal4],
    title: 'Malik Guest House',
    location: 'Kokernag, Kashmir',
    price: '₹1,000/night',
    rating: 4.7,
    description: 'Charming wooden lakehouse with a private dock and serene waters.',
    amenities: ['Valley View', 'Private Balcony', 'Heated Rooms', 'Restaurant'],
  },
  {
    images: [RE1, RE2, RE3, RE4],
    title: 'REVERWOOD HOME STAYe',
    location: 'Kokernag, Kashmir',
    price: '₹1,000/night',
    rating: 4.7,
    description: 'Picturesque hillside retreat overlooking terraced rice fields.',
    amenities: ['Valley View', 'Private Balcony', 'Heated Rooms', 'Restaurant'],
  },
  {
    images: [sr1, sr2, sr3, sr4],
    title: 'Sheesham Resort',
    location: 'Kokernag, Kashmir',
    price: '₹1,000/night',
    rating: 4.7,
    description: 'Secluded prairie cabin with golden sunsets and wide-open skies.',
    amenities: ['Valley View', 'Private Balcony', 'Heated Rooms', 'Restaurant'],
  }
];

// Image Carousel Component
const ImageCarousel = ({ images }: { images: string[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Slide ${index}`} className="w-full h-48 object-cover" />
        </div>
      ))}
    </Slider>
  );
};

// Featured Homestays Component
const FeaturedHomestays = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Featured Homestays</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {homestays.map((homestay, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <ImageCarousel images={homestay.images} />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{homestay.title}</h3>
              <p className="text-gray-600 mb-2">{homestay.location}</p>
              <p className="text-gray-700 text-sm mb-4">{homestay.description}</p>
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Amenities:</h4>
                <div className="flex flex-wrap gap-2">
                  {homestay.amenities.map((amenity, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-lg font-bold text-indigo-600">{homestay.price}</span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{homestay.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedHomestays;
