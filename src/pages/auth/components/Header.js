import React from "react";
import { LeafImage } from "../../../assets/index";

const Header = () => {
  return (
    <div className="ui huge header" style={{ paddingBottom: "40px" }}>
      <img src={LeafImage} alt="leaf-logo" className="ui circular image" />
      Aleny Hosty
    </div>
  );
};
export default Header;
