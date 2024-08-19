import { useEffect, useState } from "react";
const useGeolocation = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    const handleSuccess = (position) => {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const handleError = (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setError("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          setError("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          setError("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          setError("An unknown error occurred.");
          break;
        default:
          setError("An error occurred.");
          break;
      }
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { position, error };
};

export default useGeolocation;
