// src/components/TopAlbums.jsx
import { useEffect, useState } from "react";
import { fetchAlbum } from "../lib/spotify";

// Pick 4 favorite albums (change these anytime)
const topQueries = [
  { q: "album:Motomami artist:Rosalia" },
  { q: "album:DS2 artist:Future" },
  { q: "album:Take Care artist:Drake" },
  { q: "album:SOS artist:SZA" },
];

export default function TopAlbums() {
  const [albums, setAlbums] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const results = await Promise.all(
          topQueries.map((q) => fetchAlbum(q).catch(() => null))
        );
        const cleaned = results.filter(Boolean).filter((a) => a?.images?.[0]?.url);
        if (alive) setAlbums(cleaned);
      } catch (e) {
        console.error(e);
        if (alive) setErr("Could not load Top Albums.");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ marginBottom: "0.75rem", fontWeight: 300 }}>Top 4 Albums</h2>

      {err && (
        <div
          style={{
            padding: "1rem",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 12,
          }}
        >
          {err}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "1rem",
        }}
      >
        {(albums || Array.from({ length: 4 })).map((album, i) => {
          const isLoading = !album;
          const img = album?.images?.[0]?.url;

          return (
            <a
              key={album?.id || `skeleton-${i}`}
              href={album?.external_urls?.spotify || "#"}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                if (isLoading || !album?.external_urls?.spotify) e.preventDefault();
              }}
              style={{
                display: "block",
                borderRadius: 12,
                padding: "0.75rem",
                background: "#111",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {/* album cover */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: 10,
                  background: isLoading
                    ? "linear-gradient(90deg, #222 25%, #2a2a2a 37%, #222 63%)"
                    : `center/cover no-repeat url(${img})`,
                  marginBottom: "0.65rem",
                }}
              />
              {/* artist on top, album below */}
              {!isLoading && (
                <>
                  <p style={{ margin: 0, color: "#bbb", fontSize: "0.9rem" }}>
                    {album.artists.map((a) => a.name).join(", ")}
                  </p>
                  <p style={{ margin: "0.25rem 0 0", fontWeight: 500, fontSize: "1rem" }}>
                    {album.name}
                  </p>
                </>
              )}
            </a>
          );
        })}
      </div>
    </section>
  );
}