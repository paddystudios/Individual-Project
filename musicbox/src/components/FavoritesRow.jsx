// src/components/FavoritesRow.jsx
import { useEffect, useState } from "react";
import { fetchAlbum } from "../lib/spotify";
import { RowSkeleton } from "./Skeletons";

// Your favorites (expandable)
const favQueries = [
  { q: "album:MOTOMAMI artist:Rosalía" },
  { q: "album:DS2 artist:Future" },
  { q: "album:To Pimp a Butterfly artist:Kendrick Lamar" },
  { q: "album:Honestly, Nevermind artist:Drake" },
  { q: "album:Gorillaz artist:Gorillaz" },
  { q: "album:House of Balloons artist:The Weeknd" },
  { q: "album:More Life artist:Drake" },
];

export default function FavoritesRow() {
  const [items, setItems] = useState(null); // null = loading
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const settled = await Promise.allSettled(
          favQueries.map((q) => fetchAlbum(q))
        );

        // keep only fulfilled + with an image
        const albums = settled
          .filter((r) => r.status === "fulfilled")
          .map((r) => r.value)
          .filter((a) => a && a.images && a.images.length > 0 && a.images[0]?.url);

        if (alive) setItems(albums);
      } catch (e) {
        console.error(e);
        if (alive) setErr("Could not load Favorites.");
      }
    })();
    return () => { alive = false; };
  }, []);

  if (err) {
    return (
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ marginBottom: "0.75rem", fontWeight: 300 }}>Favorites</h2>
        <div style={{ padding: "1rem", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12 }}>
          {err}
        </div>
      </section>
    );
  }

  if (!items) {
    return (
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ marginBottom: "0.75rem", fontWeight: 300 }}>Favorites</h2>
        <RowSkeleton items={favQueries.length} itemWidth={220} />
      </section>
    );
  }

  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ marginBottom: "0.75rem", fontWeight: 300 }}>Favorites</h2>
      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "0.5rem",
          scrollbarWidth: "thin",
        }}
      >
        {items.map((album) => {
          const href = album?.external_urls?.spotify || "#";
          const img = album?.images?.[0]?.url;

          return (
            <a
              key={album.id}
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{ display: "block", minWidth: 220 }}
              title={album?.name || ""}
            >
              <div
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: `center/cover no-repeat url(${img})`,
                }}
              />
            </a>
          );
        })}
      </div>
    </section>
  );
}