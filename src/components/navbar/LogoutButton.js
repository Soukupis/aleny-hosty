import React, {useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";

const LogoutButton = () => {
    const [error, setError] = useState("");
    const {logout} = useAuth();
    const history = useHistory();

    const handleLogout = async () => {
        setError("");
        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to log out");
        }
    };
    return (
        <>
            <i
                className="logout icon large link"
                style={{margin: "10px"}}
                onClick={handleLogout}
            ></i>
        </>
    );
};
export default LogoutButton;
