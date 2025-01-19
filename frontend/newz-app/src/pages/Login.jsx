import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function Login() {
  const handleBack = () => {
    window.history.back();
  };

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/user/verify", {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password),
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const authToken = btoa(username + ":" + password);
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("username", username);
        navigate("/dashboard");
      } else {
        setError("Invalid username or password");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ArrowBackIcon
        className="back-icon"
        sx={{
          fontSize: 50,
          color: "#D8C4B6",
          backgroundColor: "#3E5879",
          borderRadius: "50px",
          cursor: "pointer",
          animation: "fadeIn 2s ease-in-out",
        }}
        onClick={handleBack}
      />
      <div className="login-main">
        <div className="login-container">
          <img
            src="https://cdn.dribbble.com/users/1223630/screenshots/8115260/media/8145a871d9c4d67ec06e047ccc6574b4.gif"
            alt="Login Animation"
            className="login-animation"
          />
          <br />
          <br />
          <h1 className="login-title">Login</h1>
          {error && <p className="error-message">{error}</p>}
          <form id="loginForm" className="login-form" onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label className="login-label" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="login-input"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login-input-group">
              <label className="login-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="login-input"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <br />
            <br />

            <label style={{ fontSize: "20px" }}>
              Don't have an account? <Link to="/register">Register</Link>
            </label>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
