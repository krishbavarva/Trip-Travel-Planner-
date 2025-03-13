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

  const fetchTransportData = async () => {
    let apiUrl = "";
    let options = {};

    const formattedDateTime = `${date}T08:00:00`;

    if (transportType === "flight") {
      apiUrl = `https://flight-info-api.p.rapidapi.com/status?version=v2&dep_iata=${from}&arr_iata=${to}&DepartureDateTime=${formattedDateTime}`;
      options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "e4c549284fmshc3999b65408ef08p128889jsnaa570ab1cc5b",
          "x-rapidapi-host": "flight-info-api.p.rapidapi.com",
        },
      };
    }

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (data.length === 0) {
        setResults([]);
        alert("No flights found!");
      } else {
        setResults(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goToFindHotel = () => {
    setFindHotel(true);
  };

  const goBack = () => {
    setHotelPage(false);
  };

  const bookFlight = (flight) => {
    setSelectedFlight(flight);
    setFlightPrice(flight.price || 2500);
    setTFlightPrice(0)
  };

  const deleteStoredFlight = (index) => {
    window.alert("are you sure for delete this flight")
    setStoredPrices((prev) => prev.filter((_, i) => i !== index));
    window.alert("flight deleted succesfully")
  };

  const showSelectedFlight = () => {
    setShowStoredPrices(true)
    setResults(null)
  }
  console.log(storedPrices , "storedPrice")
 
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
        <Hotels location={location} setFindHotel={setFindHotel} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96 text-center">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Find Transportation</h2>

            <select
              value={transportType}
              onChange={(e) => setTransportType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md mb-4"
            >
              <option value="flight">Flight</option>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
            </select>

            <input
              type="text"
              placeholder="From (IATA Code)"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md mb-4"
            />

            <input
              type="text"
              placeholder="To (IATA Code)"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md mb-4"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md mb-4"
            />

            <button
              onClick={fetchTransportData}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 mb-2"
            >
              Search Flights
            </button>
            <button
              onClick={goToFindHotel}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 mb-2"
            >
              Find Hotels
            </button>
            <button
              onClick={goBack}
              className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300 mb-2"
            >
              Go Back
            </button>
            
            <button
              onClick={showSelectedFlight}
              className="mt-6 w-full px-6 py-3 bg-yellow-600 text-white rounded-lg shadow-lg hover:bg-yellow-700 transition-all duration-300"
            >
              Show Selected Flight Details
            </button>
            {results && (
              <div className="mt-6 text-left">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">Flight Results:</h3>
                <ul className="list-none space-y-4">
                  {results?.data?.map((flight, index) => (
                    <li key={index} className="p-4 bg-gray-800 rounded-lg shadow-md">
                      <p><strong className="text-cyan-300">Flight From:</strong> {from}</p>
                      <p><strong className="text-cyan-300">Flight To:</strong> {to}</p>
                      <p><strong className="text-cyan-300">Flight:</strong> {flight.carrier.iata} {flight.flightNumber}</p>
                      <p><strong className="text-cyan-300">Airline:</strong> {flight.marketingFlights?.[0]?.code || "Unknown"}</p>
                      <p><strong className="text-cyan-300">Price:</strong> ₹{flight.price || 2500}</p>
                      <button
                        onClick={() => bookFlight(flight)}
                        className="mt-2 w-full px-6 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300"
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
                <ul className="list-none space-y-4">
                  {storedPrices.map((flight, index) => (
                    <li key={index} className="p-4 bg-gray-800 rounded-lg shadow-md">
                      <p><strong className="text-cyan-300">From:</strong> {flight.from}</p>
                      <p><strong className="text-cyan-300">To:</strong> {flight.to}</p>
                      <p><strong className="text-cyan-300">Total Price:</strong> ₹{flight.totalPrice}</p>
                      <button
                        onClick={() => deleteStoredFlight(index)}
                        className="mt-2 w-full px-6 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FindTransportation;
