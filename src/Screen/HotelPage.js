import { useState } from "react";
import axios from "axios";
import HotelDetailsPage from "./HotelDetailsPage";
import LocationPage from "./LocationPage";
import WeatherDetails from "./WeatherDetail";

export default function Hotels({ location, setFindHotel }) {
  const [user, setUser] = useState(null);
  const [destination, setDestination] = useState(location || "");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [hotelData, setHotelData] = useState([]);
  const [hotelDetailPage, setHotelDetailPage] = useState(false);
  const [weatherCheck, setWeatheCheck] = useState(false);
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
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setHotelData(response?.data?.properties || []);
      setHotelDetailPage(false);
    } catch (error) {}
  };

  const WeatherInfo = () => {
    setWeatheCheck(true);
    setHotelList(false);
  };

  const HotelInfo = () => {
    setWeatheCheck(false);
    setHotelList(true);
  };

  const hotelDetails = (hotel) => {
    setHotelDetailPage(true);
    setWeatheCheck(false);
    setHotelList(false);
    setHotelDetailData(hotel);
  };

  const goBack = () => {
    setFindHotel(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 w-[80%] sm:w-[95%] mx-auto">
      {!hotelDetailPage && (
        <>
          <form
            onSubmit={fetchingHotels}
            className="w-full bg-white shadow-lg rounded-lg p-6 space-y-4"
          >
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Find Your Dream Hotel
            </h2>

            <label className="block text-gray-700">Enter your destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your dream destination"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <label className="block text-gray-700">Check-in date</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <label className="block text-gray-700">Check-out date</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
              onClick={HotelInfo}
            >
              Find Hotels
            </button>
          </form>
          <button
            type="submit"
            className="w-[95%] mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
            onClick={WeatherInfo}
          >
            Weather check
          </button>
          <button
            onClick={goBack}
            className="w-[95%] mt-6 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg"
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
                className="bg-white p-4 rounded-lg shadow-md border border-gray-300 hover:shadow-xl transition"
              >
                <img
                  src={hotel?.images?.[0]?.original_image || "fallback-image.jpg"}
                  alt="Hotel"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <p className="text-lg font-semibold text-gray-800">
                  {hotel.name || "Unnamed Hotel"}
                </p>
                <p className="text-gray-700">
                  Price: {hotel?.total_rate?.lowest || "N/A"}/Night
                </p>
                <button
                  className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                  onClick={() => hotelDetails(hotel)}
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
