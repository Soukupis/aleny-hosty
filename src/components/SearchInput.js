import React from "react";

const SearchInput = () => {
  return (
    <div className="ui search" style={{ marginRight: "10px" }}>
      <div className="ui icon input">
        <input
          className="prompt"
          type="text"
          placeholder="Search countries..."
        />
        <i className="search icon"></i>
      </div>
      <div className="results"></div>
    </div>
  );
};
export default SearchInput;
