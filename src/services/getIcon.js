import humidityIcon from "../assets/icons/humidity.png";
import pressureIcon from "../assets/icons/pressure.png";
import windIcon from "../assets/icons/wind.png";
import dewpIcon from "../assets/icons/dew.png";
import precipitationIcon from "../assets/icons/precipitation.png";
import gustIcon from "../assets/icons/gust.png"


const getIconsByKey = (key) => {
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

export default getIconsByKey