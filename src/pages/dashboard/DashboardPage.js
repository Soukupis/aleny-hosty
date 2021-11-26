import React from "react";
import { Sidebar } from "../../components";
import Card from "./components/Card";
import {
  SunImage,
  WaterImage,
  IceCubeImage,
  LocationImage,
  CalendarImage,
  RecordImage,
  SizeImage,
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
            title="Velikosti"
            collection="sizes"
            avatar={SizeImage}
            redirectTo={"sizes"}
          />
          <Card
            title="Nároky na slunce"
            collection="sun-demands"
            avatar={SunImage}
            redirectTo="sun-demands"
          />
          <Card
            title="Nároky na vláhu"
            collection="water-demands"
            avatar={WaterImage}
            redirectTo="water-demands"
          />
          <Card
            title="Mrazuvzdornost"
            collection="frost-resistance-items"
            avatar={IceCubeImage}
            redirectTo="frost-resistance"
          />
          <Card
            title="Umístění"
            collection="locations"
            avatar={LocationImage}
            redirectTo="locations"
          />
          <Card
            title="Kalendář"
            collection="calendar-items"
            avatar={CalendarImage}
            redirectTo="calendar"
          />
          <Card
            title="Evidence"
            collection="records"
            avatar={RecordImage}
            redirectTo="records"
          />
        </div>
      </Sidebar>
    </>
  );
};

export default DashboardPage;
