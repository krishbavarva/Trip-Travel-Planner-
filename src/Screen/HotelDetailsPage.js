import React, { useState } from "react";
import AdventureFinder from "./EventPage";

export default function HotelDetailsPage({
  hotelDetailData,
  setHotelDetailPage,
}) {
  const [event, setEvent] = useState(false);
  console.log(hotelDetailData);
  if (!hotelDetailData) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No hotel details available.
      </div>
    );
  }
  const GoToHotelPage = () => {
    setHotelDetailPage(false);
  };
  const eventDetails = () => {
    setEvent(true);
  };

  return (
    <>
      {event ? (
        <AdventureFinder
          latitude={hotelDetailData.gps_coordinates?.latitude}
          longitude={hotelDetailData.gps_coordinates?.longitude}
          setEvent={setEvent}
        />
      ) : (
        <div className="w-full max-w-[95%] sm:max-w-[80%] lg:max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
          {/* Hotel Name */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {hotelDetailData.name}
          </h1>

          {/* Hotel Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {hotelDetailData.images?.slice(0, 4).map((img, index) => (
              <img
                key={index}
                src={img.original_image}
                alt="Hotel"
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>

          {/* Hotel Price & Ratings */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-semibold text-blue-600">
              Price: {hotelDetailData.total_rate?.lowest}/Night
            </p>
            <p className="text-gray-700">
              ⭐ {hotelDetailData.overall_rating} / 5 ({hotelDetailData.reviews}{" "}
              reviews)
            </p>
          </div>

          {/* Essential Info */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Essential Information
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              {hotelDetailData.essential_info?.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Amenities
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {hotelDetailData.amenities?.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-lg"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Excluded Amenities */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Excluded Amenities
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {hotelDetailData.excluded_amenities?.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-lg"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Location & Map */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Location
            </h2>
            <p className="text-gray-700">
              Latitude: {hotelDetailData.gps_coordinates?.latitude}
            </p>
            <p className="text-gray-700">
              Longitude: {hotelDetailData.gps_coordinates?.longitude}
            </p>
            <iframe
              className="w-full h-[600px] rounded-lg mt-2"
              src={`https://www.google.com/maps?q=${hotelDetailData.gps_coordinates?.latitude},${hotelDetailData.gps_coordinates?.longitude}&output=embed`}
              allowFullScreen
            ></iframe>
          </div>

          {/* Booking Link */}
          <div className="text-center mt-6">
            <a
              href={hotelDetailData.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
            >
              More details
            </a>
            <button
              onClick={eventDetails}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
            >
              Near by places
            </button>
          </div>
          <button
            onClick={GoToHotelPage}
            className="w-[60%] mt-6 mx-[20%] bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg"
          >
            go back
          </button>
        </div>
      )}
    </>
  );
}
