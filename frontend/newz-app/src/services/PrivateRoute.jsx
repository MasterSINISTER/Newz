
import React from "react";

import Error from "../pages/Error";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  if (isAuthenticated) {
    return children;
  } else {
    return <Error 
    error="Unauthorized Access !"
    errorCode="401"
    subheading="Unauthorized Access !"
    description="You are not authorized to access this page. Please login to continue."
    goto="Login"
    gotoLink="/login"
    />
  }
  //   return isAuthenticated ? children :
  //   <Navigate to="/" />;
};

export default PrivateRoute;
