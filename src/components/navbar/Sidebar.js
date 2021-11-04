import React, { useEffect, useState } from "react";
import logo from "../../assets/leaf.png";
import { LogoutButton } from "../index";
import { Link } from "react-router-dom";
import {
  SidebarHeader,
  HeaderTitle,
  SidebarFooter,
  SidebarFooterItem,
} from "./styles/SidebarStyle";

const Sidebar = ({ children }) => {
  const [menuWidth, setMenuWidth] = useState();
  useEffect(() => {
    setMenuWidth(document.getElementsByClassName("menu")[0].clientWidth);
  }, []);
  const openEmailClient = (e) => {
    window.location = "mailto:joseph.soukup@outlook.com";
    e.preventDefault();
  };
  return (
    <>
      <div id="top-menu" className="ui left fixed vertical menu">
        <Link to="/dashboard">
          <SidebarHeader className="item">
            <img className="ui mini image" alt="logo" src={logo} />
            <HeaderTitle>Aleny Hosty</HeaderTitle>
          </SidebarHeader>
        </Link>
        <Link className="item" to="/overview">
          <i className="th icon"></i>
          Přehled
        </Link>
        <Link className="item" to="/sizes">
          <i className="sort numeric up icon"></i>
          Velikosti
        </Link>
        <Link className="item" to="/sun-demands">
          <i className="sun icon"></i>
          Nároky na slunce
        </Link>
        <Link className="item" to="/water-demands">
          <i className="tint icon"></i>
          Nároky na vláhu
        </Link>
        <Link className="item" to="/frost-resistance">
          <i className="snowflake icon"></i>
          Mrazuvzdornost
        </Link>
        <Link className="item" to="/locations">
          <i className="map icon"></i>
          Umístění
        </Link>
        <Link className="item" to="/calendar">
          <i className="calendar alternate icon"></i>
          Kalendář
        </Link>
        <Link className="item" to="/records">
          <i className="book icon"></i>
          Evidence
        </Link>
        <SidebarFooter>
          <Link to="/account">
            <SidebarFooterItem className="user icon large link"></SidebarFooterItem>
          </Link>
          <Link to="/settings">
            <SidebarFooterItem className="settings icon large link"></SidebarFooterItem>
          </Link>
          <Link to="/email">
            <SidebarFooterItem
              className="paper plane icon large link"
              onClick={openEmailClient}
            ></SidebarFooterItem>
          </Link>
          <LogoutButton />
        </SidebarFooter>
      </div>
      <div
        style={{
          marginLeft: menuWidth,
        }}
      >
        <div className="ui basic segment">{children}</div>
      </div>
    </>
  );
};
export default Sidebar;
