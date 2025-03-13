import { useState } from "react";

const FlightDetails = ({ flight, adults, children, setTFlightPrice, setSelectedFlight,from,to }) => {
  const basePrice = flight.price || 2500; // Default price if not provided
  const totalPrice = basePrice * adults + basePrice * 0.5 * children; // Children pay 50%
  const adultsPrice = basePrice * adults;
  const childPrice = basePrice * 0.5 * children;

  const goToHotel = () => {
    setTFlightPrice(totalPrice);
    setSelectedFlight(null);
    window.alert("successfully book ticket for " + from + " to " + to )
  };

  const goBack = () => {
    setSelectedFlight(null); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Flight Details</h2>
        <p><strong className="text-cyan-300">Flight:</strong> {flight.carrier.iata} {flight.flightNumber}</p>
        <p><strong className="text-cyan-300">Airline:</strong> {flight.marketingFlights?.[0]?.code || "Unknown"}</p>
        <p><strong className="text-cyan-300">From:</strong> {flight.departure.airport.iata} - {flight.departure.airport.name}</p>
        <p><strong className="text-cyan-300">To:</strong> {flight.arrival.airport.iata} - {flight.arrival.airport.name}</p>
        <p><strong className="text-cyan-300">Departure Time:</strong> {new Date(flight.departure.scheduledTime).toLocaleString()}</p>
        <p><strong className="text-cyan-300">Arrival Time:</strong> {new Date(flight.arrival.scheduledTime).toLocaleString()}</p>
        <p><strong className="text-cyan-300">Base Price:</strong> ₹{basePrice}</p>
        <p><strong className="text-cyan-300">Adults Price:</strong> ₹{adultsPrice.toFixed(2)}</p>
        <p><strong className="text-cyan-300">Child Price:</strong> ₹{childPrice.toFixed(2)}</p>
        <p><strong className="text-cyan-300">Total Price:</strong> ₹{totalPrice.toFixed(2)}</p>
        
        <button 
          onClick={goToHotel} 
          className="mt-4 w-full px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300"
        >
          Confirm Booking
        </button>
        
        <button 
          onClick={goBack} 
          className="mt-2 w-full px-6 py-3 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default FlightDetails;
