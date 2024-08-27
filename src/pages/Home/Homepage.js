import "./HomePage.css";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const navigate = useNavigate();
  const handleNavigate = async (redirectLocation) => {
    navigate(redirectLocation);
  };
  return (
    <>
      <div className="welcome">
        <h3>Welcome to Weather-Sense!</h3>
        <main>
          <section>
            <h5>
              Stay informed and prepared with our comprehensive weather
              application designed to keep you updated on current and upcoming
              weather conditions.
            </h5>
            <p>
              Whether you're planning a trip, heading out for a workout, or
              simply want to stay ahead of the weather, Weather-Sense has you
              covered.
            </p>
          </section>

          <section>
            <h5>Key Features:</h5>
            <ul>
              <li>
                <strong>Current Weather:</strong> Get real-time updates on
                temperature, humidity, and weather conditions for your location.
              </li>
              <li>
                <strong>Forecast:</strong> View detailed hourly and daily
                forecasts to plan your activities with confidence.
              </li>
              <li>
                <strong>Custom Locations:</strong> Save and access weather
                information for multiple locations, from your hometown to your
                favorite vacation spots.
              </li>
              <li>
                <strong>Minimalist Design:</strong> Enjoy a clean, user-friendly
                interface that makes checking the weather simple and efficient.
              </li>
            </ul>
          </section>

          <section>
            <h5>How It Works:</h5>
            <ol>
              <li>
                <strong>Enter Your Location:</strong> Type in your city or allow
                location access to automatically detect your area.
              </li>
              <li>
                <strong>View Current Conditions:</strong> Instantly see the
                latest weather data including temperature, conditions, and more.
              </li>
              <li>
                <strong>Explore the Forecast:</strong> Check out the hourly and
                daily forecasts to plan your day or week ahead.
              </li>
              <li>
                <strong>Save Locations:</strong> Add and manage multiple
                locations to stay updated no matter where you are.
              </li>
            </ol>
          </section>

          <section>
            <p>
              With Weather-Sense, you can effortlessly stay ahead of the weather
              and make informed decisions about your day. Experience weather
              forecasting like never before with our sleek and intuitive
              platform.
            </p>
          </section>
        </main>
      </div>
      <div className="auth-buttons">
        <button onClick={() => handleNavigate("login")}>Login</button>
        <button onClick={() => handleNavigate("register")}>Register</button>
      </div>
    </>
  );
};

export default Homepage;
