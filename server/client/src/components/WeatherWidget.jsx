import React, { useState, useEffect } from 'react';
import { FaTemperatureHigh, FaMapPin } from 'react-icons/fa';
import axios from 'axios';

const getGeoLocation = (callback) => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      callback(null, position);
    });
  } else {
    callback('No Location Data Available');
  }
};

const getWeatherData = (lat, lon) => axios.get(`/api/weather?lat=${lat.toFixed(4)}&lon=${lon.toFixed(4)}`);

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    getGeoLocation((err, position) => {
      if (err) {
        return;
      }
      getWeatherData(position.coords.latitude, position.coords.longitude)
        .then(({ data }) => setWeatherData(data));
    });
  }, []);

  if (!weatherData) return null;

  return (
    <div>
      <FaMapPin
        color="#fff"
        size="15"
      />
      {' '}
      {weatherData.name}
      {' | '}
      <FaTemperatureHigh
        color="#fff"
      />
      {' '}
      {weatherData.main.feels_like.toFixed(0)}
      {' | '}
      {weatherData.weather[0].description}
    </div>
  );
};
export default WeatherWidget;
