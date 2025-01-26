import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import { Alert, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import CheckIcon from "@mui/icons-material/Check";

import NewspaperIcon from "@mui/icons-material/Newspaper";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AlertDialog from "../components/AlertDialog";

function NewsDashboard() {
  const [fetchedImage, setFetchedImage] = useState(""); // State to hold the fetched image

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
  const [getNews, setNews] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const getLocalName = async (e) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        "https://newz-r3dg.onrender.com/admin/get-user",
        {
          headers: {
            method: "GET",
            Authorization: `Basic ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("name", data.name);
      }
    } catch (err) {
      console.log("ERROR");
    }
  };

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

  const [saveNews, setSaveNews] = useState([]);
  const handleSavedNews = (id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = fetch(
        `https://newz-r3dg.onrender.com/auth/save-news/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${authToken}`,
          },
        }
      );
      console.log(response);

      if (response.ok) {
        console.log("News Saved !");
        alert("News saved successfully!");
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 3000);
      } else {
        console.log("News Saved !");
        alert("News saved successfully!");
        setTimeout(() => {
        },3000)
      }
    } catch (err) {
      console.log("ERROR");
    }
  };
  const fetchEntries = async (query = "top-news") => {
    try {
      fetchUserImage();
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `https://newz-r3dg.onrender.com/auth/${query}`,
        {
          headers: {
            method: "GET",
            Authorization: `Basic ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        const filteredNews = data.filter(
          (entry) => entry.title !== "[Removed]"
        );
        setNews(filteredNews);
        setError("");
      } else if (response.status === 401) {
        const enableError = document.querySelector(".error-message");
        enableError.style.opacity = "1";
        setError("Unauthorized Access !");
        setTimeout(() => {
          setError("");
          enableError.style.opacity = "0";
        }, 3000);
      } else {
        const enableError = document.querySelector(".error-message");
        enableError.style.opacity = "1";
        setError("Something Went Wrong Try Again !");
        setTimeout(() => {
          setError("");
          enableError.style.opacity = "0";
        }, 3000);
      }
    } catch (error) {
      const enableError = document.querySelector(".error-message");
      enableError.style.opacity = "1";
      setError("Failed Fetching News");
      setTimeout(() => {
        setError("");
        enableError.style.opacity = "0";
      }, 3000);
    }
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

  // On component load, apply the saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"; // Default to light mode
    applyTheme(savedTheme);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchEntries(searchQuery.trim()); // Fetch news using the search query
    } else {
      fetchEntries(); // Fetch default news if search input is empty
    }
  };

  useEffect(() => {
    fetchEntries();
    getLocalName();
    applyTheme(localStorage.getItem("theme") || "light");
  }, []);

  const handleLogOut = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="dashboard-header">
        <img
          src="https://i.postimg.cc/3xK7W01x/monkey-unscreen.gif"
          alt=""
          className="img-dashboard"
        />
        <h1 className="newz-dashboard-heading">Today's Top</h1>
        {/* <button onClick={handleLogOut} className="logout-button">
          {localStorage.getItem("name")} DEN
        </button> */}
        <React.Fragment>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            {showDialog && <AlertDialog message="News Saved Successfully!" />}
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
                  }}
                  className="avatar"
                >
                  {fetchedImage ? (
                    <img
                      src={fetchedImage}
                      alt="Avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    localStorage.getItem("name").charAt(0).toUpperCase()
                  )}
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
                    content: `url(${fetchedImage})`,
                    imageRendering: "OptimizeQuality",
                    "@media screen and (max-width: 768px)": {
                      width: 42,
                      height: 42,
                      overflow: "hidden",
                    },
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
              to={"/saved-news"}
              style={{ textDecoration: "none", color: "#213555" }}
            >
              <MenuItem>
                <ListItemIcon>
                  <NewspaperIcon fontSize="medium" />
                </ListItemIcon>
                Saved News
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
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for news..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={handleSearch} className="search-button" type="submit">
          Explore
        </button>
      </div>

      {/* {error && <p className="error-message">{error}</p>} */}
      <Alert severity="warning" className="error-message" sx={{ opacity: "0" }}>
        {error}
      </Alert>

      {getNews.length > 0 ? (
        <div className="cards-container">
          {getNews.map((entry) => (
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
              <br></br>
              <br></br>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "30px",
                  marginTop: "auto",
                  padding: "10px",
                }}
              >
                <BookmarkIcon
                  onClick={() => handleSavedNews(entry.newsID)}
                  sx={{
                    backgroundColor: "#FFAA33",
                    color: "#213555",
                    marginTop: "auto",
                    fontSize: "50px",
                    padding: "10px",
                    cursor: "pointer",
                    borderRadius: "50%",
                    transition: "all 1s ease",
                    "&:hover": {
                      backgroundColor: "#E1C16E",
                      color: "#213555",
                    },
                  }}
                ></BookmarkIcon>
                <label className="success-message" style={{ marginTop: "auto", opacity: "0" }}>
                  Saved !
                </label>
              </div>
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

export default NewsDashboard;
