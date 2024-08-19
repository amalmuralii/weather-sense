import "./WeatherCard.css";
const WeatherCard = () => {
  return (
    <div className="weatherCard">
      <div className="weatherHeader">
        <div className="weatherIcon"></div>
        <div className="weatherTemp"></div>
      </div>
      <div className="weatherInfo">
        <span className="weatherData"></span>
      </div>
    </div>
  );
};

export default WeatherCard;
