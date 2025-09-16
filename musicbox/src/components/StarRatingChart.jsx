// src/components/StarRatingChart.jsx
import { useEffect, useState } from "react";
import { fetchAlbum } from "../lib/spotify";

// 4 recent things (change freely)
const recentQueries = [
  { q: "album:Starboy artist:The Weeknd" },
  { q: "album:Views artist:Drake" },
  { q: "album:Un Verano Sin Ti artist:Bad Bunny" },
  { q: "album:Full Moon artist:Brandy" },
];

// helper to generate a consistent-but-randomish rating 3–5
function seededRating(seedIndex) {
  const pool = [1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5];
  return pool[seedIndex % pool.length];
}

export default function StarRatingChart({ count = 40, barColor = "yellow" }) {
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
        if (alive) setErr("Could not load rating chart.");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Build a rating distribution from the same seeded rating logic
  const items = Array.from({ length: count }).map((_, i) => seededRating(i));
  const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  items.forEach((v) => {
    const star = Math.min(5, Math.max(1, Math.round(v))); // round 3.5→4, 4.5→5
    dist[star] += 1;
  });

  const maxCount = Math.max(...Object.values(dist));
  const total = items.length || 1;
  const topStar = (Object.entries(dist).sort((a, b) => b[1] - a[1])[0] || [4])[0];

  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h3 style={{ marginBottom: "0.5rem", marginLeft: "10px", fontWeight: 300 }}>
        Rating distribution
      </h3>

      {err && (
        <div
          style={{
            padding: "0.75rem",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 12,
            marginBottom: "0.75rem",
          }}
        >
          {err}
        </div>
      )}

      <div style={{ padding: "0.75rem" }}>
        {[1, 2, 3, 4, 5].map((star) => {
          const count = dist[star];
          const widthPct = maxCount ? (count / maxCount) * 100 : 0;
          return (
            <div key={star} style={{ marginBottom: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: 28, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                  {star}★
                </span>
                <div
                  aria-label={`${count} of ${total} rated ${star} stars`}
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 6,
                    background: "rgba(255,255,255,0.08)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: `${widthPct}%`,
                      background: barColor,
                    }}
                  />
                </div>
                <span style={{ width: 28, textAlign: "left", fontVariantNumeric: "tabular-nums" }}>
                  {count}
                </span>
              </div>
            </div>
          );
        })}

        <p style={{ marginTop: "0.5rem", marginLeft: "10px", opacity: 0.9 }}>
          Mostly <strong>{topStar}</strong>-star rated albums.
        </p>
      </div>
    </section>
  );
}