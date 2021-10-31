import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      history.push("/dashboard");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  };

  return (
    <>
      {error ? (
        <div className="ui error message">
          <div className="content">
            <div className="header">{error}</div>
          </div>
        </div>
      ) : null}
      <form className="ui large form error" onSubmit={handleSubmit}>
        <h4 className="ui dividing header">Log In</h4>
        <div className="field">
          <div className="ui left icon input">
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              onChange={(event) => setEmail(event.target.value)}
            />
            <i className="user icon"></i>
          </div>
        </div>
        <div className="field">
          <div className="ui left icon input">
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <i className="lock icon"></i>
          </div>
        </div>
        <button
          className="ui fluid large green submit button"
          disabled={loading}
        >
          Log In
        </button>
      </form>
      <div className="ui card" style={{ width: "100%" }}>
        <div className="content">
          New here? <Link to="/register"> Create an account.</Link>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
