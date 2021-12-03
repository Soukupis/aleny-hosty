import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  HomePage,
  DashboardPage,
  LoginPage,
  OverviewPage,
  SizesPage,
  SunDemandsPage,
  FrostResistancePage,
  LocationsPage,
  AccountPage,
  SettingsPage,
  RecentPage,
  WaterDemandsPage,
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
          <PrivateRoute path="/recents" component={RecentPage} />
          <PrivateRoute path="/overview" component={OverviewPage} />
          <PrivateRoute path="/sun-demands" component={SunDemandsPage} />
          <PrivateRoute path="/water-demands" component={WaterDemandsPage} />
          <PrivateRoute path="/locations" component={LocationsPage} />
          <PrivateRoute
            path="/frost-resistance"
            component={FrostResistancePage}
          />
          <PrivateRoute path="/account" component={AccountPage} />
          <PrivateRoute path="/settings" component={SettingsPage} />
          <PublicRoute path="/" component={HomePage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
