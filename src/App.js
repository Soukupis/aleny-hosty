import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage, DashboardPage, SignupPage, LoginPage } from "./pages";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/index";

import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
