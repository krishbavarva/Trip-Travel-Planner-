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
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Find Adventure Activities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place) => (
          <div 
            key={place.id} 
            className="border p-4 rounded-lg shadow-md cursor-pointer" 
            onClick={() => setSelectedPlace(place)}
          >
            <h2 className="text-lg font-semibold">{place.tags?.name || "Unknown Place"}</h2>
            <p className="text-sm">Lat: {place.lat}, Lon: {place.lon}</p>
          </div>
        ))}
      </div>
      {selectedPlace && (
        <div className="mt-6 w-full">
          <h2 className="text-xl font-semibold mb-2">Selected Place: {selectedPlace.tags?.name || "Unknown"}</h2>
          <p>Distance from Hotel: {calculateDistance(latitude, longitude, selectedPlace.lat, selectedPlace.lon).toFixed(2)} km</p>
          <iframe
            className="w-full h-[600px] rounded-lg mt-2"
            src={`https://www.google.com/maps?q=${selectedPlace.lat},${selectedPlace.lon}&output=embed`}
            allowFullScreen
          ></iframe>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" 
            onClick={() => setEvent(false)}
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}
  