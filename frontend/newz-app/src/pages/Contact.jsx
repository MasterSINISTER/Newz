import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../styles/Contact.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
function Contact() {
  const navigate=useNavigate();
  const handleBack = () => {
    navigate("/");  
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
        }}
        onClick={handleBack}
      />
      <br />

      <div className="container">
        <div className="form_area">
          <h1
            className="contact-heading"
            style={{
              fontSize: "70px",
              fontFamily: "Oswald",
              color: "#213555",
              textAlign: "center",
              textShadow: "1px 1px 2px #000",
              textTransform: "uppercase",
              letterSpacing: "5px",
            }}
          >
            Contact
          </h1>
          <form action="">
            <div className="form_group">
              <label className="sub_title" for="name">
                Name
              </label>
              <input
                placeholder="Enter your full name"
                className="form_style"
                type="text"
              />
            </div>
            <div className="form_group">
              <label className="sub_title" for="email">
                Email
              </label>
              <input
                placeholder="Enter your email"
                id="email"
                className="form_style"
                type="email"
              />
            </div>
            <div className="form_group">
              <label className="sub_title" for="text-area">
                How can we Help?
              </label>
              <input
                placeholder="Enter the message"
                id="text-area"
                className="form_style-text-area"
                type="textarea"
              />
            </div>
            <div>
              <button className="btn">SUBMIT</button>
            </div>
          </form>
        </div>
        {/* <img
          src="https://i.postimg.cc/Pqvg2MsT/991efb87-f028-4d07-bc46-ef5922-unscreen.gif"
          alt=""
          className="contact-img"
        /> */}
      </div>
      <Footer />
    </>
  );
}

export default Contact;
