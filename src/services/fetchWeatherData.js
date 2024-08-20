import axios from "axios";

const BASE_URL = "http://api.weatherapi.com/v1/";
const API_KEY = "122be9810a064bcba4145907242008";
// Function to fetch current weather data
export const fetchCurrentWeather = async (location) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=no`
    );
    return { data: response.data, error: null };
  } catch (err) {
    console.error("Error fetching current weather:", err);
    return { data: null, error: err };
  }
};

// Function to fetch weather forecast
export const fetchWeatherForecast = async (location, days = 7) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=${days}&aqi=no&alerts=no`
    );
    return { data: response.data, error: null };
  } catch (err) {
    console.error("Error fetching weather forecast:", err);
    return { data: null, error: err };
  }
};

// Function to fetch historical weather data
export const fetchHistoricalWeather = async (location, date) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/history.json?key=${API_KEY}&q=${location}&dt=${date}`
    );
    return { data: response.data, error: null };
  } catch (err) {
    console.error("Error fetching historical weather:", err);
    return { data: null, error: err };
  }
};

// You can add more functions as needed and export them
