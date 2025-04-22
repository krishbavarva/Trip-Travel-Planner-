// src/components/Hotels/Hotels.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import HotelDetailsPage from "./HotelDetailsPage";
import WeatherDetails from "./WeatherDetail";
import HotelSearch from "./HotelSearch";
import HotelList from "./HotelList";
import BookingsList from "./BookingList";
import FinishBookingForm from "./FinishBook";

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
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("loggedInUser");
  
    if (token && email) {
      setLoggedInUserEmail(email); // ✅ Correct user
    }
  }, []);

  const calculateDays = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const differenceInTime = checkOutDate - checkInDate;
      const days = differenceInTime / (1000 * 3600 * 24);
      setTotalDays(days);
    }
  };

  const handleCheckInDateChange = (e) => {
    const newCheckInDate = e.target.value;
    setCheckInDate(newCheckInDate);
    calculateDays(newCheckInDate, checkOutDate);
  };

  const handleCheckOutDateChange = (e) => {
    const newCheckOutDate = e.target.value;
    setCheckOutDate(newCheckOutDate);
    calculateDays(checkInDate, newCheckOutDate);
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

  const deleteBooking = (indexToDelete) => {
    setBookingData((currentBookings) =>
      currentBookings.filter((_, index) => index !== indexToDelete)
    );
  };

  useEffect(() => {
    const total = storedPrices?.reduce((acc, price) => acc + price.totalPrice, 0) || 0;
    setTotalPrice(total);
  }, [storedPrices]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6 w-[80%] sm:w-[95%] mx-auto text-white">
      {!hotelDetailPage && !showBookingsList && !showFinishBookingForm && (
        <>
          <HotelSearch 
            destination={destination}
            setDestination={setDestination}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            handleCheckInDateChange={handleCheckInDateChange}
            handleCheckOutDateChange={handleCheckOutDateChange}
            fetchingHotels={fetchingHotels}
            setWeatherCheck={setWeatherCheck}
            setHotelList={setHotelList}
          />

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

      {weatherCheck && !hotelList && !showBookingsList && !showFinishBookingForm && 
        <WeatherDetails location={location} />
      }

      {hotelList && !weatherCheck && !showBookingsList && !showFinishBookingForm && (
        <HotelList 
          hotelData={hotelData}
          setHotelDetailPage={setHotelDetailPage}
          setWeatherCheck={setWeatherCheck}
          setHotelList={setHotelList}
          setHotelDetailData={setHotelDetailData}
        />
      )}

      {hotelDetailPage && !hotelList && !weatherCheck && !showBookingsList && !showFinishBookingForm && (
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

      {showBookingsList && !showFinishBookingForm && (
        <BookingsList 
          bookingData={bookingData}
          deleteBooking={deleteBooking}
          setShowBookingsList={setShowBookingsList}
          loggedInUserEmail={loggedInUserEmail}
        />
      )}

      {showFinishBookingForm && (
        <FinishBookingForm 
          bookingData={bookingData}
          storedPrices={storedPrices}
          totalPrice={totalPrice}
          adults={adults}
          children={children}
          loggedInUserEmail={loggedInUserEmail}
          bookingCompleted={bookingCompleted}
          setBookingCompleted={setBookingCompleted}
          setFindHotel={setFindHotel}
          setShowFinishBookingForm={setShowFinishBookingForm}
          setShowBookingsList={setShowBookingsList}
        />
      )}
    </div>
  );
}