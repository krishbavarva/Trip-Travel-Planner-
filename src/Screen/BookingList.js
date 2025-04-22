import { useState, useEffect } from "react";

export default function BookingsList({
  bookingData = [],
  deleteBooking = () => {},
  setShowBookingsList = () => {},
  loggedInUserEmail = ""
}) {
  const [previousBookings, setPreviousBookings] = useState([]);

  useEffect(() => {
    if (loggedInUserEmail) {
      const allBookings = JSON.parse(localStorage.getItem('userBookings')) || {};
      const userBookings = allBookings[loggedInUserEmail] || [];
      setPreviousBookings(userBookings);
    }
  }, [loggedInUserEmail]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-[#1A1A1A] shadow-lg rounded-lg mt-10 text-white">
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-600 pb-2">
        Your Booked Hotels
      </h1>

      {/* Current Selections */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Current Selections</h2>
        {bookingData.length === 0 ? (
          <div className="text-center text-gray-400 mt-4 mb-8">
            No hotels selected for current trip.
          </div>
        ) : (
          <div className="space-y-6 mb-8">
            {bookingData.map((booking, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {booking.hotelImage && (
                      <img
                        src={booking.hotelImage}
                        alt={booking.hotelName}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h2 className="text-xl font-semibold">
                        {booking.hotelName}
                      </h2>
                      <p className="text-gray-300">
                        <strong>Stay Period:</strong> {booking.checkInDate} to{" "}
                        {booking.checkOutDate}
                      </p>
                      <p className="text-gray-300">
                        <strong>Guests:</strong> {booking.adults} Adults,{" "}
                        {booking.children} Children
                      </p>
                      <p className="text-gray-300">
                        <strong>Days:</strong> {booking.totalDays}
                      </p>
                      <p className="text-green-400">
                        <strong>Total Price:</strong> ₹{booking.totalPrice}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteBooking(index)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Previous Bookings */}
      {loggedInUserEmail && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 border-t border-gray-600 pt-4">Previous Bookings</h2>
          {previousBookings.length === 0 ? (
            <div className="text-center text-gray-400 mt-4">
              No previous bookings found.
            </div>
          ) : (
            <div className="space-y-6">
              {previousBookings.map((booking, index) => (
                <div key={index} className="border border-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">
                    Booked on: {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>

                  {/* Hotel Details */}
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Hotels:</h3>
                    {booking.hotels.map((hotel, hotelIndex) => (
                      <div key={hotelIndex} className="flex items-center gap-3 mb-2">
                        {hotel.hotelImage && (
                          <img
                            src={hotel.hotelImage}
                            alt={hotel.hotelName}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <p className="font-semibold">{hotel.hotelName}</p>
                          <p className="text-sm text-gray-400">
                            {hotel.checkInDate} to {hotel.checkOutDate}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Transportation Details */}
                  {booking.transportation && booking.transportation.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Transportation:</h3>
                      {booking.transportation.map((transport, transportIndex) => (
                        <div key={transportIndex} className="mb-2">
                          <p>Flight: {transport.from} → {transport.to}</p>
                          <p className="text-sm text-gray-400">₹{transport.totalPrice}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Grand Total */}
                  <div className="mt-2 text-right">
                    <p className="text-green-400 font-semibold">
                      Total: ₹{booking.grandTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Back Button */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setShowBookingsList(false)}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
