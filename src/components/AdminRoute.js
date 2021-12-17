import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAdmin } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAdmin ? <Component {...props} /> : <Redirect to="/overview" />;
      }}
    ></Route>
  );
};
export default AdminRoute;
