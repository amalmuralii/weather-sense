import "./App.css";
import AppLogo from "./components/AppLogo/AppLogo";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import WeatherHistory from "./components/WeatherHistory/WeatherHistory";
import { useEffect, useState } from "react";
import useGeolocation from "./hooks/GeoLocationHook";
function App() {
  const OPENCAGE_API_KEY = "dd9a267e40f345d5b8b03e383ab9e443"; // Replace with your API key
  const { position, err } = useGeolocation();
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (position) {
      reverseGeocode(position.latitude, position.longitude)
        .then((address) => {
          setAddress(address);
          console.log(address);
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

  return (
    <>
      <header className="header">
        <AppLogo />
        <SearchBar />
      </header>

      <div className="App-header">
        <WeatherCard />
        <WeatherHistory />
      </div>
    </>
  );
}

export default App;
