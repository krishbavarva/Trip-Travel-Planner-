import { useState, useEffect } from "react";

export default function AdventureFinder({ longitude, latitude, setEvent }) {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    if (!longitude || !latitude) return;

    const overpassQuery = `
      [out:json];
      node["tourism"="attraction"](around:50000,${latitude},${longitude});
      out;
    `;

    const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

    const fetchAdventureSpots = async () => {
      try {
        const response = await fetch(overpassUrl);
        const data = await response.json();
        setPlaces(data.elements || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAdventureSpots();
  }, [longitude, latitude]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  return (
    <div className=" w-[80%] flex flex-col items-center p-6 bg-[#1A1A1A] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Nearby Adventure Activities 🌍</h1>

      {selectedPlace ? (
        <div className="mt-6 w-full bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">
            📍 {selectedPlace.tags?.name || "Unknown Place"}
          </h2>
          <p className="text-lg text-gray-300">
            Distance from Hotel:{" "}
            <span className="text-blue-400 font-semibold">
              {calculateDistance(latitude, longitude, selectedPlace.lat, selectedPlace.lon).toFixed(2)} km
            </span>
          </p>

          <iframe
            className="w-full h-[400px] rounded-lg mt-4"
            src={`https://www.google.com/maps?q=${selectedPlace.lat},${selectedPlace.lon}&output=embed`}
            allowFullScreen
          ></iframe>

          <button
            className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full font-semibold"
            onClick={() => setSelectedPlace(null)}
          >
            ← Back to List
          </button>
        </div>
      ) : (
        <>
          {places.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
              {places.map((place) => (
                <div
                  key={place.id}
                  className="bg-gray-800 p-5 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => setSelectedPlace(place)}
                >
                  <h2 className="text-xl font-semibold text-blue-400">
                    {place.tags?.name || "Unknown Place"}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    🌍 Latitude: {place.lat} | Longitude: {place.lon}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 mt-4">Fetching nearby adventure spots...</p>
          )}

          <button
            className="mt-6 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 font-semibold"
            onClick={() => setEvent(false)}
          >
            ← Go Back
          </button>
        </>
      )}
    </div>
  );
}
