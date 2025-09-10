import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Logo from "./assets/BOPPDLOGO.svg";

function Reviews() {
  return <h2 style={{ padding: "2rem" }}> Reviews Page</h2>;
}

function Playlists() {
  return <h2 style={{ padding: "2rem" }}>Playlists Page</h2>;
}

function Profile() {
  return <h2 style={{ padding: "2rem" }}>Profile Page</h2>;
}

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "1.2rem"}}>
          <img src={Logo} alt="BOPPD Logo" style={{ height: "35px" }} />
          <nav style={{ display: "flex", gap: "2rem", fontFamily: "Roboto, sans-serif", fontWeight: 700 }}>
            <Link to="/" style={{ fontWeight: 700, textTransform: "uppercase" }}>Home</Link>
            <Link to="/reviews" style={{ fontWeight: 700, textTransform: "uppercase"}}>Reviews</Link>
            <Link to="/playlists" style={{ fontWeight: 700, textTransform: "uppercase" }}>Playlists</Link>
            <Link to="/profile" style={{ fontWeight: 700, textTransform: "uppercase" }}>Profile</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;