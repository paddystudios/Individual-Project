import { useEffect, useState } from "react";
import { fetchAlbum } from "../lib/spotify";

const albumQueries = [
  { q: "album:Certified Lover Boy artist:Drake" },
  { q: "album:Full Moon artist:Brandy" },
  { q: "album:Heaven knows artist:PinkPantheress" },
  { q: "album:SOS artist:SZA" },
];

export default function Home() {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await Promise.all(albumQueries.map((query) => fetchAlbum(query)));
        setAlbums(data);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>🎵 Featured Albums</h1>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!error && albums.length === 0 && <p>Loading albums…</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {albums.map((album) => (
          <div
            key={album.id}
            style={{
              border: "0.5px solid white",
              borderRadius: "12px",
              padding: "1rem",
              textAlign: "center",
              backgroundColor: "#111",
            }}
          >
            <img
              src={album.images[0]?.url}
              alt={album.name}
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            />
            <h2 style={{ fontSize: "1.1rem", margin: 0 }}>{album.name}</h2>
            <p style={{ color: "#bbb", margin: "0.35rem 0 0.5rem" }}>
              {album.artists.map((a) => a.name).join(", ")}
            </p>
            <p style={{ fontSize: "0.85rem", color: "#888", margin: 0 }}>
              {album.release_date}
            </p>
            <p style={{ marginTop: "0.75rem" }}>
              <a href={album.external_urls.spotify} target="_blank" rel="noreferrer">
                Open in Spotify
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}