import { useState } from "react";

const FindTransportation = ({location}) => {
  const [transportType, setTransportType] = useState("flight");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);

  const fetchTransportData = async () => {
    let apiUrl = "";
    let options = {};

    // Format date-time properly (ISO 8601)
    const formattedDateTime = `${date}T08:00:00`;

    if (transportType === "flight") {
      apiUrl = `https://flight-info-api.p.rapidapi.com/status?version=v2&dep_iata=${from}&arr_iata=${to}&DepartureDateTime=${formattedDateTime}&ArrivalDateTime=${formattedDateTime}`;
      options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "b85f3f9f6bmsh628c0cb5c3646e5p14bee7jsned38c83e2777",
          "x-rapidapi-host": "flight-info-api.p.rapidapi.com"
        }
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

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Find Transportation</h2>

      <select
        value={transportType}
        onChange={(e) => setTransportType(e.target.value)}
        className="w-full p-2 border rounded mb-4"
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
        className="w-full p-2 border rounded mb-4"
      />

      <input
        type="text"
        placeholder="To (IATA Code)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={fetchTransportData}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Search
      </button>

      {results && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">Flight Results:</h3>
          <ul className="list-disc pl-5">
            {results && results?.data?.map((flight, index) => (
              <li key={index} className="mb-4 border-b pb-2">
                <strong>Flight:</strong> {flight.carrier.iata} {flight.flightNumber} <br />
                <strong>Airline:</strong> {flight.marketingFlights?.[0]?.code || "Unknown"}<br />
                <strong>Departure:</strong> {flight.departure.airport.iata} ({flight.departure.airport.icao}) at {flight.departure.time.local} <br />
                <strong>Arrival:</strong> {flight.arrival.airport.iata} ({flight.arrival.airport.icao}) at {flight.arrival.time.local} <br />
                <strong>Elapsed Time:</strong> {flight.elapsedTime} minutes <br />
                <strong>Stops:</strong> {flight.segmentInfo.numberOfStops} <br />
                <strong>Intermediate Airports:</strong> {flight.segmentInfo.intermediateAirports.iata.length > 0 ? flight.segmentInfo.intermediateAirports.iata.join(", ") : "None"} <br />
                <strong>Aircraft Type:</strong> {flight.equipment?.actualAircraftType.iata || "Unknown"} <br />
                <strong>Status:</strong> {flight.statusDetails?.[0]?.state || "Unknown"} <br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FindTransportation;
