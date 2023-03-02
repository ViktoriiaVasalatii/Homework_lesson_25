import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const API_KEY = "5d066958a60d315387d9492393935c19";
    const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      setWeather(data);
    } else {
      console.log("Помилка HTTP: " + response.status);
    }
  }

  useEffect(() => {
    if (city !== "") {
      handleSubmit();
    }
  }, [city]);

  return (
    <div className="container">
      <div className='container_input'>
        <h1 className="title">Weather App</h1>
        <form onSubmit={handleSubmit} >
          <input className="input"
            placeholder="city"
            type="text"
            id="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <button type="submit" className="button">Get Weather</button>
        </form>
      </div>
      {weather && (
        <div className='container_data'>
          <h2>{weather.name}</h2>
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="weather icon"
          />
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Wind Direction: {weather.wind.deg} °</p>

        </div>
      )}
    </div>
  );
};

export default Weather;
