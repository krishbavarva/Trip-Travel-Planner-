import { useState, useEffect } from "react";
import Hotels from "./HotelPage";
import FlightDetails from "./FlightDetails";

const FindTransportation = ({ location, setHotelPage, adults, children }) => {
  const [transportType, setTransportType] = useState("flight");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const [findHotel, setFindHotel] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [flightPrice, setFlightPrice] = useState(0);
  const [tFlightPrice, setTFlightPrice] = useState(0);
  const [storedPrices, setStoredPrices] = useState([]);
  const [showStoredPrices, setShowStoredPrices] = useState(false);

  useEffect(() => {
    if (tFlightPrice !== 0) {
      setStoredPrices((prev) => [...prev, { from, to, totalPrice: tFlightPrice }]);
    }
  }, [tFlightPrice]);

  const mockFlightData = {
    data: [
      {
        carrier: { iata: "AI" },
        flightNumber: "101",
        marketingFlights: [{ code: "Air India" }],
        price: 3500,
        origin: { airport: { iata: "DEL", name: "Indira Gandhi International Airport" }},
        destination: { airport: { iata: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport" }},
        departure: { time: "08:00" },
        arrival: { time: "10:00" },
        status: "Scheduled"
      },
      {
        carrier: { iata: "6E" },
        flightNumber: "204",
        marketingFlights: [{ code: "IndiGo" }],
        price: 2800,
        origin: { airport: { iata: "DEL", name: "Indira Gandhi International Airport" }},
        destination: { airport: { iata: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport" }},
        departure: { time: "10:30" },
        arrival: { time: "12:30" },
        status: "Scheduled"
      },
      {
        carrier: { iata: "SG" },
        flightNumber: "305",
        marketingFlights: [{ code: "SpiceJet" }],
        price: 2200,
        origin: { airport: { iata: "DEL", name: "Indira Gandhi International Airport" }},
        destination: { airport: { iata: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport" }},
        departure: { time: "14:45" },
        arrival: { time: "16:45" },
        status: "Scheduled"
      }
    ]
  };

  const fetchTransportData = async () => {
    if (!from || !to || !date) {
      alert("Please fill in all fields");
      return;
    }

    try {
      console.log("Mock API Call with:", { from, to, date });

      const updatedMockData = {
        ...mockFlightData,
        data: mockFlightData.data.map(flight => ({
          ...flight,
          origin: {
            ...flight.origin,
            airport: {
              ...flight.origin.airport,
              iata: from
            }
          },
          destination: {
            ...flight.destination,
            airport: {
              ...flight.destination.airport,
              iata: to
            }
          }
        }))
      };

      setResults(updatedMockData);
    } catch (error) {
      console.error("Fetch error:", error);
      setResults(mockFlightData);
    }
  };

  const goToFindHotel = () => {
    if (!storedPrices.length) {
      const confirmHotel = window.confirm("Transportation is pending. If you want to go directly to hotels, press OK.");
      if (!confirmHotel) return;
    }
    setFindHotel(true);
  };

  const goBack = () => {
    setHotelPage(false);
  };

  const bookFlight = (flight) => {
    if (!flight || !flight.origin?.airport || !flight.destination?.airport) {
      alert("Flight data is invalid.");
      return;
    }

    setSelectedFlight(flight);
    setFlightPrice(flight.price || 2500);
    setTFlightPrice(0);
  };

  const deleteStoredFlight = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this flight?");
    if (confirmDelete) {
      setStoredPrices((prev) => prev.filter((_, i) => i !== index));
      alert("Flight deleted successfully");
    }
  };

  const showSelectedFlight = () => {
    setShowStoredPrices(true);
    setResults(null);
  };

  const hideSelectedFlight = () => {
    setShowStoredPrices(false);
    setResults([]);
  };

  return (
    <>
      {selectedFlight ? (
        <FlightDetails
          flight={selectedFlight}
          from={from}
          to={to}
          flightPrice={flightPrice}
          adults={adults}
          children={children}
          setTFlightPrice={setTFlightPrice}
          setSelectedFlight={setSelectedFlight}
        />
      ) : findHotel ? (
        <Hotels
          location={location}
          setFindHotel={setFindHotel}
          selectedFlight={selectedFlight}
          flightPrice={tFlightPrice}
          storedPrices={storedPrices}
          adults={adults}
          children={children}
        />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96 text-center">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Find Transportation</h2>

            <select
              value={transportType}
              onChange={(e) => setTransportType(e.target.value)}
              className="w-full mb-4 px-4 py-3 bg-gray-700 rounded-lg border border-gray-600"
            >
              <option value="flight">Flight</option>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
            </select>

            <input
              type="text"
              placeholder="From (IATA Code)"
              value={from}
              onChange={(e) => setFrom(e.target.value.toUpperCase())}
              className="w-full mb-4 px-4 py-3 bg-gray-700 rounded-lg border border-gray-600"
            />

            <input
              type="text"
              placeholder="To (IATA Code)"
              value={to}
              onChange={(e) => setTo(e.target.value.toUpperCase())}
              className="w-full mb-4 px-4 py-3 bg-gray-700 rounded-lg border border-gray-600"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full mb-4 px-4 py-3 bg-gray-700 rounded-lg border border-gray-600"
            />

            <button onClick={fetchTransportData} className="w-full mb-2 py-3 bg-purple-600 rounded-lg">
              Search Flights
            </button>

            <button onClick={goToFindHotel} className="w-full mb-2 py-3 bg-blue-600 rounded-lg">
              Find Hotels
            </button>

            <button onClick={goBack} className="w-full mb-2 py-3 bg-gray-600 rounded-lg">
              Go Back
            </button>

            {storedPrices.length > 0 && (
              <button
                onClick={showSelectedFlight}
                className="w-full mt-6 py-3 bg-yellow-600 rounded-lg"
              >
                Show Selected Flight Details
              </button>
            )}

            {results?.data?.length > 0 && (
              <div className="mt-6 text-left">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">Flight Results:</h3>
                <ul className="space-y-4">
                  {results.data.map((flight, index) => (
                    <li key={index} className="p-4 bg-gray-800 rounded-lg">
                      <p><strong className="text-cyan-300">From:</strong> {flight.origin?.airport?.iata} ({flight.origin?.airport?.name})</p>
                      <p><strong className="text-cyan-300">To:</strong> {flight.destination?.airport?.iata} ({flight.destination?.airport?.name})</p>
                      <p><strong className="text-cyan-300">Flight:</strong> {flight.carrier?.iata} {flight.flightNumber}</p>
                      <p><strong className="text-cyan-300">Airline:</strong> {flight.marketingFlights?.[0]?.code || "Unknown"}</p>
                      <p><strong className="text-cyan-300">Price:</strong> ₹{flight.price || 2500}</p>
                      <p><strong className="text-cyan-300">Departure:</strong> {flight.departure?.time}</p>
                      <p><strong className="text-cyan-300">Arrival:</strong> {flight.arrival?.time}</p>
                      <button
                        onClick={() => bookFlight(flight)}
                        className="mt-2 w-full py-2 bg-green-600 rounded-lg"
                      >
                        Book Now
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {showStoredPrices && (
              <div className="mt-6 text-left">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">Stored Flight Prices:</h3>
                {storedPrices.length > 0 ? (
                  <ul className="space-y-4">
                    {storedPrices.map((flight, index) => (
                      <li key={index} className="p-4 bg-gray-800 rounded-lg">
                        <p><strong className="text-cyan-300">From:</strong> {flight.from}</p>
                        <p><strong className="text-cyan-300">To:</strong> {flight.to}</p>
                        <p><strong className="text-cyan-300">Total Price:</strong> ₹{flight.totalPrice}</p>
                        <button
                          onClick={() => deleteStoredFlight(index)}
                          className="mt-2 w-full py-2 bg-red-600 rounded-lg"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-300">No flights stored yet.</p>
                )}
                <button
                  onClick={hideSelectedFlight}
                  className="mt-4 w-full py-3 bg-gray-600 rounded-lg"
                >
                  Go Back
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FindTransportation;
