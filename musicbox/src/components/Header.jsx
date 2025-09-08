import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
      <Link to="/reviews" style={{ marginRight: "1rem" }}>Reviews</Link>
      <Link to="/playlists" style={{ marginRight: "1rem" }}>Playlists</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}