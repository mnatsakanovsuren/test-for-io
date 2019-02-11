import React from "react";
import PropTypes from "prop-types";

const SearchComponent = ({ searchValue, handleSearchChange }) => {
  return (
    <input type="text" value={searchValue} onChange={handleSearchChange} />
  );
};

SearchComponent.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired
};

export default SearchComponent;
