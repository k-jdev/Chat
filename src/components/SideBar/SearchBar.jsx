import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import "../../styles/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Дебаунс-функция
  const debouncedSearch = useCallback(
    debounce((value) => {
      if (onSearch) {
        onSearch(value);
      }
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value); // Вызываем дебаунс вместо onSearch
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Знайти чат"
        className="search-bar__input"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
