import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import LocationPage from "./LocationPage";
import defaultPackages from "./DefaultPackage.json"; // Adjust the path if needed
import { Link } from "react-router-dom";


const travelCarouselImages = [
  "/images/wp6987774.jpg",
  "/images/Mountain-road-wallpaper-hd-wallpaper.jpg",
  "/images/LAVO-Ranger-led-Snowshoe-Walks_-1.jpg",
  "/images/image-9122019-b.jpg",
];

const travelDestinations = [
  {
    image: "https://source.unsplash.com/800x600/?beach",
    title: "Beach Paradise",
    description: "Relax and soak up the sun on the world's most beautiful beaches.",
  },
  {
    image: "https://source.unsplash.com/800x600/?mountains",
    title: "Mountain Escape",
    description: "Find peace and adventure in serene mountain landscapes.",
  },
  {
    image: "https://source.unsplash.com/800x600/?city",
    title: "Urban Adventures",
    description: "Explore bustling cities full of life and culture.",
  },
  {
    image: "https://source.unsplash.com/800x600/?forest",
    title: "Forest Retreat",
    description: "Reconnect with nature in lush, green forests.",
  },
];

const TravelPlannerHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [createTrip, setCreateTrip] = useState(false);
  const [packages, setPackages] = useState([]);
  
  useEffect(() => {
    // Check if the JSON data is correctly loaded and has the `packages` array
    if (defaultPackages && Array.isArray(defaultPackages.packages)) {
    setPackages(defaultPackages.packages); // Set the packages state to the array
    } else {
    console.error("Packages data is not an array or not available.");
    }
}, []);

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
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-300">
      {createTrip ? (
        <LocationPage setCreateTrip={setCreateTrip} />
      ) : (
        <>
          {/* Image Carousel */}
          <div className="relative w-full h-[70vh] overflow-hidden">
            <img
              src={travelCarouselImages[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-[80%] m-auto h-[90%] mt-[2%] object-cover rounded-3xl shadow-lg"
            />
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 p-3 rounded-full shadow-md hover:bg-teal-400 hover:text-black transition z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 p-3 rounded-full shadow-md hover:bg-teal-400 hover:text-black transition z-10"
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {travelCarouselImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-teal-400" : "bg-gray-600"}`}
                ></div>
              ))}
            </div>
          </div>

          {/* Hero Section */}
          <div className="text-center my-12">
            <h1 className="text-5xl md:text-6xl font-bold text-teal-400 drop-shadow-lg">
              Plan Your Dream Vacation
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              Discover, explore, and embark on unforgettable journeys.
            </p>
          </div>

          {/* Custom Trip Button */}
          <div className="w-full text-center my-8">
            <button
              className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-400 transition"
              onClick={() => setCreateTrip(true)}
            >
              Create Your Personal Trip
            </button>
          </div>

          {/* Top Destinations */}
          {/* <section className="w-[90%] mx-auto my-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-rose-400">
              Top Destinations
            </h2>
            <div className="flex gap-6 overflow-x-auto no-scrollbar">
              {travelDestinations.map((destination, index) => (
                <div
                  key={index}
                  className="min-w-[80%] md:min-w-[45%] lg:min-w-[30%] bg-gray-800 shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition"
                >
                  <img src={destination.image} alt={destination.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-2xl font-semibold text-teal-400 mb-2">
                      {destination.title}
                    </h3>
                    <p className="text-gray-400">{destination.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section> */}

          {/* Travel Packages */}
          <section className="w-[90%] mx-auto my-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-teal-400">
              Featured Travel Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.length > 0 ? (
              packages.map((pkg) => (
                <div
                key={pkg.id}
                className="bg-gray-700 bg-opacity-80 rounded-lg p-6 shadow-xl hover:shadow-2xl hover:bg-gray-600 transition-all duration-300 ease-in-out"
                >
                <h2 className="text-2xl font-bold text-white">{pkg.name}</h2>
                <p className="text-gray-300">Destination: {pkg.destination}</p>
                <p className="text-gray-300">Duration: {pkg.duration} days</p>
                <div className="mt-4">
                    <Link
                    to={`/package/${pkg.id}`}
                    className="px-8 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 hover:scale-105 transition-all duration-300"
                    >
                    View Details
                    </Link>
                </div>
                </div>
            ))
              ) : (
                <p className="text-center text-gray-400">No packages available at the moment.</p>
              )}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="w-[90%] mx-auto my-16 text-center">
            <h2 className="text-3xl font-bold text-amber-400 mb-4">
              Why Choose Our Travel Planner?
            </h2>
            <p className="text-lg text-gray-400">
              Our platform is designed to make travel planning effortless and enjoyable.
              From personalized recommendations to comprehensive itineraries, we ensure
              that every journey is memorable and hassle-free.
            </p>
          </section>

          {/* Best Locations */}
          <section className="w-[90%] mx-auto my-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-teal-400">
              Best Locations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {travelDestinations.map((destination, index) => (
                <div
                  key={index}
                  className="bg-gray-800 shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition"
                >
                  <img src={destination.image} alt={destination.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-rose-400 mb-2">
                      {destination.title}
                    </h3>
                    <p className="text-gray-400">{destination.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default TravelPlannerHome;
