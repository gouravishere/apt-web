import React, { useState, useEffect } from "react";
import sparkle from "../../assets/icons/sparkle.svg";

const Carousel = ({ components, autoPlay = false, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
  };

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      const slideInterval = setInterval(nextSlide, interval);
      return () => clearInterval(slideInterval); // Cleanup interval on component unmount
    }
  }, [autoPlay, interval]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
    <div className="relative">
    <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {components.map((Component, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              {/* Render the component */}
              {Component}
            </div>
          ))}
        </div>
      </div>
      {/* <img src={sparkle} className="absolute -top-44 -right-32"/> */}
    </div>

      <img src={sparkle} alt="sparkle" className="absolute hidden lg:block  -top-32 -right-28" />

      {/* Dot Navigation */}
      <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {components?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-6 h-1 rounded-full ${
              currentIndex === index ? "bg-primary-500" : "bg-[#F3F3F3]"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
