import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fetchAlbum } from "../lib/spotify";

const queries = [
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
  { q: 'album:"MOTOMAMI" artist:"ROSALÍA"' },
  { q: "album:Honestly, Nevermind artist:Drake" },
  { q: "album:A Great Chaos artist:Ken Carson" },
  { q: "album:House of Balloons artist:The Weeknd" },
  { q: "album:Lemonade artist:Beyoncé" },
  { q: "album:Channel Orange artist:Frank Ocean" },
  { q: "album:Currents artist:Tame Impala" },
  { q: "album:DS2 artist:Future" },
  { q: "album:Aaliyah artist:Aaliyah" },
  { q: "album:Take Care artist:Drake" },
  { q: "album:Never Say Never artist:Brandy" },
  { q: "album:Starboy artist:The Weeknd" },
  { q: "album:More Life artist:Drake" },
];

const SIZES = [88, 112, 140, 168, 196];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function BackgroundHero({ density = 16, opacity = 0.4, imageUrls }) {
  const prefersReduced = useReducedMotion();
  const [albums, setAlbums] = useState([]);

  const seeds = useMemo(
    () =>
      Array.from({ length: density }).map((_, i) => ({
        id: `seed-${i}-${Math.round(Math.random() * 1e6)}`,
        size: SIZES[Math.floor(Math.random() * SIZES.length)],
        startX: rand(-10, 100),
        driftX: rand(-10, 10),
        startY: rand(100, 160),
        duration: rand(18, 36),
        delay: rand(0, 6),
        rotate: rand(-20, 20),
      })),
    [density]
  );

  useEffect(() => {
    (async () => {
      try {
        // If caller passed explicit image URLs, use them (fast path)
        if (Array.isArray(imageUrls) && imageUrls.length > 0) {
          const mapped = imageUrls.filter(Boolean).map((url) => ({ images: [{ url }] }));
          setAlbums(mapped);
          return;
        }
        // Otherwise fetch from Spotify API using predefined queries
        const fetched = await Promise.all(
          Array.from({ length: density }).map((_, i) => fetchAlbum(queries[i % queries.length]))
        );
        setAlbums(fetched);
      } catch (e) {
        console.error("BackgroundHero fetch error:", e);
        setAlbums([]);
      }
    })();
  }, [imageUrls, density]);

  return (
    <>
      {(() => {
        if (!albums.length) return null;
        return (
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              pointerEvents: "none",
              overflow: "hidden",
              WebkitMaskImage:
                "radial-gradient(70% 70% at 50% 45%, black 75%, transparent 100%)",
              maskImage:
                "radial-gradient(70% 70% at 50% 45%, black 75%, transparent 100%)",
            }}
          >
            {seeds.map((seed, i) => {
              const album = albums[i % albums.length];
              const src = album?.images?.[0]?.url;
              const size = seed.size;

              if (!src) return null;

              if (prefersReduced) {
                return (
                  <img
                    key={seed.id}
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{
                      position: "absolute",
                      width: size,
                      height: size,
                      left: `${seed.startX}vw`,
                      top: `${seed.startY * 0.4}vh`,
                      opacity,
                      filter: "grayscale(0.2) blur(0.2px)",
                      transform: `rotate(${seed.rotate}deg)`,
                      borderRadius: 8,
                    }}
                  />
                );
              }

              return (
                <motion.img
                  key={seed.id}
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  initial={{
                    x: `${seed.startX}vw`,
                    y: `${seed.startY}vh`,
                    rotate: seed.rotate,
                    opacity: 0,
                  }}
                  animate={{
                    x: [
                      `${seed.startX}vw`,
                      `${seed.startX + seed.driftX}vw`,
                      `${seed.startX}vw`,
                    ],
                    y: [`${seed.startY}vh`, "-20vh"],
                    opacity: [0, opacity, opacity],
                    rotate: [seed.rotate, seed.rotate + 8, seed.rotate]
                  }}
                  transition={{
                    duration: seed.duration,
                    delay: seed.delay,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "absolute",
                    width: size,
                    height: size,
                    objectFit: "cover",
                    borderRadius: 8,
                    filter: "grayscale(0.15) saturate(0.9)",
                  }}
                />
              );
            })}
          </div>
        );
      })()}
    </>
  );
}
