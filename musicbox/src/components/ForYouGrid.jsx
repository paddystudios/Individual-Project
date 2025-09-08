// src/components/ForYouGrid.jsx
import { useEffect, useState } from "react";
import { fetchAlbum } from "../lib/spotify";

const forYouQueries = [
  { q: 'album:"MOTOMAMI" artist:"ROSALÍA"' }, // L
  { q: "album:Honestly, Nevermind artist:Drake" }, // M
  { q: "album:A Great Chaos artist:Ken Carson" },  // M
  { q: "album:House of Balloons artist:The Weeknd" }, // M
  { q: "album:Lemonade artist:Beyoncé" }, // M
  { q: "album:Channel Orange artist:Frank Ocean" }, // M
  { q: "album:Currents artist:Tame Impala" }, // S
  { q: "album:DS2 artist:Future" }, // S
  { q: "album:Aaliyah artist:Aaliyah" }, // S
  { q: "album:Take Care artist:Drake" }, // S
  { q: "album:Never Say Never artist:Brandy" }, // S
  { q: "album:Starboy artist:The Weeknd" }, // S
  { q: "album:More Life artist:Drake" }, // S
];

// Exactly fills a 6x6 grid (36 cells): 1*9 + 5*4 + 7*1 = 36
const sizesPattern = [
  "large",
  "medium", "medium", "medium", "medium", "medium",
  "small", "small", "small", "small", "small", "small", "small",
];

export default function ForYouGrid() {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await Promise.all(forYouQueries.map((q) => fetchAlbum(q)));
        // Attach sizes to the first N albums to match the pattern
        const sized = data
          .slice(0, sizesPattern.length)
          .map((album, i) => ({ ...album, _size: sizesPattern[i] }));
        setAlbums(sized);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <div
      style={{
        flex: 1,
        padding: "1rem",
        borderRadius: "12px",
        color: "white",
        overflow: "hidden",         // keep the square tidy
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <p style={{ fontSize: 30, fontWeight: 200, marginBottom: 20 }}>For you</p>

      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",     // <- whole section stays a square
        }}
      >
        {/* Grid sits absolutely so it inherits the square size */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridTemplateRows: "repeat(6, 1fr)",
            gridAutoFlow: "dense",
            gap: "10px",
          }}
        >
          {error && (
            <div style={{ color: "red", gridColumn: "1/-1" }}>Error: {error}</div>
          )}
          {!error && albums.length === 0 && (
            <div style={{ gridColumn: "1/-1", alignSelf: "center", justifySelf: "center" }}>
              Loading…
            </div>
          )}

          {albums.map((album) => {
            const spans =
              album._size === "large"
                ? { col: 3, row: 3 }
                : album._size === "medium"
                ? { col: 2, row: 2 }
                : { col: 1, row: 1 }; // small

            return (
              <a
                key={album.id}
                href={album.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
                style={{
                  gridColumn: `span ${spans.col}`,
                  gridRow: `span ${spans.row}`,
                  borderRadius: 12,
                  overflow: "hidden",
                }}
                aria-label={`${album.name} by ${album.artists?.map(a => a.name).join(", ")}`}
              >
                <img
                  src={album.images[0]?.url}
                  alt={album.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}