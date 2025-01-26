import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Button, Alert } from "@mui/material";

function SavedNews() {
  const [savedNews, setSavedNews] = useState([]);

  const [fetchedImage, setFetchedImage] = useState(""); // State to hold the fetched image

  const handleBack = () => {
    navigate("/dashboard");
  };
  const fetchUserImage = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
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
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const getSavedNews = async () => {
    try {
      fetchUserImage();
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("https://newz-r3dg.onrender.com/auth/get-news", {
        headers: {
          method: "GET",
          Authorization: `Basic ${authToken}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setSavedNews(data);
      } else {
        if (response.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("name");
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          window.location.href = "/";
        }
      }
    } catch (err) {
      console.log(err);
      alert("Something Went Wrong !");
    }
  };

  const removeNews = async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`https://newz-r3dg.onrender.com/auth/delete/${id}`, {
        method: "DELETE",
        headers: {
          method: "DELETE",
          Authorization: `Basic ${authToken}`,
        },
      });
      if (response.status === 200) {
        getSavedNews();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogOut = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  const applyTheme = (theme) => {
    const body = document.body;
    const heading = document.querySelector(".newz-dashboard-heading");

    if (theme === "dark") {
      body.style.backgroundColor = "#000000";
      body.style.color = "#FFFFFF";
      heading.style.color = "#d8c4b6";
    } else {
      body.style.backgroundColor = "#F5EFE7";
      body.style.color = "#000000";
      heading.style.color = "#213555";
    }
  };

  // Function to set dark mode
  const darkMode = () => {
    localStorage.setItem("theme", "dark");
    applyTheme("dark");
  };

  // Function to set light mode
  const lightMode = () => {
    localStorage.setItem("theme", "light");
    applyTheme("light");
  };

  useEffect(() => {
    getSavedNews();
    applyTheme(localStorage.getItem("theme"));
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
      <div className="dashboard-header">
        <img
          src="https://i.postimg.cc/fyW1zRYH/image-processing20210528-9634-unscreen.gif"
          alt=""
          className="img-dashboard"
        />
        <h1 className="newz-dashboard-heading">Saved News</h1>
        {/* <button onClick={handleLogOut} className="logout-button">
          {localStorage.getItem("name")} DEN
        </button> */}
        <React.Fragment>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="large"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  sx={{
                    width: 100,
                    height: 95,
                    border: "2px solid #213555",
                    bgcolor: "#213555",
                    fontFamily: "Oswald",
                    fontSize: "30px",
                    content: `url(${fetchedImage})`,
                  }}
                >
                  {localStorage.getItem("name").charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 0.7,
                  ml: 8,
                  borderRadius: "10px",
                  padding: "10px",
                  color: "#213555",

                  "& .MuiAvatar-root": {
                    width: 42,
                    height: 42,
                    ml: -0.5,
                    mr: 2.5,
                    padding: 0.5,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          >
            <MenuItem onClick={navigateToProfile}>
              <Avatar />{" "}
              <label
                style={{
                  fontSize: "20px",
                  letterSpacing: "1px",
                  fontFamily: "Oswald",
                }}
              >
                {localStorage.getItem("name").toUpperCase()}'s Den
              </label>
            </MenuItem>
            <Divider />
            <Link
              to={"/dashboard"}
              style={{ textDecoration: "none", color: "#213555" }}
            >
              <MenuItem>
                <ListItemIcon>
                  <NewspaperIcon fontSize="medium" />
                </ListItemIcon>
                Dashboard
              </MenuItem>
            </Link>
            <MenuItem onClick={handleLogOut}>
              <ListItemIcon>
                <Logout fontSize="medium" />
              </ListItemIcon>
              Logout
            </MenuItem>
            <Divider />
            <label
              style={{
                padding: "10px",
                fontFamily: "Oswald",
                fontSize: "20px",
              }}
            >
              Switch Modes
            </label>
            <MenuItem>
              <Button onClick={darkMode}>
                <DarkModeIcon
                  sx={{
                    color: "#213555",
                    fontSize: "50px",
                    transition: "all 1s ease",

                    "&:hover": {
                      color: "black",
                    },
                  }}
                />
              </Button>
              <Button onClick={lightMode}>
                <LightModeIcon
                  sx={{
                    color: "#213555",
                    fontSize: "50px",
                    marginLeft: "30px",
                    transition: "all 1s ease",
                    "&:hover": {
                      color: "#FFAA33	",
                    },
                  }}
                />
              </Button>
            </MenuItem>
          </Menu>
        </React.Fragment>
      </div>

      {/* Search bar section */}
      {/* {error && <p className="error-message">{error}</p>} */}
      <Alert severity="warning" className="error-message" sx={{ opacity: "0" }}>
        {error}
      </Alert>

      {savedNews.length > 0 ? (
        <div className="cards-container">
          {savedNews.map((entry) => (
            <div className="card" key={entry.newsID}>
              <div className="card-image">
                <img
                  src={entry.urlToImage}
                  alt={entry.title}
                  className="card-image-main"
                />
              </div>
              <hr />
              <h2 className="card-title">{entry.title}</h2>
              <p className="card-content">
                <hr />
                {entry.description}
              </p>
              <p className="card-author">Author: {entry.author}</p>
              <p className="card-source">
                Source: <strong>{entry.source?.name || "Unknown"}</strong>
              </p>
              <p className="card-date">
                Published At:{" "}
                <span className="date">
                  {new Date(entry.publishedAt).toLocaleString()}
                </span>
              </p>
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
              >
                Read More
              </a>
              <div className="footer">
                Written by{" "}
                <span className="by-name">{entry.author || "Unknown"}</span> on{" "}
                <span className="date">
                  {new Date(entry.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <Button
                onClick={() => removeNews(entry.newsID)}
                sx={{
                  fontSize: "25px",
                  marginTop: "30px",
                  fontFamily: "Oswald",
                  padding: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginLeft: "auto",
                  marginRight: "auto",
                  border: "2px solid red",
                  color: "red",
                  borderRadius: "10px",
                  transition: "all 1s ease",
                  "&:hover": {
                    color: "#d8c4b6",
                    backgroundColor: "red",
                  },
                }}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="container-loader">
          <div class="loader">
            <svg viewBox="0 0 80 80">
              <circle r="32" cy="40" cx="40" id="test"></circle>
            </svg>
          </div>

          <div class="loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>

          <div class="loader">
            <svg viewBox="0 0 80 80">
              <rect height="64" width="64" y="8" x="8"></rect>
            </svg>
          </div>
        </div>
      )}
    </>
  );
}

export default SavedNews;
