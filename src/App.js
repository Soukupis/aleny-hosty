import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  OverviewPage,
  SizesPage,
  SunDemandsPage,
  LocationsPage,
  AccountPage,
  SettingsPage,
  WaterDemandsPage,
  ColorsPage,
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
          <PrivateRoute path="/overview" component={OverviewPage} />
          <PrivateRoute path="/sun-demands" component={SunDemandsPage} />
          <PrivateRoute path="/water-demands" component={WaterDemandsPage} />
          <PrivateRoute path="/locations" component={LocationsPage} />
          <PrivateRoute path="/account" component={AccountPage} />
          <PrivateRoute path="/sizes" component={SizesPage} />
          <PrivateRoute path="/colors" component={ColorsPage} />
          <PrivateRoute path="/settings" component={SettingsPage} />
          <PublicRoute path="/" component={HomePage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
