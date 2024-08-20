import "./WeatherCard.css";
import humidityIcon from "../../assets/icons/humidity.png";
import pressureIcon from "../../assets/icons/pressure.png";
import windIcon from "../../assets/icons/wind.png";
import dewpIcon from "../../assets/icons/dew.png";
import precipitationIcon from "../../assets/icons/precipitation.png";
import gustIcon from "../../assets/icons/gust.png"

const WeatherCard = ({ location, error, weatherData }) => {
  const icon = weatherData?.current?.condition?.icon;
  const temp = weatherData?.current?.temp_c;
  const cuurentCondition = weatherData?.current?.condition?.text;
  const currentWeather = weatherData?.current;

  const cloudy = false;

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

  const getIconsForKey = (key) => {
    switch (key) {
      case "humidity":
        return humidityIcon;
      case "pressure_mb":
        return pressureIcon;
      case "wind_kph":
        return windIcon;
      case "dewpoint_c":
        return dewpIcon;
      case "precip_in":
        return precipitationIcon;
      case "gust_kph":
        return gustIcon;
      default:
        return null;
    }
  };

  const icons = currentWeather
    ? Object.keys(currentWeather)
      .map((key) => ({
        key,
        value: currentWeather[key],
        icon: getIconsForKey(key),
        data: getData(key),
      }))
      .filter((item) => item.icon)
    : [];

  return (
    <div className={`weatherCard ${cloudy ? "cloudy" : "sunny"}`}>
      {weatherData ? (
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
      ) : (
        <span className="noData">Fetching....</span>
      )}
    </div>
  );
};

export default WeatherCard;
