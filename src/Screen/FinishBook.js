// src/components/Hotels/FinishBookingForm.jsx
import { useEffect, useState } from "react";

export default function FinishBookingForm({
  bookingData,
  storedPrices,
  totalPrice,
  adults,
  children,
  loggedInUserEmail,
  bookingCompleted,
  setBookingCompleted,
  setFindHotel,
  setShowFinishBookingForm,
  setShowBookingsList
}) {
  const [contactEmail, setContactEmail] = useState("");
  
  useEffect(() => {
    if (loggedInUserEmail) {
      setContactEmail(loggedInUserEmail);
    }
  }, [loggedInUserEmail]);

  const goToPayment = () => {
    if (!loggedInUserEmail) {
      alert("Please log in to complete your booking.");
      return;
    }
    
    const bookingDetails = {
      userEmail: loggedInUserEmail,
      bookingDate: new Date().toISOString(),
      contactInfo: {
        email: contactEmail
      },
      guestInfo: {
        adults: adults,
        children: children,
      },
      hotels: bookingData,
      transportation: storedPrices || [],
      totalHotelCost: bookingData.reduce(
        (total, booking) => total + booking.totalPrice, 
        0
      ),
      totalTransportationCost: totalPrice,
      totalTax: (bookingData.reduce(
        (total, booking) => total + booking.totalPrice,
        0
      ) * 0.18),
      grandTotal: (
        (bookingData.reduce(
          (total, booking) => total + booking.totalPrice,
          0
        ) * 1.18) + totalPrice
      )
    };

    const existingBookings = JSON.parse(localStorage.getItem('userBookings')) || {};
    const userBookings = existingBookings[loggedInUserEmail] || [];
    userBookings.push(bookingDetails);
    existingBookings[loggedInUserEmail] = userBookings;
    localStorage.setItem('userBookings', JSON.stringify(existingBookings));
    setBookingCompleted(true);
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-[#1A1A1A] shadow-lg rounded-lg mt-10 text-white">
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-600 pb-2">
        Complete Your Booking
      </h1>

      {!loggedInUserEmail ? (
        <div className="text-center my-10">
          <div className="text-yellow-500 text-5xl mb-4">!</div>
          <h2 className="text-xl font-bold text-yellow-500 mb-4">
            Please log in to complete your booking
          </h2>
          <p className="text-gray-300 mb-6">
            You need to be logged in to save your booking details.
          </p>
          <a 
            href="/auth?redirect=/hotels" 
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            Log in or Register
          </a>
        </div>
      ) : bookingCompleted ? (
        <div className="text-center my-10">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-green-500 mb-2">
            Booking Successfully Completed!
          </h2>
          <p className="text-gray-300 mb-6">
            Thank you for your reservation. A confirmation has been sent to
            your email.
          </p>
          <button
            onClick={() => setFindHotel(false)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            Return to Homepage
          </button>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>

            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Guest Information</h3>
              <p className="text-gray-300">Adults: {adults}</p>
              <p className="text-gray-300">Children: {children}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Transportation</h3>
              {storedPrices?.map((price, index) => (
                <div key={index} className="mb-2">
                  <p className="text-gray-300"><strong>----Flight : {index + 1}----</strong></p>
                  <p className="text-gray-300">Flight From : {price.from}</p>
                  <p className="text-gray-300">Flight To : {price.to}</p>
                  <p className="text-gray-300">
                    Flight Price : {price.totalPrice}
                  </p>
                </div>
              ))}
              <div className="mt-4">
                <p className="font-semibold text-gray-300">
                  Total Price: ₹{totalPrice}
                </p>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">
                Hotels Selected ({bookingData.length})
              </h3>
              {bookingData.map((booking, index) => (
                <div
                  key={index}
                  className="border-b border-gray-700 last:border-b-0 py-2"
                >
                  <div className="flex items-center gap-3">
                    {booking.hotelImage && (
                      <img
                        src={booking.hotelImage}
                        alt={booking.hotelName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{booking.hotelName}</p>
                      <p className="text-sm text-gray-400">
                        {booking.checkInDate} to {booking.checkOutDate}
                      </p>
                      <p className="text-sm text-green-400">
                        ₹{booking.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Price Details</h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Subtotal Hotel:</span>
                <span className="text-gray-300">
                  ₹
                  {bookingData.reduce(
                    (total, booking) => total + booking.totalPrice,
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Subtotal Transportation:</span>
                <span className="text-gray-300">
                  ₹{totalPrice}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Taxes & Fees (18%):</span>
                <span className="text-gray-300">
                  ₹
                  {(
                    bookingData.reduce(
                      (total, booking) => total + booking.totalPrice,
                      0
                    ) * 0.18
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-700">
                <span>Total:</span>
                <span className="text-green-400">
                  ₹
                  {(
                    (bookingData.reduce(
                      (total, booking) => total + booking.totalPrice,
                      0
                    ) * 1.18) + totalPrice
                  ).toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4"> 
                <div>
                  <label className="block text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => {
                setShowFinishBookingForm(false);
                setShowBookingsList(true);
              }}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg"
            >
              Back to Hotels
            </button>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg"
              onClick={goToPayment}
            >
              Complete Booking
            </button>
          </div>
        </>
      )}
    </div>
  );
}