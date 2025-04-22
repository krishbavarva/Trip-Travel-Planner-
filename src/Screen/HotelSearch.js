// src/components/Hotels/HotelSearch.jsx
export default function HotelSearch({
    destination,
    setDestination,
    checkInDate,
    checkOutDate,
    handleCheckInDateChange,
    handleCheckOutDateChange,
    fetchingHotels,
    setWeatherCheck,
    setHotelList
  }) {
    return (
      <form
        onSubmit={fetchingHotels}
        className="w-full bg-gray-800 shadow-lg rounded-lg p-6 space-y-4 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-center">
          Find Your Dream Hotel
        </h2>
  
        <label className="block text-gray-300">
          Enter your destination
        </label>
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
          onChange={handleCheckInDateChange}
          className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
          required
        />
  
        <label className="block text-gray-300">Check-out date</label>
        <input
          type="date"
          value={checkOutDate}
          onChange={handleCheckOutDateChange}
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
    );
  }