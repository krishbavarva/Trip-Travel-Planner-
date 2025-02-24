import { useEffect, useState } from "react";
import axios from "axios";

const WeatherDetails = ({location}) => {
  
  const [weather, setWeather] = useState(null);
  const API_KEY = "ad02c1bea560e80e134735bc21d07a69";
  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
      setWeather(null);
    }
  };
    useEffect (() => {
        fetchWeather()
    },[location])
  console.log(weather , "weather")

  return (
     <>
     <div className="mt-6">

    
      {weather && (
        <div className="bg-white text-black p-6 rounded-lg shadow-lg w-80 text-center">
          <h2 className="text-xl font-bold">{weather.name}, {weather.sys.country}</h2>
          <p className="text-lg">{weather.weather[0].description}</p>
          <p className="text-2xl font-bold">{weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>visibility: {weather.visibility}</p>
        </div>
      )}
       </div>
      </>
  );
};

export default WeatherDetails;
