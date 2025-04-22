import React, { useState, useEffect, useRef } from "react";
import FindTransportation from "./Transpotation";

const LocationPage = ({ setCreateTrip }) => {
  const [location, setLocation] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [hotelPage, setHotelPage] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const suggestionsRef = useRef(null);

  const handleSearch = () => {
    setHotelPage(true);
  };

  const goBack = () => {
    setCreateTrip(false);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 1) {
      setIsLoading(true);
      try {
        // MapBox Geocoding API
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?types=place&access_token=pk.eyJ1Ijoia3Jpc2hiYXZhcnZhIiwiYSI6ImNtOXFib2hqbjFlYWwyanNhcXFwNjE3Zm4ifQ.H7eRMUwsnLiB507EmQSpVQ`
        );
        const data = await response.json();
        setSuggestions(data.features || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setSuggestions([]);
      }
      setIsLoading(false);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (place) => {
    setLocation(place.place_name);
    setInputValue(place.place_name);
    setSuggestions([]);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter city or location"
                value={inputValue}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md mb-4"
              />
              {isLoading && (
                <div className="absolute right-3 top-3">
                  <svg className="animate-spin h-5 w-5 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
              {suggestions.length > 0 && (
                <div 
                  ref={suggestionsRef} 
                  className="absolute z-10 w-full bg-gray-700 border border-gray-600 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto"
                >
                  {suggestions.map((place) => (
                    <div
                      key={place.id}
                      className="px-4 py-2 hover:bg-gray-600 cursor-pointer text-left"
                      onClick={() => handleSelectSuggestion(place)}
                    >
                      {place.place_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
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
              disabled={!location}
              className={`mt-4 w-full px-6 py-3 ${!location ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'} text-white rounded-lg shadow-lg transition-all duration-300`}
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