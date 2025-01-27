import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const travelCarouselImages = [
  "/images/wp6987774.jpg",
  "/images/Mountain-road-wallpaper-hd-wallpaper.jpg",
  "/images/LAVO-Ranger-led-Snowshoe-Walks_-1.jpg",
  "/images/image-9122019-b.jpg"
];

const travelDestinations = [
  {
    image: "https://source.unsplash.com/800x600/?beach",
    title: "Beach Paradise",
    description: "Relax and soak up the sun on the world's most beautiful beaches."
  },
  {
    image: "https://source.unsplash.com/800x600/?mountains",
    title: "Mountain Escape",
    description: "Find peace and adventure in serene mountain landscapes."
  },
  {
    image: "https://source.unsplash.com/800x600/?city",
    title: "Urban Adventures",
    description: "Explore bustling cities full of life and culture."
  },
  {
    image: "https://source.unsplash.com/800x600/?forest",
    title: "Forest Retreat",
    description: "Reconnect with nature in lush, green forests."
  }
];

const TravelPlannerHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? travelCarouselImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === travelCarouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full bg-gradient-to-br from-teal-50 via-rose-100 to-amber-50">
      {/* Image Carousel Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <img
          src={travelCarouselImages[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-[80%] m-auto  h-[90%] mt-[2%] object-cover rounded-3xl"
        />
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-teal-500 hover:text-white transition-colors z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-teal-500 hover:text-white transition-colors z-10"
        >
          <ChevronRight size={24} />
        </button>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2  z-10">
          {travelCarouselImages.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-teal-500" : "bg-white"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[30vh] overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg mb-2">
            Plan Your Dream Vacation
          </h1>
          <p className="text-xl md:text-2xl drop-shadow-md">
            Discover, explore, and embark on unforgettable journeys.
          </p>
        </div>
      </div>

      {/* Carousel Section */}
      <section className="w-[90%] mx-auto my-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-rose-600">
          Top Destinations
        </h2>
        <div className="relative">
          <div className="flex gap-4 overflow-x-scroll no-scrollbar">
            {travelDestinations.map((destination, index) => (
              <div
                key={index}
                className="min-w-[80%] md:min-w-[45%] lg:min-w-[30%] bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform group"
              >
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-2xl font-semibold text-teal-700 mb-2">
                    {destination.title}
                  </h3>
                  <p className="text-gray-600">{destination.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-teal-500 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-teal-500 hover:text-white transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Description Section */}
      <section className="w-[90%] mx-auto my-16 text-center">
        <h2 className="text-3xl font-bold text-amber-600 mb-4">
          Why Choose Our Travel Planner?
        </h2>
        <p className="text-lg text-gray-700">
          Our platform is designed to make travel planning effortless and enjoyable. From
          personalized recommendations to comprehensive itineraries, we ensure that every
          journey is memorable and hassle-free.
        </p>
      </section>

      {/* Best Locations Section */}
      <section className="w-[90%] mx-auto my-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-teal-600">
          Best Locations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {travelDestinations.map((destination, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-2xl overflow-hidden group hover:scale-105 transition-transform"
            >
              <img
                src={destination.image}
                alt={destination.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-rose-600 mb-2">
                  {destination.title}
                </h3>
                <p className="text-gray-700">{destination.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-teal-500 to-rose-500 text-white py-8">
        <div className="w-[90%] mx-auto text-center">
          <p className="text-lg font-semibold">
            © 2025 Travel Planner. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TravelPlannerHome;
