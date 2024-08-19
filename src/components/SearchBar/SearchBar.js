import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="searchBar">
      <input type="text" placeholder="Search.." />
      <FiSearch className="searchIcon" />
    </div>
  );
};

export default SearchBar;
