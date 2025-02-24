import React, { useState } from "react";
import Hotels from "./HotelPage";

const LocationPage = () => {
  const [location, setLocation] = useState("");
  const [hotelPage, setHotelPage] = useState(false);

  const handleSearch = () => {
    setHotelPage(true);
    // Add your search functionality here
  };

  return (
    <>
      {hotelPage ? (
        <Hotels location={location} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">Enter Your Location</h1>
          <input
            type="text"
            placeholder="Enter city or location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>
      )}
    </>
  );
};

export default LocationPage;
