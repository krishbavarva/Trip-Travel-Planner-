import { useEffect, useState } from "react";
import axios from "axios";
import HotelDetailsPage from "./HotelDetailsPage";
import WeatherDetails from "./WeatherDetail";

export default function Hotels({
  location,
  storedPrices,
  setFindHotel,
  children,
  adults,
}) {
  const [destination, setDestination] = useState(location || "");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [hotelData, setHotelData] = useState([]);
  const [hotelDetailPage, setHotelDetailPage] = useState(false);
  const [weatherCheck, setWeatherCheck] = useState(false);
  const [hotelList, setHotelList] = useState(false);
  const [hotelDetailData, setHotelDetailData] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [bookingData, setBookingData] = useState([]);
  const [showBookingsList, setShowBookingsList] = useState(false);
  const [showFinishBookingForm, setShowFinishBookingForm] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);

  // Get the currently logged in user
  useEffect(() => {
    // Check if there's a token
    const token = localStorage.getItem("token");
    
    if (token) {
      // If token exists, find the user email
      // Loop through localStorage to find the email that has a matching token
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        // Skip non-email keys (token, userBookings, etc.)
        if (key === "token" || key === "userBookings") continue;
        
        // Check if this key is likely an email
        if (key.includes("@")) {
          setLoggedInUserEmail(key);
          break;
        }
      }
    }
  }, []);

  // Function to calculate the number of days between check-in and check-out dates
  const calculateDays = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const differenceInTime = checkOutDate - checkInDate;
      const days = differenceInTime / (1000 * 3600 * 24); // Convert time difference to days
      setTotalDays(days); // Store the result in totalDays state
    }
  };

  const goToPayment = () => {
    // Check if user is logged in
    if (!loggedInUserEmail) {
      alert("Please log in to complete your booking.");
      return;
    }
    
    // Create a booking object with all necessary data
    const bookingDetails = {
      userEmail: loggedInUserEmail,
      bookingDate: new Date().toISOString(),
      contactInfo: {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        specialRequests: specialRequests,
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

    // Get existing bookings from local storage or initialize empty object
    const existingBookings = JSON.parse(localStorage.getItem('userBookings')) || {};
    
    // Add/update bookings for this specific user
    const userBookings = existingBookings[loggedInUserEmail] || [];
    userBookings.push(bookingDetails);
    
    // Update the bookings object with this user's bookings
    existingBookings[loggedInUserEmail] = userBookings;
    
    // Save back to local storage
    localStorage.setItem('userBookings', JSON.stringify(existingBookings));
    
    // Mark booking as completed
    setBookingCompleted(true);
    
    console.log("Booking saved to local storage:", bookingDetails);
  }

  // Load user's existing bookings when component mounts
  useEffect(() => {
    // Only attempt to load if we have a logged in user
    if (loggedInUserEmail) {
      const allBookings = JSON.parse(localStorage.getItem('userBookings')) || {};
      const userBookings = allBookings[loggedInUserEmail] || [];
      
      // You could set this to state if needed for display
      console.log("User's existing bookings:", userBookings);
    }
  }, [loggedInUserEmail]);

  // Handle input changes for dates
  const handleCheckInDateChange = (e) => {
    const newCheckInDate = e.target.value;
    setCheckInDate(newCheckInDate);
    calculateDays(newCheckInDate, checkOutDate); // Recalculate days whenever check-in date changes
  };

  const handleCheckOutDateChange = (e) => {
    const newCheckOutDate = e.target.value;
    setCheckOutDate(newCheckOutDate);
    calculateDays(checkInDate, newCheckOutDate); // Recalculate days whenever check-out date changes
  };

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

  // Function to delete a booking
  const deleteBooking = (indexToDelete) => {
    setBookingData((currentBookings) =>
      currentBookings.filter((_, index) => index !== indexToDelete)
    );
  };

  // Function to handle final booking submission
  const handleFinishBooking = (e) => {
    e.preventDefault();
    // Here you would typically send all booking data to your server
    // For now, we'll just mark the booking as completed
    setBookingCompleted(true);

    console.log("Final booking details:", {
      contactInfo: {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        specialRequests: specialRequests,
      },
      guestInfo: {
        adults: adults,
        children: children,
      },
      hotels: bookingData,
      totalCost: bookingData.reduce(
        (total, booking) => total + booking.totalPrice,
        0
      ),
    });
  };
  
  useEffect(() => {
    const total = storedPrices?.reduce((acc, price) => acc + price.totalPrice, 0) || 0;
    setTotalPrice(total);
  }, [storedPrices]);
  
  // Component to display all booked hotels 
  const BookingsList = () => {
    // Fetch current user's previous bookings from localStorage
    const [previousBookings, setPreviousBookings] = useState([]);
    
    useEffect(() => {
      if (loggedInUserEmail) {
        const allBookings = JSON.parse(localStorage.getItem('userBookings')) || {};
        const userBookings = allBookings[loggedInUserEmail] || [];
        setPreviousBookings(userBookings);
      }
    }, []);
    
    return (
      <div className="w-full max-w-5xl mx-auto p-6 bg-[#1A1A1A] shadow-lg rounded-lg mt-10 text-white">
        <h1 className="text-3xl font-bold mb-6 border-b border-gray-600 pb-2">
          Your Booked Hotels
        </h1>

        {/* Currently selected hotels (not yet booked) */}
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
        
        {/* Previous completed bookings */}
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
                    <p className="text-sm text-gray-400 mb-2">Booked on: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                    
                    {/* Hotels */}
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
                    
                    {/* Transportation */}
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
                    
                    {/* Total */}
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
  };

  // Component for the final booking form
  const FinishBookingForm = () => {
    // Pre-fill email field with logged in user's email if available
    useEffect(() => {
      if (loggedInUserEmail) {
        setContactEmail(loggedInUserEmail);
      }
    }, []);
    
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
              
              {/* Add contact information form fields */}
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
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6 w-[80%] sm:w-[95%] mx-auto text-white">
      {!hotelDetailPage && !showBookingsList && !showFinishBookingForm && (
        <>
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
            className="w-[95%] mt-6 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg transition"
            onClick={() => {
              setShowBookingsList(true);
              setWeatherCheck(false);
              setHotelList(false);
            }}
          >
            View Booked Hotels ({bookingData.length})
          </button>

          {bookingData.length > 0 && (
            <button
              className="w-[95%] mt-6 bg-yellow-600 hover:bg-yellow-500 text-white py-3 rounded-lg transition"
              onClick={() => {
                setShowFinishBookingForm(true);
                setWeatherCheck(false);
                setHotelList(false);
                setShowBookingsList(false);
              }}
            >
              Finish Booking
            </button>
          )}

          <button
            onClick={() => setFindHotel(false)}
            className="w-[95%] mt-6 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition"
          >
            Go Back
          </button>
        </>
      )}

      {weatherCheck &&
        !hotelList &&
        !showBookingsList &&
        !showFinishBookingForm && <WeatherDetails location={location} />}

      {hotelList &&
        !weatherCheck &&
        !showBookingsList &&
        !showFinishBookingForm && (
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
        )}

      {hotelDetailPage &&
        !hotelList &&
        !weatherCheck &&
        !showBookingsList &&
        !showFinishBookingForm && (
          <HotelDetailsPage
            hotelDetailData={hotelDetailData}
            setHotelDetailPage={setHotelDetailPage}
            storedPrices={storedPrices}
            totalDays={totalDays}
            children={children}
            adults={adults}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            setBookingData={setBookingData}
          />
        )}

      {showBookingsList && !showFinishBookingForm && <BookingsList />}

      {showFinishBookingForm && <FinishBookingForm />}
    </div>
  );
}