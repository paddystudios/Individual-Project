// src/components/PopularSection.jsx
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { fetchAlbum } from "../lib/spotify";
import { GridSkeleton } from "./Skeletons";

const popularQueries = [
  { q: "album:The Tortured Poets Department artist:Taylor Swift" },
  { q: "album:UTOPIA artist:Travis Scott" },
  { q: "album:GUTS artist:Olivia Rodrigo" },
  { q: "album:SOS artist:SZA" },
  { q: "album:Un Verano Sin Ti artist:Bad Bunny" },
  { q: "album:One Thing At A Time artist:Morgan Wallen" },
];

function TiltAlbumCard({ album }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 220, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 220, damping: 28 });

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
    <motion.a
      key={album.id}
      href={album.external_urls.spotify}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "block",
        position: "relative",
        borderRadius: "14px",
        transformStyle: "preserve-3d",
        transformPerspective: 900,
        rotateX,
        rotateY,
        willChange: "transform, box-shadow",
      }}
      whileHover={{ scale: 1.04, boxShadow: "0 18px 36px rgba(0,0,0,0.45)" }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div style={{ borderRadius: "14px", overflow: "hidden" }}>
        <img
          src={album.images[0]?.url}
          alt={album.name}
          style={{ width: "100%", display: "block", objectFit: "cover" }}
          loading="lazy"
          decoding="async"
        />
      </div>
      {/* Shine overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: "14px",
          background: "radial-gradient(160px 80px at 30% 0%, rgba(255,255,255,0.12), rgba(255,255,255,0) 70%)",
          transform: "translateZ(2px)",
        }}
      />
      {/* Subtle border glow on hover */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "14px",
          pointerEvents: "none",
        }}
        initial={{ boxShadow: "0 0 0 0 rgba(255,255,255,0)" }}
        whileHover={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.2)" }}
        transition={{ duration: 0.2 }}
      />
    </motion.a>
  );
}

export default function PopularSection() {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await Promise.all(popularQueries.map((q) => fetchAlbum(q)));
        setAlbums(data);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  const gridVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -24 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 320, damping: 24 }
    },
  };

  return (
    <section style={{ width: "100%", marginTop: "2rem" }}>
      <h2 style={{ fontSize: "30px", fontWeight: 400, marginBottom: "20px" }}>Popular this week</h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!error && albums.length === 0 && (
        <div style={{ margin: "1rem 0" }}>
          <GridSkeleton cols={6} count={6} />
        </div>
      )}

      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate={albums.length ? "show" : "hidden"}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "1rem",
        }}
      >
        {albums.map((album) => (
          <motion.div variants={itemVariants} key={album.id}>
            <TiltAlbumCard album={album} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}