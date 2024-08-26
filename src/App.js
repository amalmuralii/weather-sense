import "./App.css";
import AppLogo from "./components/AppLogo/AppLogo";
import SearchBar from "./components/SearchBar/SearchBar";
import Dashboard from "./pages/Dasboard/Dashboard";
import Login from "./pages/LoginPage/Login";
import { useEffect, useState } from "react";
import useGeolocation from "./hooks/GeoLocationHook";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/Private/PrivateRoute";

import {
  fetchLocation,
  selectWeatherData,
  getWeatherStatus,
} from "./features/weather/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import getbackgroundClass from "./services/getBackgroundClass";

function App() {
  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeatherData);
  const weatherAPIStatus = useSelector(getWeatherStatus);
  const { position } = useGeolocation();
  const [backgroundClass, setBackgroundClass] = useState("defaultBg");

  // Fetch the user's location and weather data
  useEffect(() => {
    if (position) {
      const { latitude, longitude } = position;
      dispatch(fetchLocation({ latitude, longitude }));
    }
  }, [position, dispatch]);

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
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
