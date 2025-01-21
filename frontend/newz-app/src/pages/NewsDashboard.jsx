import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import { Alert } from "@mui/material";

function NewsDashboard() {
  const [getNews, setNews] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [getName, setName] = useState(""); // State for search input

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
        const filteredNews = data.filter((entry) => entry.title != "[Removed]");
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

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
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
        <button onClick={handleLogOut} className="logout-button">
          {localStorage.getItem("name")} DEN
        </button>
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
        <button onClick={handleSearch} className="search-button">
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
