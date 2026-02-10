import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const beamRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const beam = beamRef.current;
    if (!beam) return;

    const colors = [
      'from-blue-950/90 via-blue-900/80 to-indigo-900/90',
      'from-indigo-950/90 via-purple-900/80 to-blue-900/90',
      'from-purple-950/90 via-indigo-900/80 to-violet-900/90'
    ];
    let colorIndex = 0;
    let position = 0;
    const maxPosition = 100;
    let direction = 1;
    let isMoving = true;

    const animate = () => {
      if (!isMoving) return;

      position += direction * 0.5;
      beam.style.backgroundPosition = `${position}% 50%`;

      if (position >= maxPosition) {
        direction = -1;
        isMoving = false;
        setTimeout(() => {
          colorIndex = (colorIndex + 1) % colors.length;
          beam.className = `absolute inset-0 bg-gradient-to-br ${colors[colorIndex]} transition-colors duration-1000`;
          setTimeout(() => {
            isMoving = true;
          }, 2000);
        }, 2000);
      } else if (position <= 0) {
        direction = 1;
        isMoving = false;
        setTimeout(() => {
          colorIndex = (colorIndex + 1) % colors.length;
          beam.className = `absolute inset-0 bg-gradient-to-br ${colors[colorIndex]} transition-colors duration-1000`;
          setTimeout(() => {
            isMoving = true;
          }, 2000);
        }, 2000);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1566837497312-7be4a47b6ec7?auto=format&fit=crop&w=2000&q=80")',
        }}
      ></div>

      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1566837497312-7be4a47b6ec7?auto=format&fit=crop&w=2000&q=80"
        >
          <source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-a-mountain-valley-5297/1080p.mp4" type="video/mp4" />
        </video>
        <div ref={beamRef} className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-900/80 to-indigo-900/90"></div>
      </div>

      {/* Animated Stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Content */}
      <div className="relative text-center text-white px-4 max-w-4xl mx-auto">
        <div className="relative py-12 px-6 rounded-xl backdrop-blur-sm bg-gradient-to-r from-blue-950/30 to-gray-900/30">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_50%)] animate-title">
            Experience Kashmir Like Never Before
          </h1>
          <p className="text-xl md:text-2xl mb-8 [text-shadow:_1px_1px_2px_rgb(0_0_0_/_50%)] animate-subtitle">
            Find your perfect homestay in the paradise on Earth
          </p>
          <a 
            href="/rooms"
            className="inline-block bg-gradient-to-r from-indigo-600 to-blue-700 text-white px-8 py-3 rounded-md font-semibold hover:from-indigo-700 hover:to-blue-800 transition-all duration-300 shadow-lg animate-button"
          >
            Explore Homestays
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>

      {/* Mouse-sensitive Parallax Effect */}
      <div className="absolute inset-0 pointer-events-none parallax-container">
        <div className="parallax-layer" data-depth="0.2"></div>
        <div className="parallax-layer" data-depth="0.4"></div>
        <div className="parallax-layer" data-depth="0.6"></div>
      </div>
    </section>
  );
};

export default Hero;