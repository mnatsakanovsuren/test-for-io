import React from "react";
import PropTypes from "prop-types";

import searchIcon from "../images/search.png"

const SearchComponent = ({ searchValue, handleSearchChange }) => {
  return (
      <div className="users-search">
          <img src={searchIcon} alt="Search"/>
          <input
              type="text"
              placeholder="Поиск авторов по имени"
              value={searchValue}
              onChange={handleSearchChange} />
      </div>
  );
};

SearchComponent.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired
};

export default SearchComponent;
