import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";
import { debounce } from "lodash";
import { useEffect, useCallback, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocationsData,
  getAllLocationData,
} from "../../features/weather/weatherSlice";

import { useAuth } from "../../contexts/AuthContexts";

const SearchBar = ({ handleLocationChange }) => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const locationsData = useSelector(getAllLocationData);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (e) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(e.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputChange = useCallback(
    debounce(async (e) => {
      e.preventDefault();
      if (e.target.value !== "") {
        dispatch(fetchLocationsData(e.target.value));
      }
    }, 100)
  );

  const handleSelect = (location) => {
    handleLocationChange(location);
    setIsOpen(false);
  };
  return (
    <div className="searchContainer">
      <div
        className={`searchBar ${isAuthenticated ? "" : "disabled"}`}
        ref={searchRef}
      >
        <input
          id="search"
          type="text"
          placeholder="Search.."
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
        />
        <FiSearch className="searchIcon" />
      </div>
      {locationsData.length > 0 && isOpen && (
        <div className="locationList" ref={dropdownRef}>
          {locationsData.map((location) => (
            <div
              className="locationItem"
              key={location.id}
              onClick={() => handleSelect(location.name)}
            >
              <p onClick={() => handleSelect(location.name)}>{location.name}</p>
              <p key={location.id + location.region} className="locDetails">
                {location.region} {location.country}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
