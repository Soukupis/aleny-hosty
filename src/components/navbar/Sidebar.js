import React from "react";
import logo from "../../assets/leaf.png";
import { LogoutButton } from "../index";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="ui left fixed vertical menu">
        <div className="item" style={{ display: "flex" }}>
          <img className="ui mini image" src={logo} />
          <div
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "10px",
            }}
          >
            Aleny Hosty
          </div>
        </div>
        <Link className="item" to="/overview">
          <i className="th icon"></i>
          Přehled
        </Link>
        <Link className="item" to="/sizes">
          <i className="sort numeric up icon"></i>
          Velikosti
        </Link>
        <Link className="item" to="sun-demands">
          <i className="sun icon"></i>
          Nároky na slunce
        </Link>
        <Link className="item" to="water-demands">
          <i className="tint icon"></i>
          Nároky na vláhu
        </Link>
        <Link className="item" to="frost-resistance">
          <i className="snowflake icon"></i>
          Mrazuvzdornost
        </Link>
        <Link className="item" to="location">
          <i className="map icon"></i>
          Umístění
        </Link>
        <Link className="item" to="calendar">
          <i className="calendar alternate icon"></i>
          Kalendář
        </Link>
        <Link className="item" to="records">
          <i className="book icon"></i>
          Evidence
        </Link>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
            display: "flex",
            margin: "10px",
          }}
        >
          <i className="user icon large link" style={{ margin: "10px" }}></i>
          <i
            className="settings icon large link"
            style={{ margin: "10px" }}
          ></i>
          <i
            className="paper plane icon large link"
            style={{ margin: "10px" }}
          ></i>
          <LogoutButton />
        </div>
      </div>
    </>
  );
};
export default Sidebar;
