import { useEffect, useState } from "react";
import { fetchAlbum } from "../lib/spotify";

const albumQueries = [
  { q: "album:Full Moon artist:Brandy" },
  { q: "album:Certified Lover Boy artist:Drake" },
  { q: "album:Heaven Knows artist:PinkPantheress" },
  { q: "album:SOS artist:SZA" },
];

// Hard-coded mock metadata to match UI (rating + fake usernames)
const MOCK_META = [
  { user: "@dalila_", rating: 3 },
  { user: "@Drizzynxtdoor", rating: 5 },
  { user: "@f4ncydat", rating: 5 },
  { user: "@solanaa", rating: 4 },
];

function Stars({ value = 5 }) {
  const full = Math.max(0, Math.min(5, value));
  return (
    <div style={{ fontSize: "1rem", lineHeight: 1 }} aria-label={`${full} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < full ? "#FFD700" : "black" }}>★</span>
      ))}
    </div>
  );
}

export default function AlbumsGrid() {
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

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (albums.length === 0) return <p>Loading albums…</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: "1.25rem",
        width: "100%",
      }}
    >
      {albums.map((album, idx) => {
        const meta = MOCK_META[idx] ?? { user: "@user", rating: 5 };
        return (
          <div
            key={album.id}
            style={{
              padding: "0.25rem",
              textAlign: "left",
            }}
          >
            {/* Artist then album name */}
            <p style={{ color: "#bbb", margin: 0 }}>
              {album.artists.map((a) => a.name).join(", ")}
            </p>
            <p style={{ fontSize: "1.75rem", margin: "0 0 0.5rem 0" }}>{album.name}</p>

            {/* Cover */}
            <div
              style={{
                borderRadius: "18px",
                overflow: "hidden",
              }}
            >
              <img
                src={album.images[0]?.url}
                alt={album.name}
                style={{ width: "100%", display: "block" }}
              />
            </div>

            {/* Rating + username */}
            <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Stars value={meta.rating} />
              <span style={{ fontSize: "1rem", color: "#bbb" }}>{meta.user}</span>
            </div>

            {/* Review box with fade */}
            <div
              style={{
                position: "relative",
                marginTop: "0.5rem",
                paddingTop: "0.25rem",
              }}
            >
              <p style={{ margin: 0, fontSize: "1rem" }}>Review</p>
              <div
                style={{
                  position: "relative",
                  maxHeight: "7.5rem",
                  overflow: "hidden",
                }}
              >
            <p style={{ margin: 0, color: "#cfcfcf", lineHeight: 1.25, fontSize: "0.85rem" }}>
                  Lorem ipsum dolor sit amet consectetur. Id volutpat ac tristique auctor eget eu lectus quis orci. Ut netus
                  venenatis fames mauris. Sit ultrices dictumst elit tellus sed. Tristique eget nunc tellus quisque mauris
                  dignissim. Amet faucibus posuere sed tristique id pharetra at. Nisi in volutpat dignissim fermentum massa.
                </p>
                {/* fade to black */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)",
                  }}
                />
              </div>

              {/* Arrow pill that links to Spotify */}
              <div style={{ marginTop: "1rem" }}>
                <a
                  href={album.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    width: "90px",
                    height: "44px",
                    borderRadius: "24px",
                    border: "2px solid #fff",
                    textDecoration: "none",
                    color: "#fff",
                    fontSize: "1.5rem",
                  }}
                >
                  ➔
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}