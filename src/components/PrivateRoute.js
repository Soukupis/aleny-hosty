import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, admin, ...rest }) => {
  const { authentication } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return authentication ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
};
export default PrivateRoute;
