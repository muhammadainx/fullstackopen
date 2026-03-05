import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/3.0/onecall";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = (lat, lon) => {
  const request = axios.get(
    `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&exclude=minutely,hourly,alerts&units=metric`,
  );
  return request.then((response) => response.data);
};

export default getWeather;
