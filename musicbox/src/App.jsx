import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";
import Playlists from "./pages/Playlists"; 
import Profile from "./pages/Profile";
import Logo from "./assets/BOPPDLOGO.svg";
import ProfilePic from "./assets/profilepic.png";

function App() {
  return (
    <Router>
      <header
        style={{
          padding: "0.5rem",
          margin: "0.5rem",
          border: "1px solid white",
          borderRadius: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "1.2rem",
          }}
        >
          <img src={Logo} alt="BOPPD Logo" style={{ height: "35px" }} />
          <nav
            style={{
              display: "flex",
              gap: "2rem",
              fontFamily: "Roboto, sans-serif",
              fontWeight: 700,
            }}
          >
            <Link to="/" style={{ fontWeight: 700, textTransform: "uppercase" }}>
              Home
            </Link>
            <Link
              to="/reviews"
              style={{ fontWeight: 700, textTransform: "uppercase" }}
            >
              Reviews
            </Link>
            <Link
              to="/playlists"
              style={{ fontWeight: 700, textTransform: "uppercase" }}
            >
              Playlists
            </Link>
            <Link
              to="/profile"
              style={{
                fontWeight: 700,
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Profile
              <img
                src={ProfilePic}
                alt="Profile"
                style={{ width: "24px", height: "24px", borderRadius: "50%" }}
              />
            </Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/playlists" element={<Playlists />} /> 
        <Route path="/profile" element={<Profile />} />  
      </Routes>

      <footer
        style={{
          padding: "2rem",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "10px solid yellow",
        }}
      >
        <img src={Logo} alt="BOPPD Logo" style={{ height: "35px" }} />
        <p>By Paddy Studios</p>
      </footer>
    </Router>
  );
}

export default App;