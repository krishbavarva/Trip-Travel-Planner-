import React, { useState } from "react";
import FindTransportation from "./Transpotation";

const LocationPage = ({ setCreateTrip }) => {
  const [location, setLocation] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [hotelPage, setHotelPage] = useState(false);

  const handleSearch = () => {
    setHotelPage(true);
  };

  const goBack = () => {
    setCreateTrip(false);
  };

  return (
    <>
      {hotelPage ? (
        <FindTransportation
          location={location}
          adults={adults}
          children={children}
          setHotelPage={setHotelPage}
        />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96 text-center">
            <h1 className="text-3xl font-bold text-cyan-400 mb-4">
              Enter Your Location
            </h1>
            <input
              type="text"
              placeholder="Enter city or location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md mb-4"
            />
            <input
              type="number"
              placeholder="Number of Adults"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md mb-4"
            />
            <input
              type="number"
              placeholder="Number of Children"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md mb-4"
            />
            <button
              onClick={handleSearch}
              className="mt-4 w-full px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300"
            >
              Search
            </button>
            <button
              onClick={goBack}
              className="mt-4 w-full px-6 py-3 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationPage;
