import { useState } from "react";

const FindTransportation = () => {
  const [transportType, setTransportType] = useState("flight");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);

  const fetchTransportData = async () => {
    let apiUrl = "";

    if (transportType === "flight") {
      apiUrl = `https://api.aviationstack.com/v1/flights?access_key=234177029d2f258d05f970e01c85eac4&dep_iata=${from}&arr_iata=${to}&flight_date=${date}`;
    } else if (transportType === "bus") {
      apiUrl = `https://api.busapi.com/search?apiKey=YOUR_API_KEY&from=${from}&to=${to}&date=${date}`;
    } else if (transportType === "train") {
      apiUrl = `https://api.railwayapi.com/v2/train/between/source/${from}/dest/${to}/date/${date}/apikey/YOUR_API_KEY/`;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setResults(data.data || data.trains || []);
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
        placeholder="From (IATA Code for flights)"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <input
        type="text"
        placeholder="To (IATA Code for flights)"
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

      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">Results:</h3>
          <ul className="list-disc pl-5">
            {results.map((item, index) => (
              <li key={index} className="mb-2">
                {transportType === "flight"
                  ? `Flight: ${item.flight_number} - ${item.airline.name}`
                  : transportType === "bus"
                  ? `Bus: ${item.bus_name} - ${item.duration}`
                  : `Train: ${item.train_name} - ${item.departure}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FindTransportation;
