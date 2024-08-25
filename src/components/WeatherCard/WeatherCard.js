import "./WeatherCard.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getWeatherError,
  getWeatherStatus,
  fetchCurrentWeatherData,
  selectWeatherData,
  selectLocation
} from "../../features/weather/weatherSlice";

import getIconsByKey from "../../services/getIcon";


const WeatherCard = () => {

  const dispatch = useDispatch();
  const weatherAPIStatus = useSelector(getWeatherStatus);
  const weatherAPIError = useSelector(getWeatherError);
  const weatherData = useSelector(selectWeatherData);
  const location = useSelector(selectLocation);
  const icon = weatherData?.current?.condition?.icon;
  const temp = weatherData?.current?.temp_c;
  const cuurentCondition = weatherData?.current?.condition?.text;
  const currentWeather = weatherData?.current;

  const cloudy = false;

  useEffect(() => {
    if (location) {
      dispatch(fetchCurrentWeatherData(location));
    }
  }, [location, dispatch])

  console.log('weatherAPIStatus', weatherAPIStatus);


  const getData = (key) => {
    switch (key) {
      case "humidity":
        return { title: "Humidity", value: `${currentWeather[key]}%` };
      case "pressure_mb":
        return { title: "Pressure", value: `${currentWeather[key]}mb` };
      case "wind_kph":
        return { title: "Wind", value: `${currentWeather[key]}kph` };
      case "dewpoint_c":
        return { title: "Dew Point", value: `${currentWeather[key]}°` };
      case "precip_in":
        return { title: "Precipitation", value: `${currentWeather[key]}in` };
      case "gust_kph":
        return { title: "Gust", value: `${currentWeather[key]}kph` };
      default:
        return null;
    }
  };

  const icons = currentWeather
    ? Object.keys(currentWeather)
      .map((key) => ({
        key,
        value: currentWeather[key],
        icon: getIconsByKey(key),
        data: getData(key),
      }))
      .filter((item) => item.icon)
    : [];

  return (
    <div className={`weatherCard ${cloudy ? "cloudy" : "sunny"}`}>
      {weatherData && weatherAPIStatus === "succeeded" && (
        <>
          <div className="weatherHeader">
            <div className="weatherLocation">
              <span>{location}</span>
            </div>
            <div className="weatherTemp">
              <span className="tempText">{temp}°C</span>
            </div>
            <div className="weatherIcon">
              <img src={icon} alt="weather icon" />
              <span>{cuurentCondition}</span>
            </div>
          </div>
          <div className="weatherInfo">
            {icons.map(({ key, value, icon, data }) => (
              <div key={key} className="icon-item">
                <img src={icon} alt={data.title} className="icon" />
                <div className="label">
                  {data.title}
                </div>
                <div className="value">{data.value}</div>
              </div>
            ))}
          </div>
        </>
      )}
      {weatherAPIError && weatherAPIStatus === "failed" &&
        (
          <span className="noData">Fetching....</span>
        )}
    </div>
  );
};

export default WeatherCard;
