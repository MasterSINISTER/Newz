import React from "react";

function NewsDashboard() {
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };
  return (
    <div>
      <h1>
        Welcome to DashBoard {localStorage.getItem("username").toUpperCase()}
      </h1>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  );
}

export default NewsDashboard;
