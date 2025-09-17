// src/components/PopularSection.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    hidden: { opacity: 0, x: -120, z: -60, rotateY: -10 },
    show: {
      opacity: 1,
      x: 0,
      z: 0,
      rotateY: 0,
      transition: { type: "spring", stiffness: 500, damping: 18, duration: 0.4 }
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
          <div key={album.id} style={{ perspective: 900 }}>
            <motion.a
              variants={itemVariants}
              href={album.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
              style={{ display: "block", transformStyle: "preserve-3d" }}
              whileHover={{ rotateX: 6, rotateY: -10, scale: 1.06, z: 30 }}
              transition={{ type: "spring", stiffness: 400, damping: 18, duration: 0.3 }}
            >
              <motion.img
                src={album.images[0]?.url}
                alt={album.name}
                style={{ width: "100%", borderRadius: "12px", objectFit: "cover", boxShadow: "0 10px 30px rgba(0,0,0,0.35)" }}
              />
            </motion.a>
          </div>
        ))}
      </motion.div>
    </section>
  );
}