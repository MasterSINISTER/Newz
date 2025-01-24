import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewsDashboard from "./pages/NewsDashboard";
import PrivateRoute from "./services/PrivateRoute";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import SavedNews from "./pages/SavedNews";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/saved-news" element={<SavedNews/>} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <NewsDashboard />
              </PrivateRoute>
            }
          />
           <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/error" element={<Error/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
