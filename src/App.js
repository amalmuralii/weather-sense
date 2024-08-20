import "./App.css";
import AppLogo from "./components/AppLogo/AppLogo";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import WeatherHistory from "./components/WeatherHistory/WeatherHistory";
import { useEffect, useState } from "react";
import useGeolocation from "./hooks/GeoLocationHook";
import {
  fetchCurrentWeather,
  fetchHistoricalWeather,
  fetchWeatherForecast,
} from "./services/fetchWeatherData";
function App() {
  const OPENCAGE_API_KEY = "dd9a267e40f345d5b8b03e383ab9e443";

  const tempRangeClasses = [
    { maxTemp: 0, backgroundClass: "freezing" },
    { maxTemp: 10, backgroundClass: "cold" },
    { maxTemp: 20, backgroundClass: "warm" },
    { maxTemp: 30, backgroundClass: "hot" },
    { maxTemp: 40, backgroundClass: "veryHot" },
  ];

  const { position } = useGeolocation();
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundClass, setBackgroundClass] = useState("defaultBg");

  useEffect(() => {
    if (position) {
      reverseGeocode(position.latitude, position.longitude)
        .then((address) => {
          setAddress(address);
          const city = address.components.city;
          setLocation(city);
          console.log("Loc", city);
          fetchCurrentWeather(city)
            .then((weatherData) => {
              setWeatherData(weatherData.data);
              console.log(weatherData);
              const temp = parseInt(weatherData?.data?.current?.temp_c);
              console.log(temp);
              const bgClass = getbackgroundClass(0);
              setBackgroundClass(bgClass);
              console.log(weatherData);
            })
            .catch((error) => {
              setError(error);
            });
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [position]);
  const reverseGeocode = async (lat, lng) => {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API_KEY}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      return data.results[0];
    } else {
      throw new Error("Unable to retrieve location");
    }
  };

  const getbackgroundClass = (temp) => {
    const range = tempRangeClasses.find((range) => temp <= range.maxTemp);
    return range ? range.backgroundClass : "";
  };

  return (
    <>
      <header className="header">
        <AppLogo />
        <SearchBar />
      </header>

      <div className={`App-header ${backgroundClass}`}>
        <WeatherCard
          location={location}
          error={error}
          weatherData={weatherData}
        />
        <WeatherHistory />
      </div>
    </>
  );
}

export default App;
