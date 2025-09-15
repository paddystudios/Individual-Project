// src/components/RecentActivity.jsx
import { useEffect, useState } from "react";
import { fetchAlbum } from "../lib/spotify";
import Stars from "./Stars";

// 4 recent things (change freely)
const recentQueries = [
  { q: "album:Starboy artist:The Weeknd" },
  { q: "album:More Life artist:Drake" },
  { q: "album:Un Verano Sin Ti artist:Bad Bunny" },
  { q: "album:Full Moon artist:Brandy" },
];

// helper to generate a consistent-but-randomish rating 3–5
function seededRating(seedIndex) {
  const pool = [3, 3.5, 4, 4.5, 5];
  return pool[seedIndex % pool.length];
}

export default function RecentActivity() {
  const [albums, setAlbums] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const results = await Promise.all(
          recentQueries.map((q) => fetchAlbum(q).catch(() => null))
        );
        const cleaned = results.filter(Boolean).filter((a) => a?.images?.[0]?.url);
        if (alive) setAlbums(cleaned);
      } catch (e) {
        console.error(e);
        if (alive) setErr("Could not load Recent Activity.");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ marginBottom: "0.75rem", fontWeight: 300 }}>Recent Activities</h2>

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
          const stars = seededRating(i);

          return (
            <div
              key={album?.id || `skeleton-${i}`}
              style={{
                borderRadius: 12,
                padding: "0.75rem",
                background: "#111",
                textAlign: "center",
              }}
            >
              <a
                href={album?.external_urls?.spotify || "#"}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  if (isLoading || !album?.external_urls?.spotify) e.preventDefault();
                }}
                style={{ display: "block", textDecoration: "none", color: "inherit" }}
                title={album?.name || ""}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: 10,
                    background: isLoading
                      ? "linear-gradient(90deg, #222 25%, #2a2a2a 37%, #222 63%)"
                      : `center/cover no-repeat url(${img})`,
                    marginBottom: "0.5rem",
                  }}
                />
              </a>

              {/* Just rating, no text titles */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Stars value={stars} size={14} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}