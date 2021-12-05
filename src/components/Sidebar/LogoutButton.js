import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("Failed to log out");
    }
  };
  return (
    <>
      <i
        className="logout icon large link"
        style={{ margin: "10px" }}
        onClick={handleLogout}
      ></i>
    </>
  );
};
export default LogoutButton;
