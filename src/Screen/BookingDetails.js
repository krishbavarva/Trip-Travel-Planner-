import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const UserBookingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);
  const [previousBookings, setPreviousBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("loggedInUser");

    if (token && email) {
      setLoggedInUserEmail(email);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedInUserEmail) {
      const allBookings = JSON.parse(localStorage.getItem("userBookings")) || {};
      const userBookings = allBookings[loggedInUserEmail] || [];
      setPreviousBookings(userBookings);
      setLoading(false);
    }
  }, [loggedInUserEmail]);

  const handleDeleteBooking = (bookingIndex) => {
    const allBookings = JSON.parse(localStorage.getItem("userBookings")) || {};
    const updatedBookings = { ...allBookings };
    updatedBookings[loggedInUserEmail] = updatedBookings[loggedInUserEmail].filter(
      (_, index) => index !== bookingIndex
    );
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
    setPreviousBookings(updatedBookings[loggedInUserEmail] || []);
  };

  const handlePaymentRedirect = (totalAmount) => {
    navigate("/payment", { state: { totalAmount } });
  };

  const downloadBookingPDF = async (bookingIndex) => {
    const element = document.getElementById(`booking-${bookingIndex}`);
    if (!element) return;
  
    // Hide buttons
    const buttons = element.querySelectorAll("button");
    buttons.forEach((btn) => (btn.style.display = "none"));
  
    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pdfHeight);
      pdf.save(`booking-${bookingIndex + 1}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF", err);
    } finally {
      // Show buttons again
      buttons.forEach((btn) => (btn.style.display = "inline-block"));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading your bookings...</div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Your Bookings</h2>

      {previousBookings.length === 0 ? (
        <p className="text-center text-lg">You don't have any bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previousBookings.map((booking, index) => (
            <div
              key={index}
              id={`booking-${index}`}
              className="booking-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="font-semibold text-xl text-indigo-600">Booking Details</h3>
              <div className="mb-4">
                <strong className="text-gray-600">User Email:</strong> {booking.userEmail}
              </div>
              <div className="mb-4">
                <strong className="text-gray-600">Booking Date:</strong> {new Date(booking.bookingDate).toLocaleString()}
              </div>
              <div className="mb-4">
                <strong className="text-gray-600">Contact Email:</strong> {booking.contactInfo.email}
              </div>
              <div className="mb-4">
                <strong className="text-gray-600">Total Amount:</strong> ₹{booking.grandTotal}
              </div>
              <div className="mb-4">
                <strong className="text-gray-600">Guest Info:</strong> {booking.guestInfo.adults} adults, {booking.guestInfo.children} children
              </div>
              <div className="mb-6">
                <strong className="text-gray-600">Hotels:</strong>
                {booking.hotels.map((hotel, idx) => (
                  <div key={idx} className="mt-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={hotel.hotelImage}
                        alt={hotel.hotelName}
                        className="w-24 h-24 object-cover rounded-lg shadow-md"
                      />
                      <div>
                        <h4 className="font-semibold text-lg">{hotel.hotelName}</h4>
                        <p className="text-sm text-gray-500">Check-in: {new Date(hotel.checkInDate).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">Check-out: {new Date(hotel.checkOutDate).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">Price per night: ₹{hotel.hotelPrice}</p>
                        <p className="text-sm text-gray-500">Total Cost: ₹{hotel.totalPrice}</p>
                        <p className="text-sm text-gray-500">Total Tax: ₹{hotel.totalTax}</p>
                        <p className="text-sm text-gray-500">Days: {hotel.totalDays}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <strong className="text-gray-600">Transportation:</strong>
                {booking.transportation.length > 0 ? (
                  booking.transportation.map((transport, idx) => (
                    <div key={idx} className="mt-4">
                      <p className="text-sm text-gray-500"><strong>From:</strong> {transport.from}</p>
                      <p className="text-sm text-gray-500"><strong>To:</strong> {transport.to}</p>
                      <p className="text-sm text-gray-500"><strong>Total Price:</strong> ₹{transport.totalPrice}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No transportation selected</p>
                )}
              </div>

              {/* Delete Button */}
              <button
                className="bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-600 transition-colors duration-300"
                onClick={() => handleDeleteBooking(index)}
              >
                Delete Booking
              </button>

              {/* Proceed to Payment Button */}
              <button
                className="bg-green-500 text-white py-2 px-4 rounded mt-4 ml-2 hover:bg-green-600 transition-colors duration-300"
                onClick={() => handlePaymentRedirect(booking.grandTotal)}
              >
                Proceed to Payment
              </button>

              {/* Download PDF Button */}
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4 ml-2 hover:bg-blue-600 transition-colors duration-300"
                onClick={() => downloadBookingPDF(index)}
              >
                Download PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookingsPage;
