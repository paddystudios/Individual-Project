// src/components/SavedPlaylistsRow.jsx
import { useEffect, useState } from "react";
import { searchPlaylists } from "../lib/spotify";
import { RowSkeleton } from "./Skeletons";

export default function SavedPlaylistsRow() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);

  // Pretend “saved” by curating a few popular playlist searches,
  // then merge + de-dupe the results.
  const queries = [
    "Today's Top Hits",
    "RapCaviar",
    "Viva Latino",
    "mint",
    "New Music Friday",
    "Rock Classics",
    "Peaceful Piano",
    "lofi beats",
    "Beast Mode",
    "Songs to Sing in the Car",
    "Mood Booster",
    "All Out 2010s",
  ];

  useEffect(() => {
    (async () => {
      try {
        const results = await Promise.all(
          queries.map((q) => searchPlaylists(q, 4)) // 6 queries * 4 = up to 24, we'll slice later
        );
        const merged = results.flat().filter(Boolean);

        // de-dupe by id
        const seen = new Set();
        const deduped = merged.filter((p) => {
          if (!p?.id) return false;
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        });

        setItems(deduped.slice(0, 18)); // cap to 18 to keep the row tight
      } catch (e) {
        console.error(e);
        setError("Couldn't load this section.");
      }
    })();
  }, []);

  if (!items && !error) {
    return (
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ marginBottom: "0.75rem", fontWeight: 300 }}>Saved Playlists</h2>
        <RowSkeleton items={queries.length * 3} itemWidth={220} />
      </section>
    );
  }

  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ marginBottom: "0.75rem", fontWeight: 300 }}>Saved Playlists</h2>

      {error && (
        <div style={{ padding: "0.75rem 0", opacity: 0.7 }}>{error}</div>
      )}

      <div
        style={{
          display: "flex",
          gap: "0.1rem",
          overflowX: "auto",
          paddingBottom: "0.5rem",
        }}
      >
        {items.map((p) => {
          if (!p) return null;
          const cover = p.images?.[0]?.url || p.images?.[1]?.url || p.images?.[2]?.url;
          if (!cover) return null; // skip items with no images

          return (
            <a
              key={p.id}
              href={p.external_urls?.spotify || "#"}
              target="_blank"
              rel="noreferrer"
              style={{ display: "block", minWidth: 220, marginRight: 8 }}
              title={p.name}
            >
              <img
                src={cover}
                alt={p.name || "Playlist"}
                style={{
                  width: 220,
                  height: 220,
                  objectFit: "cover",
                  borderRadius: 12,
                  border: "1px solid #fff3",
                }}
              />
            </a>
          );
        })}
      </div>
    </section>
  );
}