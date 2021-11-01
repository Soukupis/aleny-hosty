import React from "react";
import logo from "../../assets/leaf.png";
import { LogoutButton } from "../index";

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
        <a className="item">
          <i className="th icon"></i>
          Přehled
        </a>
        <a className="item">
          <i className="sort numeric up icon"></i>
          Velikosti
        </a>
        <a className="item">
          <i className="sun icon"></i>
          Nároky na slunce
        </a>
        <a className="item">
          <i className="tint icon"></i>
          Nároky na vláhu
        </a>
        <a className="item">
          <i className="snowflake icon"></i>
          Mrazuvzdornost
        </a>
        <a className="item">
          <i className="map icon"></i>
          Umístění
        </a>
        <a className="item">
          <i className="calendar alternate icon"></i>
          Kalendář
        </a>
        <a className="item">
          <i className="book icon"></i>
          Evidenční čísla
        </a>
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
