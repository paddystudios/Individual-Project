import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

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
          padding: "1rem",
          background: "#111",
          borderBottom: "1px solid #333",
        }}
      >
        <nav style={{ display: "flex", gap: "2rem" }}>
          <Link to="/">Home</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/playlists">Playlists</Link>
          <Link to="/profile">Profile</Link>
        </nav>
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