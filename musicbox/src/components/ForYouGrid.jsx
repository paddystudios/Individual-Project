// src/components/ForYouGrid.jsx
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { fetchAlbum } from "../lib/spotify";

// lightweight shimmer for placeholders
const SkelStyles = () => (
  <style>{`
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    .skel {
      background: linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.14) 37%, rgba(255,255,255,0.06) 63%);
      background-size: 200% 100%;
      animation: shimmer 1.25s linear infinite;
    }
  `}</style>
);

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

const gridVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24, scale: 0.98 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 360, damping: 26 },
  },
};

export default function ForYouGrid() {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);

  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

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
      ref={sectionRef}
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
      <SkelStyles />
      <p style={{ fontSize: 30, fontWeight: 200, marginBottom: 20 }}>For you</p>

      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",     // <- whole section stays a square
        }}
      >
        {/* Grid sits absolutely so it inherits the square size */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate={inView && albums.length ? "show" : "hidden"}
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
            <>
              {sizesPattern.map((size, i) => {
                const spans =
                  size === "large" ? { col: 3, row: 3 } :
                  size === "medium" ? { col: 2, row: 2 } : { col: 1, row: 1 };
                return (
                  <div
                    key={`skel-${i}`}
                    className="skel"
                    style={{
                      gridColumn: `span ${spans.col}`,
                      gridRow: `span ${spans.row}`,
                      borderRadius: 12,
                    }}
                  />
                );
              })}
            </>
          )}

          {albums.map((album) => {
            const spans =
              album._size === "large"
                ? { col: 3, row: 3 }
                : album._size === "medium"
                ? { col: 2, row: 2 }
                : { col: 1, row: 1 }; // small

            return (
              <motion.a
                variants={itemVariants}
                key={album.id}
                href={album.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
                style={{
                  gridColumn: `span ${spans.col}`,
                  gridRow: `span ${spans.row}`,
                  borderRadius: 12,
                  overflow: "hidden",
                  display: "block",
                  boxShadow: "0 0 0 rgba(0,0,0,0)",
                }}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                aria-label={`${album.name} by ${album.artists?.map(a => a.name).join(", ")}`}
              >
                <motion.img
                  src={album.images[0]?.url}
                  alt={album.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  whileHover={{ scale: 1.05, filter: "brightness(1.08)" }}
                  transition={{ type: "spring", stiffness: 360, damping: 26 }}
                />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}