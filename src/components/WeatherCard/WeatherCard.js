import "./WeatherCard.css";
import humidityIcon from "../../assets/icons/humidity.png";
import pressureIcon from "../../assets/icons/pressure.png";
import windIcon from "../../assets/icons/wind.png";
import dewpIcon from "../../assets/icons/dew.png";
import precipitationIcon from "../../assets/icons/precipitation.png";

const WeatherCard = ({ location, error, weatherData }) => {
  const icon = weatherData?.current?.condition?.icon;
  const temp = weatherData?.current?.temp_c;
  const cuurentCondition = weatherData?.current?.condition?.text;
  const currentWeather = weatherData?.current;

  const cloudy = false;

  const getTitle = (key) => {
    switch (key) {
      case "humidity":
        return "Humidity";
      case "pressure_mb":
        return "Pressure";
      case "wind_kph":
        return "Wind";
      case "dewpoint_c":
        return "Dew Point";
      case "precip_in":
        return "Precipitation";
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
          title: getTitle(key),
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
            {icons.map(({ key, value, icon, title }) => (
              <div key={key} className="icon-item">
                <img src={icon} alt={title} className="icon" />
                <div className="label">
                  {title}: {value}
                </div>
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
