// src/components/Hotels/HotelList.jsx
export default function HotelList({
    hotelData,
    setHotelDetailPage,
    setWeatherCheck,
    setHotelList,
    setHotelDetailData
  }) {
    return (
      <div className="w-full mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotelData.map((hotel, key) => (
            <div
              key={key}
              className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 hover:shadow-xl transition"
            >
              <img
                src={
                  hotel?.images?.[0]?.original_image || "fallback-image.jpg"
                }
                alt="Hotel"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <p className="text-lg font-semibold">
                {hotel.name || "Unnamed Hotel"}
              </p>
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
    );
  }