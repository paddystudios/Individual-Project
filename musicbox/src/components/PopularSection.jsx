// src/components/PopularSection.jsx
import { useEffect, useState } from "react";
import { fetchAlbum } from "../lib/spotify";

const popularQueries = [
  { q: "album:The Tortured Poets Department artist:Taylor Swift" },
  { q: "album:UTOPIA artist:Travis Scott" },
  { q: "album:GUTS artist:Olivia Rodrigo" },
  { q: "album:SOS artist:SZA" },
  { q: "album:Un Verano Sin Ti artist:Bad Bunny" },
  { q: "album:One Thing At A Time artist:Morgan Wallen" },
];

export default function PopularSection() {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await Promise.all(popularQueries.map((q) => fetchAlbum(q)));
        setAlbums(data);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <section style={{ width: "100%", marginTop: "2rem" }}>
      <h2 style={{ marginBottom: "0.5rem", fontSize: "1.35rem", fontWeight: 600 }}>
        POPULAR THIS WEEK
      </h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!error && albums.length === 0 && <p>Loading…</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "1rem",
        }}
      >
        {albums.map((album) => (
          <a
            key={album.id}
            href={album.external_urls.spotify}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={album.images[0]?.url}
              alt={album.name}
              style={{
                width: "100%",
                borderRadius: "12px",
                objectFit: "cover",
              }}
            />
          </a>
        ))}
      </div>
    </section>
  );
}