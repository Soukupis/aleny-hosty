import React from "react";
import logo from "../../../assets/leaf.png";

const Header = () => {
  return (
    <div className="ui huge header" style={{ paddingBottom: "40px" }}>
      <img src={logo} alt="leaf-logo" className="ui circular image" />
      Aleny Hosty
    </div>
  );
};
export default Header;
