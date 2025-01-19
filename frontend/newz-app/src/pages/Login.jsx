import React from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function Login() {
    const handleBack = () => {
        window.history.back();
    }
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
       onClick={handleBack}/>
      <div className="login-main">
        <div className="login-container">
          <img
            src="https://cdn.dribbble.com/users/1223630/screenshots/8115260/media/8145a871d9c4d67ec06e047ccc6574b4.gif"
            alt="Login Animation"
            className="login-animation"
          />
          <h1 className="login-title">Login</h1>

          <form id="loginForm" className="login-form">
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
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <br/>
            <br/>

            <label style={{fontSize:"20px"}}>Don't have an account? <Link href="/register">Register</Link></label>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
