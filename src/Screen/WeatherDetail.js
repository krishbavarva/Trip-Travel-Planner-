import { useEffect, useState } from "react";
import axios from "axios";

const WeatherDetails = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);
  const API_KEY = "ad02c1bea560e80e134735bc21d07a69";

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      setError(false);
    } catch (error) {
      console.error("Error fetching weather data", error);
      setWeather(null);
      setError(true);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [location]);

  return (
    <div className="flex justify-center mt-6">
      {error ? (
        <p className="text-red-500 text-lg font-semibold">
          Unable to fetch weather data for "{location}".
        </p>
      ) : weather ? (
        <div className="bg-[#1A1A1A] text-white p-6 rounded-xl shadow-lg w-80 text-center backdrop-blur-md border border-gray-700">
          {/* City & Country */}
          <h2 className="text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
          <p className="text-lg text-gray-300 capitalize">{weather.weather[0].description}</p>

          {/* Temperature */}
          <p className="text-4xl font-bold text-blue-400 mt-2">{weather.main.temp}°C</p>

          {/* Additional Details */}
          <div className="mt-4 space-y-2 text-gray-300">
            <p>💧 Humidity: <span className="font-semibold">{weather.main.humidity}%</span></p>
            <p>🌬️ Wind Speed: <span className="font-semibold">{weather.wind.speed} m/s</span></p>
            <p>👀 Visibility: <span className="font-semibold">{weather.visibility / 1000} km</span></p>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">Fetching weather data...</p>
      )}
    </div>
  );
};

export default WeatherDetails;
