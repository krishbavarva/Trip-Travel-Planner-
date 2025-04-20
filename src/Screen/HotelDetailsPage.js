import React, { useState } from "react";
import AdventureFinder from "./EventPage";

export default function HotelDetailsPage({
  hotelDetailData,
  setHotelDetailPage,
  storedPrices,
  adults,
  children,
  totalDays,
  checkInDate,
  checkOutDate,
  setBookingData
}) {
  const [event, setEvent] = useState(false);
  const [showBookingPage, setShowBookingPage] = useState(false);
  const [bookingDetail, setBookingDetail] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!hotelDetailData) {
    return (
      <div className="text-center text-gray-400 mt-10">
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

  const calculateTotalPrice = () => {
    const rawPrice = hotelDetailData.total_rate?.lowest || "0";
    const hotelPrice = parseFloat(rawPrice.replace(/[^\d.]/g, "")) || 0;

    const numberOfRooms = adults > 3 ? Math.ceil(adults / 2) : 1;
    return totalDays * hotelPrice * numberOfRooms;
  };

  const confirmBook = () => {
    const bookingDetails = {
      hotelName: hotelDetailData.name,
      hotelImage: hotelDetailData.images?.[0]?.original_image,
      hotelPrice: hotelDetailData.total_rate?.lowest,
      checkInDate,
      checkOutDate,
      adults,
      children,
      totalDays,
      totalPrice: calculateTotalPrice(),
    };
    
    // Call setBookingData as a function to update the parent state
    setBookingData(prevBookings => [...prevBookings, bookingDetails]);
    setBookingDetail(bookingDetails);
    setBookingConfirmed(true);
  };

  return (
    <>
      {event ? (
        <AdventureFinder
          latitude={hotelDetailData.gps_coordinates?.latitude}
          longitude={hotelDetailData.gps_coordinates?.longitude}
          setEvent={setEvent}
        />
      ) : showBookingPage ? (
        <div className="w-full max-w-5xl mx-auto p-6 bg-[#1A1A1A] shadow-lg rounded-lg mt-10 text-white">
          {/* Booking Details */}
          <h1 className="text-3xl font-bold mb-6">Booking Details</h1>

          <div className="mb-6">
            <p className="text-lg text-gray-300">
              <strong>Hotel:</strong> {hotelDetailData.name}
            </p>
            <p className="text-lg text-gray-300">
              <strong>Check-in Date:</strong> {checkInDate}
            </p>
            <p className="text-lg text-gray-300">
              <strong>Check-out Date:</strong> {checkOutDate}
            </p>
            <p className="text-lg text-gray-300">
              <strong>Adults:</strong> {adults}
            </p>
            <p className="text-lg text-gray-300">
              <strong>Children:</strong> {children}
            </p>
            <p className="text-lg text-gray-300">
              <strong>Total Days:</strong> {totalDays}
            </p>
            <p className="text-lg text-gray-300">
              <strong>Price per Day:</strong> {hotelDetailData.total_rate?.lowest || "0"}
            </p>
            <p className="text-lg text-gray-300">
              <strong>Total Price:</strong> ₹{calculateTotalPrice()}
            </p>
          </div>

          {/* Confirmation Button */}
          <div className="flex justify-center mt-6">
            <button
              className={`bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg ${
                bookingConfirmed && "opacity-50 cursor-not-allowed"
              }`}
              onClick={confirmBook}
              disabled={bookingConfirmed}
            >
              Confirm Booking
            </button>
          </div>

          {/* Success Message */}
          {bookingConfirmed && (
            <div className="text-center text-green-500 font-semibold text-lg mt-4">
              Booking Confirmed Successfully! You can now go back and book more hotels for your trip.
            </div>
          )}

          {/* Go Back Button */}
          <button
            onClick={() => {
              if (bookingConfirmed) {
                setHotelDetailPage(false);
              } else {
                setShowBookingPage(false);
              }
            }}
            className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg"
          >
            {bookingConfirmed ? "Return to Hotel Search" : "Go Back"}
          </button>
        </div>
      ) : (
        <div className="w-full max-w-5xl mx-auto p-6 bg-[#1A1A1A] shadow-lg rounded-lg mt-10 text-white">
          {/* Hotel Name */}
          <h1 className="text-3xl font-bold mb-6 border-b border-gray-600 pb-2">
            {hotelDetailData.name}
          </h1>

          {/* Hotel Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {hotelDetailData.images?.slice(0, 4).map((img, index) => (
              <img
                key={index}
                src={img.original_image}
                alt="Hotel"
                className="w-full h-56 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>

          {/* Hotel Price & Ratings */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-xl font-semibold text-green-400">
              Price: {hotelDetailData.total_rate?.lowest || "N/A"}/Night
            </p>
            <p className="text-gray-300">
              ⭐ {hotelDetailData.overall_rating || "N/A"} / 5 (
              {hotelDetailData.reviews || 0} reviews)
            </p>
          </div>

          {/* Essential Info */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">
              Essential Information
            </h2>
            <ul className="list-disc list-inside text-gray-400">
              {hotelDetailData.essential_info?.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">
              Amenities
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {hotelDetailData.amenities?.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-green-700 text-white text-sm px-3 py-1 rounded-lg"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Excluded Amenities */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">
              Excluded Amenities
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {hotelDetailData.excluded_amenities?.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-red-700 text-white text-sm px-3 py-1 rounded-lg"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Location & Map */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">
              Location
            </h2>
            <p className="text-gray-400">
              Latitude: {hotelDetailData.gps_coordinates?.latitude}
            </p>
            <p className="text-gray-400">
              Longitude: {hotelDetailData.gps_coordinates?.longitude}
            </p>
            <iframe
              className="w-full h-[400px] rounded-lg mt-3 shadow-md"
              src={`https://www.google.com/maps?q=${hotelDetailData.gps_coordinates?.latitude},${hotelDetailData.gps_coordinates?.longitude}&output=embed`}
              allowFullScreen
            ></iframe>
          </div>

          {/* Booking & Nearby Places Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <a
              href={hotelDetailData.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold text-center"
            >
              More Details
            </a>
            <button
              onClick={eventDetails}
              className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
            >
              Nearby Places
            </button>
          </div>

          {/* Book Hotel Button */}
          <button
            onClick={() => setShowBookingPage(true)}
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg"
          >
            Book Hotel
          </button>

          {/* Go Back Button */}
          <button
            onClick={GoToHotelPage}
            className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg"
          >
            Go Back
          </button>
        </div>
      )}
    </>
  );
}