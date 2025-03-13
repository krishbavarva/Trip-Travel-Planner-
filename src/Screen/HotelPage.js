import { useState } from "react";
import axios from "axios";
import HotelDetailsPage from "./HotelDetailsPage";
import WeatherDetails from "./WeatherDetail";

export default function Hotels({ location, setFindHotel }) {
  const [destination, setDestination] = useState(location || "");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [hotelData, setHotelData] = useState([]);
  const [hotelDetailPage, setHotelDetailPage] = useState(false);
  const [weatherCheck, setWeatherCheck] = useState(false);
  const [hotelList, setHotelList] = useState(false);
  const [hotelDetailData, setHotelDetailData] = useState("");

  const fetchingHotels = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5007/api",
        {
          destinationName: destination,
          check_in_dateName: checkInDate,
          check_out_dateName: checkOutDate,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setHotelData(response?.data?.properties || []);
      setHotelDetailPage(false);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6 w-[80%] sm:w-[95%] mx-auto text-white">
      {!hotelDetailPage && (
        <>
          <form
            onSubmit={fetchingHotels}
            className="w-full bg-gray-800 shadow-lg rounded-lg p-6 space-y-4 border border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-center">
              Find Your Dream Hotel
            </h2>

            <label className="block text-gray-300">Enter your destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your dream destination"
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              required
            />

            <label className="block text-gray-300">Check-in date</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              required
            />

            <label className="block text-gray-300">Check-out date</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg transition"
              onClick={() => {
                setWeatherCheck(false);
                setHotelList(true);
              }}
            >
              Find Hotels
            </button>
          </form>

          <button
            className="w-[95%] mt-6 bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg transition"
            onClick={() => {
              setWeatherCheck(true);
              setHotelList(false);
            }}
          >
            Weather Check
          </button>

          <button
            onClick={() => setFindHotel(false)}
            className="w-[95%] mt-6 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition"
          >
            Go Back
          </button>
        </>
      )}

      {weatherCheck && !hotelList && <WeatherDetails location={location} />}
      
      {hotelList && !weatherCheck && (
        <div className="w-full mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelData.map((hotel, key) => (
              <div
                key={key}
                className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 hover:shadow-xl transition"
              >
                <img
                  src={hotel?.images?.[0]?.original_image || "fallback-image.jpg"}
                  alt="Hotel"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <p className="text-lg font-semibold">{hotel.name || "Unnamed Hotel"}</p>
                <p className="text-gray-300">
                  Price: {hotel?.total_rate?.lowest || "N/A"}/Night
                </p>
                <button
                  className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition"
                  onClick={() => {
                    setHotelDetailPage(true);
                    setWeatherCheck(false);
                    setHotelList(false);
                    setHotelDetailData(hotel);
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {hotelDetailPage && !hotelList && !weatherCheck && (
        <HotelDetailsPage
          hotelDetailData={hotelDetailData}
          setHotelDetailPage={setHotelDetailPage}
        />
      )}
    </div>
  );
}
