import React, { useState, useEffect } from "react";
import { Button, Modal, Fade, Backdrop, Box, Typography } from "@mui/material";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


function Profile() {
  const navigate = useNavigate();
  const [image, setImage] = useState(""); // State to hold the base64 string for upload
  const [fetchedImage, setFetchedImage] = useState(""); // State to hold the fetched image
  const [selectedFile, setSelectedFile] = useState(null); // Optional: To display the file name
  const [open, setOpen] = useState(false);
  const [email, getEmail] = useState(""); // Modal state
  const authToken = localStorage.getItem("authToken"); // Replace with the actual auth token

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function to upload the image
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image before uploading!");
      return;
    }

    try {
      const response = await axios.put(
        "https://newz-r3dg.onrender.com/user/add-profile-photo",
        { userImage: image }, // Sending the base64 encoded image
        {
          headers: {
            Authorization: `Basic ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Upload successful:", response.data);
      alert("Image uploaded successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Error during upload:", err);
      alert("Error uploading the image. Please some other image.");
    }
  };


  const handleRemove = async () => {
    try {
      const response = await axios.delete(
        "https://newz-r3dg.onrender.com/user/remove-profile-image",
        {
          headers: {
            Authorization: `Basic ${authToken}`,
          },
        }
      );
      console.log("Image removed successfully:", response.data);
      alert("Image removed successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Error removing the image:", err);
      alert("Error removing the image. Please try again.");
    }
  };

  // Function to convert the selected file to Base64
  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file.name); // Store the file name (optional)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result); // Set the base64 encoded string
      };
      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
      };
    } else {
      alert("No file selected.");
    }
  };

  // Function to fetch the user's image from the database
  const fetchUserImage = async () => {
    try {
      const response = await axios.get(
        "https://newz-r3dg.onrender.com/user/get-profile-image",
        {
          headers: {
            Authorization: `Basic ${authToken}`,
          },
        }
      );
      setFetchedImage(response.data); // Set the fetched Base64 image
      console.log("Fetched image successfully:");
    } catch (err) {
      console.error("Error fetching the image:", err);
      alert("Error fetching the image. Please try again.");
    }
  };

  // Fetch the image when the component mounts
  const handleBack = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    fetchUserImage();
  }, []);

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
      <h1 className="profile-heading">
        {localStorage.getItem("name")}'s Profile
      </h1>
      <div className="profile-container">
        {fetchedImage ? (
          <img
            height={200}
            width={200}
            src={fetchedImage}
            alt="Fetched Profile"
            className="profile-image"
          />
        ) : (
          <img
            src="https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
            alt="Fetched Profile"
            className="profile-image"
          />
        )}

        <div className="upload-button-container">
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              backgroundColor: "#213555",
              padding: "10px 20px",
              color: "#d8c4b6",
              fontSize: "16px",
              fontFamily: "Oswald",
              letterSpacing: "2px",
              borderRadius: "10px",
              transition: "all 0.5s ease",
              "&:hover": {
                backgroundColor: "#d8c4b6",
                color: "#213555",
              },
            }}
            className="upload-button"
          >
            Upload Avatar
          </Button>
          <Button
          onClick={handleRemove}
            variant="contained"
            sx={{
              backgroundColor: "red",
              marginLeft: "10px",
              padding: "10px 20px",
              color: "#d8c4b6",
              fontSize: "16px",
              fontFamily: "Oswald",
              letterSpacing: "2px",
              borderRadius: "10px",
              transition: "all 0.5s ease",
              "&:hover": {
                backgroundColor: "#d8c4b6",
                color: "red",
              }}}
            className="remove-button"
          >
            Remove Avatar
          </Button>
        </div>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  fontFamily: "Oswald",
                  fontWeight: "bold",
                  color: "#213555",
                  textAlign: "center",
                  marginBottom: "20px",
                  fontSize: "24px",
                }}
              >
                Upload Your Profile Picture
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={convertToBase64}
                style={{ margin: "20px 0" }}
              />

              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#213555",
                  padding: "10px 20px",
                  color: "#d8c4b6",
                  fontSize: "16px",
                  fontFamily: "Oswald",
                  letterSpacing: "2px",
                  borderRadius: "10px",
                  transition: "all 0.5s ease",
                  "&:hover": {
                    backgroundColor: "#d8c4b6",
                    color: "#213555",
                  },
                }}
              >
                Upload
              </Button>
            </Box>
          </Fade>
        </Modal>

        <div className="profile-info">
          <h2 className="profile-info-heading">Name:</h2>
          <h2 className="profile-info-content">
            {localStorage.getItem("name").toUpperCase()}
          </h2>
        </div>
        <div className="profile-info">
          <h2 className="profile-info-heading">Username:</h2>
          <h2 className="profile-info-content">
            {localStorage.getItem("username").toUpperCase()}
          </h2>
        </div>
        <div className="profile-info">
          <h2 className="profile-info-heading">Email:</h2>
          <h2 className="profile-info-content">
            {localStorage.getItem("email")}
          </h2>
        </div>
        <div className="profile-info">
          <h2 className="profile-info-heading">Password:</h2>
          <h2 className="profile-info-content">********</h2>
        </div>
      </div>
    </>
  );
}

export default Profile;
