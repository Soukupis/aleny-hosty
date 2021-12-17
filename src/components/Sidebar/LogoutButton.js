import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";

const LogoutButton = () => {
  const auth = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await auth.logout();
      history.push("/login");
    } catch {
      console.log("Failed to log out");
    }
  };
  return <Icon link name="sign-out" onClick={handleLogout} />;
};
export default LogoutButton;
