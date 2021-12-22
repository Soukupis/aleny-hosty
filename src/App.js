import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  OverviewPage,
  SizesPage,
  SunDemandsPage,
  LocationsPage,
  AccountPage,
  SettingsPage,
  ColorsPage,
  BuyPlacesPage,
} from "./pages";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute, PublicRoute, AdminRoute } from "./components/index";

import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PublicRoute path="/login" component={LoginPage} />
          <PublicRoute path="/register" component={RegisterPage} />
          <PrivateRoute path="/overview" component={OverviewPage} />
          <AdminRoute path="/sun-demands" component={SunDemandsPage} />
          <AdminRoute path="/buy-places" component={BuyPlacesPage} />
          <AdminRoute path="/locations" component={LocationsPage} />
          <PrivateRoute path="/account" component={AccountPage} />
          <AdminRoute path="/sizes" component={SizesPage} />
          <AdminRoute path="/colors" component={ColorsPage} />
          <PrivateRoute path="/settings" component={SettingsPage} />
          <PublicRoute path="/" component={HomePage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
