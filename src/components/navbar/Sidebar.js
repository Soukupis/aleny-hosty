import React from "react";
import logo from "../../assets/leaf.png";
import { LogoutButton } from "../index";
import { Link } from "react-router-dom";
import {
  SidebarHeader,
  HeaderTitle,
  SidebarFooter,
  SidebarFooterItem,
} from "./styles/SidebarStyle";

const Sidebar = () => {
  return (
    <>
      <div className="ui left fixed vertical menu">
        <SidebarHeader className="item">
          <img className="ui mini image" src={logo} />
          <HeaderTitle>Aleny Hosty</HeaderTitle>
        </SidebarHeader>
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
        <SidebarFooter>
          <SidebarFooterItem className="user icon large link"></SidebarFooterItem>
          <SidebarFooterItem className="settings icon large link"></SidebarFooterItem>
          <SidebarFooterItem className="paper plane icon large link"></SidebarFooterItem>
          <LogoutButton />
        </SidebarFooter>
      </div>
    </>
  );
};
export default Sidebar;
