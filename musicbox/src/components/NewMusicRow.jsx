import { useEffect, useState } from "react";
import { fetchAlbum } from "../lib/spotify"; // this returns album JSON; singles on Spotify are albums with album_type: "single"
import { RowSkeleton } from "./Skeletons";
// Curated recent(ish) singles that fit your vibe. Each entry uses a search query
// that resolves to the single's "album" (Spotify treats singles as albums).
const singleQueries = [
  { q: "album:Texas Hold 'Em artist:Beyonce" },
  { q: "album:Not Like Us artist:Kendrick Lamar" },
  { q: "album:Saturn artist:SZA" },
  { q: "album:Popular artist:The Weeknd" },
  { q: "album:Boy's a liar Pt. 2 artist:PinkPantheress" },
  { q: "album:LLYLM artist:Rosalia" },
  { q: "album:Search & Rescue artist:Drake" },
  { q: "album:Slime You Out artist:Drake" },
  { q: "album:Lift Me Up artist:Rihanna" },
  { q: "album:1985 artist:Ken Carson" },
];

export default function NewMusicRow() {
  const [items, setItems] = useState(null); // null = loading
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const albums = await Promise.all(
          singleQueries.map((query) => fetchAlbum(query).catch(() => null))
        );
        const withCovers = albums
          .filter(Boolean)
          .filter((a) => a?.images && a.images[0]?.url);
        if (alive) setItems(withCovers);
      } catch (e) {
        console.error(e);
        if (alive) setErr("Could not load New Music.");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (err) {
    return (
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ marginBottom: "0.75rem", fontWeight: 300 }}>New Music</h2>
        <div
          style={{
            padding: "1rem",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 12,
          }}
        >
          {err}
        </div>
      </section>
    );
  }

  if (!items) {
    return (
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ marginBottom: "0.75rem", fontWeight: 300 }}>New Music</h2>
        <RowSkeleton items={singleQueries.length} itemWidth={220} />
      </section>
    );
  }

  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ marginBottom: "0.75rem", fontWeight: 300 }}>New Music</h2>
      <div
        style={{
          display: "flex",
          gap: "0.6rem",
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
              key={album?.id}
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{ display: "block", minWidth: 220 }}
              title={album?.name || ""}
            >
              {/* cover */}
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