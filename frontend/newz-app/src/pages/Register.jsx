import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../styles/Register.css";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // Added confirmPassword field
  });

  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Check if password is long enough
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Check if username is long enough
    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/public/add-user",
        {
          username: formData.username,
          password: formData.password,
          email: formData.email,
        }
      );

      if (response.status === 200) {
        console.log("User Created!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleBack = () => {
    window.history.back();
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
        }}
        onClick={handleBack}
      />
      <div className="register-main">
        <div className="register-container">
          <img
            src="https://cdn.dribbble.com/users/2002721/screenshots/4381085/media/135be0fdab0b0b925cc08b04bc5abac5.gif"
            alt="Login Animation"
            className="register-animation"
          />
          <br/>
          <br/>
          <h1 className="register-title">Register</h1>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          <form
            id="registerForm"
            className="register-form"
            onSubmit={handleSubmit}
          >
            <div className="register-input-group">
              <label className="register-label" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="register-input"
                required
                onChange={handleChange}
              />
            </div>

            <div className="register-input-group">
              <label className="register-label" htmlFor="email">
                Email ID
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="register-input"
                required
                onChange={handleChange}
              />
            </div>

            <div className="register-input-group">
              <label className="register-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="register-input"
                required
                onChange={handleChange}
              />
            </div>

            <div className="register-input-group">
              <label className="register-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="register-input"
                required
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="register-button">
              Register
            </button>

            <label style={{ fontSize: "20px", textDecoration: "none" }}>
              <br></br>
              Already have an account? <Link to="/login">Login</Link>
            </label>
          </form>
        </div>
      </div>
    </>
  );
}
