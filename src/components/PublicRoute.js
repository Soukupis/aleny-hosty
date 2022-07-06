import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PublicRoute = ({ component: Component, ...rest }) => {
  const { authentication } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return !authentication ? (
          <Component {...props} />
        ) : (
          <Redirect to="/overview" />
        );
      }}
    ></Route>
  );
};
export default PublicRoute;
