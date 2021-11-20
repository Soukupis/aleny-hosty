import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  HomePage,
  DashboardPage,
  LoginPage,
  OverviewPage,
  SizesPage,
  SunDemandsPage,
  WaterDemandsPage,
  FrostResistancePage,
  LocationsPage,
  CalendarPage,
  RecordsPage,
  AccountPage,
  SettingsPage,
} from "./pages";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute, PublicRoute } from "./components/index";

import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PublicRoute path="/login" component={LoginPage} />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <PrivateRoute path="/overview" component={OverviewPage} />
          <PrivateRoute path="/sizes" component={SizesPage} />
          <PrivateRoute path="/sun-demands" component={SunDemandsPage} />
          <PrivateRoute path="/water-demands" component={WaterDemandsPage} />
          <PrivateRoute
            path="/frost-resistance"
            component={FrostResistancePage}
          />
          <PrivateRoute path="/locations" component={LocationsPage} />
          <PrivateRoute path="/calendar" component={CalendarPage} />
          <PrivateRoute
            path="/frost-resistance"
            component={FrostResistancePage}
          />
          <PrivateRoute path="/records" component={RecordsPage} />
          <PrivateRoute path="/account" component={AccountPage} />
          <PrivateRoute path="/settings" component={SettingsPage} />
          <PublicRoute path="/" component={HomePage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
