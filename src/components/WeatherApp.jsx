import React, { useState } from "react";
import axios from "axios";
import temprature from './images/temprature.png'
import condition from './images/conditon.png'
import humidity from './images/humidity.png'
const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "1cbb6f26cd856925540e0c5083e80dc6";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  const getWeatherData = async (city) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (response.status === 200) {
        setLoading(false);
        setError("");
        setWeather(response.data);
        console.log("Weather Data:", response.data);
      }
    } catch (error) {
      setLoading(false);
      setError(
        "some thing is wrong!!!"
      );
      console.error("some thing is wrong!!!", error.message);
    }
  };

  const handleSearch = () => {
    if (city.length > 0) {
      getWeatherData(city);
    } else {
      setError("Please enter a city name.");
    }
  };
  

  return (
    <div className="weather">
      <h1>Weather App</h1>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div className="info">
          <h2>Weather in {weather.name}</h2>
          <div className="img-wrap">
            <img src={temprature} alt="Temperature" className="img" />
            <p> Temperature: {weather.main.temp}°C </p>
          </div>
          <div className="img-wrap" >
            <img src={condition} alt="Condition" className="img" />
            <p>Humidity: {weather.main.humidity}% </p>
          </div>
          <div className="img-wrap">
            <img src={humidity} alt="Humidity" className="img" />
            <p> Temperature: {weather.main.temp}°C</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
