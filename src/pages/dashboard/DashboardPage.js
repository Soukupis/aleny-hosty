import React from "react";
import { Sidebar } from "../../components";
import Card from "./components/Card";
import {
  SunImage,
  WaterImage,
  IceCubeImage,
  LocationImage,
  OverviewImage,
  ClockImage,
} from "../../assets/index";

const DashboardPage = () => {
  return (
    <>
      <Sidebar>
        <div className="ui link cards">
          <Card
            title="Naposledy navštívené"
            collection="last-visited"
            avatar={ClockImage}
            redirectTo={"recents"}
          />
          <Card
            title="Přehled"
            collection="hostas"
            avatar={OverviewImage}
            redirectTo={"overview"}
          />
          <Card
            title="Nároky na slunce"
            collection="sunDemands"
            avatar={SunImage}
            redirectTo="sun-demands"
          />
          <Card
            title="Nároky na vláhu"
            collection="waterDemands"
            avatar={WaterImage}
            redirectTo="water-demands"
          />
          <Card
            title="Mrazuvzdornost"
            collection="frostResistanceItems"
            avatar={IceCubeImage}
            redirectTo="frost-resistance"
          />
          <Card
            title="Umístění"
            collection="locations"
            avatar={LocationImage}
            redirectTo="locations"
          />
        </div>
      </Sidebar>
    </>
  );
};

export default DashboardPage;
