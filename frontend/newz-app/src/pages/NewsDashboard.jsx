import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import { Alert, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

function NewsDashboard() {
  const [getNews, setNews] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const getLocalName = async (e) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:8080/admin/get-user", {
        headers: {
          method: "GET",
          Authorization: `Basic ${authToken}`,
          "Content-Type": "application/json",
        },
      });
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

  const fetchEntries = async (query = "top-news") => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:8080/auth/${query}`, {
        headers: {
          method: "GET",
          Authorization: `Basic ${authToken}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        const filteredNews = data.filter((entry) => entry.title !== "[Removed]");
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

  const darkMode = () => {
    const body = document.body;
    body.style.backgroundColor = "#000000";
    const heading = document.querySelector(".newz-dashboard-heading");
    heading.style.color = "#d8c4b6";
    body.style.transition = "all 1s ease";
  };
  const lightMode = () => {
    const body = document.body;
    body.style.backgroundColor = "#ffffff";
    const heading = document.querySelector(".newz-dashboard-heading");
    heading.style.color = "#213555";
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchEntries(searchQuery.trim()); // Fetch news using the search query
    } else {
      fetchEntries(); // Fetch default news if search input is empty
    }
  };

  useEffect(() => {
    fetchEntries();
    getLocalName(); // Fetch default news on component mount
  }, []);

  const handleLogOut = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
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
                    width: 72,
                    height: 72,
                    bgcolor: "#213555",
                    fontFamily: "Oswald",
                    fontSize: "30px",
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
            <MenuItem onClick={handleClose}>
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
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogOut}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
            <Divider />
            <label style={{padding:"10px",fontFamily:"Oswald",fontSize:"20px"}}>Switch Modes</label>
            <MenuItem>
              <Button
                onClick={darkMode}
                sx={{
                  backgroundImage:
                    "url('https://pnghq.com/wp-content/uploads/pnghq.com-simple-color-stroke-h-dra-2.png')",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  fontSize: "20px",
                  backgroundSize: "contain",
                  padding: "30px",
                  letterSpacing: "1px",
                  fontFamily: "Oswald",
                }}
              ></Button>
              <Button
                onClick={lightMode}
                sx={{
                  backgroundImage:
                    "url('https://png.pngtree.com/png-clipart/20201209/original/pngtree-sun-png-clipart-colored-png-image_5656301.png')",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  fontSize: "20px",
                  backgroundSize: "contain",
                  padding: "30px",
                  paddingLeft:"90px",
                  letterSpacing: "1px",
                  fontFamily: "Oswald",
                }}
              >
             
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
