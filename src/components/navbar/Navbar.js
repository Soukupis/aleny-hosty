import React from "react";
import logo from "../../assets/leaf.png";

const Navbar = () => {
  return (
    <div>
      <div
        className="ui bottom attached segment pushable"
        style={{ height: "100vh" }}
      >
        <div className="ui visible left vertical sidebar menu">
          <a className="item" style={{ display: "flex", textAlign: "center" }}>
            <img
              src={logo}
              alt="leaf-logo"
              className="ui circular image"
              style={{ height: "30px" }}
            />
            <div style={{ justifyContent: "center" }}>Aleny Hosty</div>
          </a>
          <a className="item">
            <i className="home icon"></i>
            Dashboard
          </a>
          <a className="item">
            <i className="block layout icon"></i>
            Topics
          </a>
          <a className="item">
            <i className="smile icon"></i>
            Friends
          </a>
          <a className="item">
            <i className="calendar icon"></i>
            History
          </a>
        </div>
        <div className="pusher">
          <div className="ui basic segment">
            <h3 className="ui header">Application Content</h3>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
