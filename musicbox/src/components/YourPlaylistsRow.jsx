import { useEffect, useState } from "react";
import { searchPlaylists } from "../lib/spotify";
import { RowSkeleton } from "./Skeletons";

// Curated popular playlists
const yourQueries = [
  "RapCaviar",
  "Viva Latino",
  "Hot Hits USA",
  "Songs to Sing in the Car",
  "Peaceful Piano",
  "All Out 2010s",
  "Chill Hits",
  "lofi beats",
  "Rock Classics",
  "mint",
  "Mood Booster",
  "R&B Favorites",
];

export default function YourPlaylistsRow() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const chunks = await Promise.all(
          yourQueries.map((q) => searchPlaylists(q, 2)) // 2 per query
        );
        setItems(chunks.flat().slice(0, 18)); // cap at 18 results
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (!items) {
    return (
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ marginBottom: "0.75rem", fontWeight: 300 }}>Your Playlists</h2>
        <RowSkeleton items={yourQueries.length} itemWidth={220} />
      </section>
    );
  }

  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ marginBottom: "0.75rem", fontWeight: 300 }}>Your Playlists</h2>
      <div
        style={{
          display: "flex",
          gap: 0.4,
          overflowX: "auto",
          paddingBottom: "0.4rem",
          scrollbarWidth: "thin",
        }}
      >
        {items.map((p) => {
          if (!p) return null;
          const cover =
            p.images?.[0]?.url || p.images?.[1]?.url || p.images?.[2]?.url;
          if (!cover) return null;

          return (
            <a
              key={p.id}
              href={p.external_urls?.spotify || "#"}
              target="_blank"
              rel="noreferrer"
              style={{ display: "block", minWidth: 220, marginRight: 8 }}
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