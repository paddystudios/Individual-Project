import { useEffect, useState } from "react";
import { fetchAlbum } from "../lib/spotify";
import { GridSkeleton } from "./Skeletons";

const FALLBACK_COVER = "https://placehold.co/160x160?text=Album";
const COVER_SIZE = 180; // Keep the image square and keep the grid column in sync

// What to fetch + mocked review meta
const REVIEW_ITEMS = [
  {
    q: "album:Certified Lover Boy artist:Drake",
    user: "@champagnepapii_",
    rating: 5,
    text:
      "Loved the production and sequencing. Standouts for me: Champagne Poetry and Pipe Down.",
  },
  {
    q: "album:SOS artist:SZA",
    user: "@sosolana",
    rating: 4,
    text:
      "Vocal performances are wild. A couple skips, but overall a mood I’ll revisit a lot.",
  },
  {
    q: "album:Full Moon artist:Brandy",
    user: "@vocalbible",
    rating: 5,
    text:
      "Timeless R&B. The backgrounds and harmonies are textbook Brandy — chef’s kiss.",
  },
  {
    q: "album:Heaven knows artist:PinkPantheress",
    user: "@ppworld",
    rating: 4,
    text:
      "Bubbly, nostalgic, and tight. Short tracks that stick in your head.",
  },
];

function Stars({ value = 0 }) {
  const s = "★".repeat(value) + "☆".repeat(5 - value);
  return (
    <span style={{ color: "gold", fontSize: "0.9rem", letterSpacing: "1px" }}>
      {s}
    </span>
  );
}

export default function ReviewsList() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const results = await Promise.all(
          REVIEW_ITEMS.map(async (r) => {
            const album = await fetchAlbum({ q: r.q });
            return { album, ...r };
          })
        );
        if (!cancelled) setItems(results);
      } catch (e) {
        if (!cancelled) setError(e?.message || String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div style={{ margin: "1rem 0" }}>
        <GridSkeleton cols={2} count={REVIEW_ITEMS.length} />
      </div>
    );
  }
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      {items.map(({ album, user, rating, text }) => (
        <a
          key={album.id}
          href={album.external_urls?.spotify}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "grid",
            gridTemplateColumns: `${COVER_SIZE}px 1fr`,
            gap: "1rem",
            textDecoration: "none",
            color: "inherit",
            borderRadius: "14px",
            padding: "0.4rem",
          }}
        >
          <img
            src={album.images?.[0]?.url || FALLBACK_COVER}
            alt={`${album.name} cover`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_COVER;
            }}
            style={{
              width: COVER_SIZE,
              height: COVER_SIZE,
              borderRadius: "10px",
              objectFit: "cover",
              display: "block",
              backgroundColor: "#0a0a0a",
              border: "1px solid #222",
              alignSelf: "center",
              justifySelf: "center",
            }}
          />

          <div style={{ display: "grid", gap: "0.45rem" }}>
            {/* Artist above album title + username on the right */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              <span style={{ opacity: 0.8, fontSize: "0.95rem" }}>
                {album.artists?.map((a) => a.name).join(", ")}
              </span>
              <span style={{ marginLeft: "auto", opacity: 0.7, fontSize: "0.9rem" }}>
                {user}
              </span>
            </div>

            <strong style={{ fontSize: "1.4rem" }}>{album.name}</strong>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Stars value={rating} />
              <span style={{ fontSize: "1rem", opacity: 0.7 }}>{rating}/5</span>
            </div>

            <p
              style={{
                margin: 0,
                fontSize: "1rem",
                lineHeight: 1.35,
                color: "#cfcfcf",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {text}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}