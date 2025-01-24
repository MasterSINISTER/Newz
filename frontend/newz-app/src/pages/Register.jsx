import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../styles/Register.css";
import axios from "axios";
import { Alert } from "@mui/material";
import BlurText from "../blocks/TextAnimations/BlurText/BlurText";

export default function Register() {
  const [formData, setFormData] = React.useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Added confirmPassword field
  });

  const [error, setError] = React.useState(null);
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
      const enableError = document.querySelector(".error-message");
      enableError.style.opacity = "1";
      setError("Password don't Match");
      setTimeout(() => {
        setError("");
        enableError.style.opacity = "0";
      }, 3000);
      return;
    }

    // Check if password is long enough
    if (formData.password.length < 6) {
      const enableError = document.querySelector(".error-message");
      enableError.style.opacity = "1";
      setError("Please Enter Strong Password");
      setTimeout(() => {
        setError("");
        enableError.style.opacity = "0";
      }, 3000);
      return;
    }

    // Check if username is long enough
    if (formData.username.length < 3) {
      const enableError = document.querySelector(".error-message");
      enableError.style.opacity = "1";
      setError("Username must be more than 3 words");
      setTimeout(() => {
        setError("");
        enableError.style.opacity = "0";
      }, 3000);
      return;
    }

    try {
      const response = await axios.post(
        "https://newz-3vq4.onrender.com/public/add-user",
        {
          name: formData.name,
          username: formData.username,
          password: formData.password,
          email: formData.email,
        }
      );

      const emailValidation = await axios.get(
        "https://newz-3vq4.onrender.com/user/email-verify",
        {
          headers: {
            Authorization:
              "Basic " + btoa(formData.username + ":" + formData.password),
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && emailValidation.status === 200) {
        const enableError = document.querySelector(".success-message");
        enableError.style.opacity = "1";
        setError("Welcome to Family !");
        setTimeout(() => {
          setError("");
          enableError.style.opacity = "0";
          navigate("/login");
        }, 3000);
      }
      else{
        const enableError = document.querySelector(".error-message");
        enableError.style.opacity = "1";
        setError("Please Check Credetials Validation"); 
        setTimeout(() => {
          setError("");
          enableError.style.opacity = "0";
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      const enableError = document.querySelector(".error-message");
      enableError.style.opacity = "1";
      setError("Something Went Wrong !");
      setTimeout(() => {
        setError("");
        enableError.style.opacity = "0";
      }, 3000);
    }
  };

  const handleBack = () => {
    navigate("/");
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
          <br />
          <br />
          {/* <h1 className="register-title">Register</h1> */}
          <BlurText
            text="Register"
            delay={350}
            animateBy="letters"
            direction="bottom"
            // onAnimationComplete={handleAnimationComplete}
            className="register-title"
          />

          {/* Error Message */}
          {/* {error && <p className="error-message">{error}</p>} */}
          <Alert
            variant="outlined"
            severity="error"
            className="error-message"
            sx={{ opacity: 0 }}
          >
            {error}
          </Alert>
          <Alert
            variant="outlined"
            severity="success"
            className="success-message"
            sx={{ opacity: 0 }}
          >
            {error}
          </Alert>

          <form
            id="registerForm"
            className="register-form"
            onSubmit={handleSubmit}
          >
            <div className="register-input-group">
              <label className="register-label" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="register-input"
                required
                onChange={handleChange}
              />
            </div>
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
