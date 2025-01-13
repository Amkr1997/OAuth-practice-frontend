import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Register from "./pages/Register";
import RefresherHandler from "./components/RefresherHandler";
import PrivateRoute from "./components/PrivateRoute";
import UserDetails from "./pages/UserDetails";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <RefresherHandler />
          <Routes>
            <Route path="/" element={<PrivateRoute element={<Home />} />} />

            <Route
              path="/all/authors"
              element={<PrivateRoute element={<Users />} />}
            />
            <Route
              path="/userDetails/:authorId"
              element={<PrivateRoute element={<UserDetails />} />}
            />
            <Route
              path="/v2/profile/google"
              element={<PrivateRoute element={<Profile />} />}
            />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
