import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewsDashboard from "./pages/NewsDashboard";
import PrivateRoute from "./services/PrivateRoute";
import Contact from "./pages/Contact";
import Error from "./pages/Error";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact/>} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <NewsDashboard />
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
