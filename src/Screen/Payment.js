import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const { totalAmount } = location.state || {};

  useEffect(() => {
    if (!totalAmount) {
      alert("No payment amount provided!");
      return;
    }

    // Initialize Razorpay payment gateway
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key from the dashboard
      amount: totalAmount * 100, // Convert to paise
      currency: "INR",
      name: "Your Website Name",
      description: "Payment for booking",
      image: "https://example.com/logo.png", // Optional: Add your website logo
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "John Doe", // Replace with user details if needed
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254", // Customize theme color
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }, [totalAmount]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Payment Page</h2>
      <p className="text-center">You are about to pay ₹{totalAmount}.</p>
    </div>
  );
};

export default PaymentPage;
