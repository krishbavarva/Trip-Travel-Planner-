import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

import LocationPage from "./LocationPage";

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
    description:
      "Relax and soak up the sun on the world's most beautiful beaches.",
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
  const [accommodations, setAccommodations] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createTrip, setCreateTrip] = useState(false);
  useEffect(() => {
    const fetchAccommodations = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=man",
          {
            //  params: {
            //    city: location,
            //    checkin_date: checkInDate,
            //    checkout_date: checkOutDate,
            //    guests_number: guests,
            //    page: 0, // Starting page for pagination
            //    filter_by_currency: "INR", // Currency set to Indian Rupees
            //  },
            headers: {
              "X-RapidAPI-Key":
                "b85f3f9f6bmsh628c0cb5c3646e5p14bee7jsned38c83e277", // Replace with your API key
              "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
            },
          }
        );

        // Limiting the results to 5
        setAccommodations(response.data.result.slice(0, 5));
      } catch (err) {
        console.error("Error fetching accommodations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);
  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
          {
            params: {
              limit: 10, // Number of cities to fetch
              countryIds: "IN", // Optional: Specify country (e.g., "IN" for India)
              namePrefix: "A", // Optional: Filter cities starting with 'A'
            },
            headers: {
              "X-RapidAPI-Key":
                "b85f3f9f6bmsh628c0cb5c3646e5p14bee7jsned38c83e2777",
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
          }
        );
        console.log(response, "response");
        if (response?.status === 200) {
          setCities(response?.data?.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchCities();
  }, []);
  console.log(cities, "city");

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

  const customeTrip = () => {
    setCreateTrip(true);
  };
  return (
    <div className="w-full bg-gradient-to-br from-teal-50 via-rose-100 to-amber-50">
      {createTrip ? (
        <LocationPage />
      ) : (
        <>
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
          {/* costome trip plan */}
          <div className="w-full text-center my-8">
            <button
              className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-600 transition"
              onClick={customeTrip}
            >
              Create Your Personal Trip
            </button>
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
              Our platform is designed to make travel planning effortless and
              enjoyable. From personalized recommendations to comprehensive
              itineraries, we ensure that every journey is memorable and
              hassle-free.
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
          {/*city */}
          <div className="p-6 ">
            <h1 className="text-2xl font-bold mb-4 text-center">
              GeoDB Cities Finder
            </h1>
            {loading ? (
              <p className="text-center text-teal-500">Loading cities...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cities &&
                  cities?.map((c) => (
                    <div
                      key={c.id}
                      className=" p-4 rounded shadow hover:scale-105 transition-transform"
                    >
                      <h2 className="text-lg font-bold text-teal-700">
                        {c.name}, {c.country}
                      </h2>
                      <p className="text-gray-600">Region: {c.region}</p>
                      {/* <p className="text-gray-600">Population: {c.population}</p> */}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </>
      )}
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
