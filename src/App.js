import "./App.css";
import AppLogo from "./components/AppLogo/AppLogo";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import WeatherHistory from "./components/WeatherHistory/WeatherHistory";
import { useEffect, useState } from "react";
import useGeolocation from "./hooks/GeoLocationHook";
import {
  fetchCurrentWeatherData,
  fetchLocation,
  selectWeatherData,
  getWeatherStatus,
  selectLocation,
} from "./features/weather/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import getbackgroundClass from "./services/getBackgroundClass";

function App() {
  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeatherData);
  const weatherAPIStatus = useSelector(getWeatherStatus);
  const location = useSelector(selectLocation);
  const { position } = useGeolocation();
  const [backgroundClass, setBackgroundClass] = useState("defaultBg");

  // Fetch the user's location and weather data
  useEffect(() => {
    if (position) {
      dispatch(fetchLocation({ latitude: position.latitude, longitude: position.longitude }));
    }
  }, [position, dispatch]);

  useEffect(() => {
    if (location) {
      dispatch(fetchCurrentWeatherData(location));
    }
  }, [location, dispatch]);

  // Update the background class based on the weather data
  useEffect(() => {
    if (weatherAPIStatus === "succeeded" && weatherData.current) {
      const temp = parseInt(weatherData.current.temp_c, 10);
      const bgClass = getbackgroundClass(temp);
      setBackgroundClass(bgClass);
    }
  }, [weatherAPIStatus, weatherData]);

  return (
    <>
      <header className="header">
        <AppLogo />
        <SearchBar />
      </header>
      <main className={`App-header ${backgroundClass}`}>
        <WeatherCard />
        <WeatherHistory />
      </main>
    </>
  );
}

export default App;
