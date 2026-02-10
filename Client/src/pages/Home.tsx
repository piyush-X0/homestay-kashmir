import React from 'react';
import Hero from '../components/Hero';
import RoomFilter from '../components/RoomFilter';
import FeaturedHomestays from '../components/FeaturedHomestays';
import HowItWorks from '../components/HowItWorks';
import PopularDestinations from '../components/PopularDestinations';
import WhyChooseUs from '../components/WhyChooseUs';
import ExperienceKashmir from '../components/ExperienceKashmir';
import ReviewCarousel from '../components/ReviewCarousel';
import CallToAction from '../components/CallToAction';
import KashmiriCulture from '../components/KashmiriCulture';

const Home = () => {
  return (
    <>
      <Hero />
      <div className="container mx-auto px-4">
        <RoomFilter />
      </div>
      <KashmiriCulture />
      <FeaturedHomestays />
      <PopularDestinations />
      <HowItWorks />
      <WhyChooseUs />
      <ExperienceKashmir />
      <ReviewCarousel />
      <CallToAction />
    </>
  );
};

export default Home;