import { useState, useEffect } from "react";

import getWeather from "../services/weather";

const Weather = ({ name, lat, lon }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getWeather(lat, lon).then((data) => setWeather(data));
  }, [lat, lon]);

  if (!weather) {
    return <p>Loading weather...</p>;
  }

  const temp = weather.current.temp;
  const icon = weather.current.weather[0].icon;
  const description = weather.current.weather[0].description;
  const windSpeed = weather.current.wind_speed;

  return (
    <div>
      <h2>Weather in {name}</h2>
      <p>
        <b>Temperature:</b> {temp} Celsius
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <p>
        <b>Conditions:</b> {description}
      </p>
      <p>
        <b>Wind:</b> {windSpeed} m/s
      </p>
    </div>
  );
};

export default Weather;
