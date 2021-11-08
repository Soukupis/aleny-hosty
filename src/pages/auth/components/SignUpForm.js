import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const usersCollectionRef = db.collection("users");

  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }
    if (/\d/.test(firstName)) {
      return setError("Firstname can't contain a number");
    }
    if (/\d/.test(lastName)) {
      return setError("Lastname can't contain a number");
    }

    try {
      setLoading(true);
      setError("");
      await createUser();
      await signup(email, password);
      history.push("/dashboard");
    } catch {
      setError("Failed to create and account");
    }
    setLoading(false);
  };

  const createUser = async () => {
    await usersCollectionRef.add({
      firstname: firstName,
      lastname: lastName,
      username: username,
      email: email,
    });
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
      <form className="ui large form" onSubmit={handleSubmit}>
        <h4 className="ui dividing header">Create your account</h4>
        <div className="field">
          <div className="ui left icon input">
            <input
              type="text"
              placeholder="Jméno"
              name="firstname"
              onChange={(event) => setFirstName(event.target.value)}
            />
            <i className="user icon"></i>
          </div>
        </div>
        <div className="field">
          <div className="ui left icon input">
            <input
              type="text"
              placeholder="Příjmení"
              name="lastname"
              onChange={(event) => setLastName(event.target.value)}
            />
            <i className="users icon"></i>
          </div>
        </div>
        <div className="field">
          <div className="ui left icon input">
            <input
              type="text"
              placeholder="Uživatelské jméno"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
            />
            <i className="id card icon"></i>
          </div>
        </div>
        <div className="field">
          <div className="ui left icon input">
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <i className="envelope icon"></i>
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
        <div className="field">
          <div className="ui left icon input">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password-confirm"
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
            <i className="lock icon"></i>
          </div>
        </div>
        <button
          className="ui fluid large green submit button"
          disabled={loading}
        >
          Register
        </button>
      </form>
      <div className="ui card" style={{ width: "100%" }}>
        <div className="content">
          Already have an account? <Link to="/login"> Sign in</Link>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
