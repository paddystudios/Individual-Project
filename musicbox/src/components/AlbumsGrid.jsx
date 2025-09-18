import { useEffect, useState } from "react";
import { fetchAlbum } from "../lib/spotify";
import buttonImg from "../assets/button.png";
import { GridSkeleton } from "./Skeletons";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";


const albumQueries = [
  { q: "album:Full Moon artist:Brandy" },
  { q: "album:Certified Lover Boy artist:Drake" },
  { q: "album:Heaven Knows artist:PinkPantheress" },
  { q: "album:SOS artist:SZA" },
  { q: "album:Timeless artist:Kaytranada" },
];

// Hard-coded mock metadata to match UI (rating + fake usernames)
const MOCK_META = [
  { user: "@dalila_", rating: 5 },
  { user: "@Drizzynxtdoor", rating: 3 },
  { user: "@f4ncydat", rating: 5 },
  { user: "@solanaa", rating: 4 },
  { user: "@kayfan", rating: 5 },
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

function AlbumCard({ album, meta }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 220, damping: 28 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0..1
    const py = (e.clientY - rect.top) / rect.height;  // 0..1
    x.set(px - 0.5); // -0.5 .. 0.5
    y.set(py - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="album-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        padding: "0.25rem",
        textAlign: "left",
        borderRadius: "12px",
        transformStyle: "preserve-3d",
        transformPerspective: 900,
        rotateX,
        rotateY,
        willChange: "transform, box-shadow",
      }}
      whileHover={{ scale: 1.04, boxShadow: "0 14px 30px rgba(0,0,0,0.45)" }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      {/* Artist then album name */}
      <p style={{ color: "#bbb", margin: 0 }}>
        {album.artists.map((a) => a.name).join(", ")}
      </p>
      <p style={{ fontSize: "1.40rem", margin: "0 0 0.5rem 0" }}>{album.name}</p>

      {/* Cover */}
      <div style={{ borderRadius: "18px", overflow: "hidden" }}>
        <img
          src={album.images[0]?.url}
          alt={album.name}
          style={{ width: "100%", display: "block" }}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Subtle shine overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: "12px",
          background: "radial-gradient(120px 60px at 30% 0%, rgba(255,255,255,0.12), rgba(255,255,255,0) 70%)",
          transform: "translateZ(2px)",
        }}
      />

      {/* Rating + username */}
      <div style={{ marginTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
        <Stars value={meta.rating} />
        <span style={{ fontSize: "1rem", color: "#bbb" }}>{meta.user}</span>
      </div>

      {/* Review box with fade */}
      <div style={{ position: "relative", marginTop: "0.5rem", paddingTop: "0.25rem" }}>
        <p style={{ margin: 0, fontSize: "1.2em", fontWeight: "bold" }}>Review</p>
        <div style={{ position: "relative", maxHeight: "7.5rem", overflow: "hidden" }}>
          <p style={{ margin: 0, color: "#cfcfcf", lineHeight: 1.25, fontSize: "0.8rem" }}>
            Lorem ipsum dolor sit amet consectetur. Id volutpat ac tristique auctor eget eu lectus quis orci. Ut netus
            venenatis fames mauris. Sit ultrices dictumst elit tellus sed. Tristique eget nunc tellus quisque mauris
            dignissim. Amet faucibus posuere sed tristique id pharetra at. Nisi in volutpat dignissim fermentum massa.
          </p>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)" }} />
        </div>

        {/* Arrow pill that links to Spotify */}
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
          <a href={album.external_urls.spotify} target="_blank" rel="noreferrer">
            <img src={buttonImg} width={65} alt="Open on Spotify" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function AlbumsGrid() {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await Promise.all(albumQueries.map((query) => fetchAlbum(query)));
        setAlbums(data.filter(Boolean));
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (albums.length === 0) return <GridSkeleton cols={5} count={5} />;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
        gap: "1rem",
        width: "100%",
      }}
    >
      {albums.map((album, idx) => {
        const meta = MOCK_META[idx] ?? { user: "@user", rating: 5 };
        return (
          <AlbumCard
            key={album?.id ?? `${album?.name ?? 'album'}-${idx}`}
            album={album}
            meta={meta}
          />
        );
      })}
    </div>
  );
}