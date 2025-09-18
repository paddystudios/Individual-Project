import { motion } from "framer-motion";
import buttonImg from "../assets/button.png";
import { useEffect, useState, useRef } from "react";
import BackgroundHero from "./BackgroundHero";
import thunderFont from "../assets/Thunder-BlackLC.otf";
import MusicPlayerMini from "./MusicPlayerMini";
import { fetchAlbum } from "../lib/spotify";

function TypingHeading({ text, className, style }) {
  const [i, setI] = useState(0);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced) {
      setI(text.length);
      return;
    }
    setI(0);
    let id;
    const typeNext = () => {
      setI((prev) => {
        const next = prev < text.length ? prev + 1 : prev;
        return next;
      });
      const base = 95;               // slower base speed
      const jitter = Math.random() * 60; // add some natural variation
      if (i + 1 <= text.length) {
        id = setTimeout(typeNext, base + jitter);
      }
    };
    id = setTimeout(typeNext, 180); // initial pause
    return () => clearTimeout(id);
  }, [text, prefersReduced]);

  const done = i >= text.length;
  const caretClass = done ? "caret scan" : "caret blink";

  return (
    <span
      className={className}
      style={{ whiteSpace: "nowrap", display: "inline-block", ...style }}
      aria-label={text}
    >
      {text.slice(0, i)}
    </span>
  );
}

export default function HeroSection() {
  const titleRef = useRef(null);
  const [coverSrc, setCoverSrc] = useState(null);

  useEffect(() => {
    const update = () => {
      if (titleRef.current) {
        // This was used for eqWidth, now removed
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const album = await fetchAlbum({ q: "album:Fancy That artist:PinkPantheress" });
        const img = album?.images?.[0]?.url || album?.album?.images?.[0]?.url; // support both shapes
        if (alive) setCoverSrc(img || null);
      } catch (e) {
        console.error("cover fetch failed", e);
        if (alive) setCoverSrc(null);
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "0",
        borderRadius: 16,
        margin: "0 auto 1.25rem",
        maxWidth: 1400,
        minHeight: "100vh", // fill the screen on load
        display: "flex",
        alignItems: "center", // vertically center content
      }}
    >
      <style>{`
        @font-face {
          font-family: "Thunder-BlackLC";
          src: url(${thunderFont}) format("opentype");
          font-weight: normal;
          font-style: normal;
        }
        /* Caret / dot animations */
        @keyframes caret-blink { 50% { opacity: 0; } }
        @keyframes caret-scan {
          0%   { transform: translateX(0); }
          50%  { transform: translateX(0.7ch); }
          100% { transform: translateX(0); }
        }
        .caret {
          display: inline-block;
          width: 0.55ch;
          height: 0.55ch;
          margin-left: 4px;
          border-radius: 9999px;
          background: currentColor;
          vertical-align: middle;
        }
        .caret.blink { animation: caret-blink 1s step-end infinite; }
        .caret.scan  { animation: caret-scan 1.6s ease-in-out infinite; }
        @keyframes bg-pan {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes glow {
          0%,100% { box-shadow: 0 0 0 rgba(255, 230, 0, 0.0); }
          50% { box-shadow: 0 0 38px rgba(255, 230, 0, 0.12); }
        }
        .gradient-text {
          background: linear-gradient(90deg, #FFE600, #FFD34D, #F5EFA6);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .cta:hover { transform: translateY(-2px) scale(1.03); }

        /* scroll cue */
        .scroll-cue {
          position: absolute; left: 50%; bottom: 150px; transform: translateX(-50%);
          display: inline-flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.28); color: #FFE600;
          background: rgba(0,0,0,0.35);
          cursor: pointer; user-select: none;
          transition: transform .2s ease, border-color .2s ease, background .2s ease;
          animation: cue-float 1.6s ease-in-out infinite;
        }
        .scroll-cue:hover { transform: translateX(-50%) translateY(-2px) scale(1.05); border-color: rgba(255,255,255,0.5); background: rgba(0,0,0,0.5); }
        @keyframes cue-float { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-6px); } }

        @media (prefers-reduced-motion: reduce) {
          .scroll-cue{ animation: none; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{
          padding: "3rem 2rem",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            minHeight: "60vh",
          }}
        >
          <div style={{ maxWidth: 820 }}>
            <motion.h1
              style={{ fontSize: "clamp(3rem, 10vw, 10rem)", lineHeight: 1.05, margin: 0, fontWeight: 900 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.35 }}
            >
              <TypingHeading text="SHARE YOUR MUSIC TASTE." style={{ color: "#FFE600", fontFamily: "Thunder-BlackLC, sans-serif" }} />
            </motion.h1>
            <motion.p
              style={{ color: "#ffffff", margin: "0.2rem 0 0.8rem", maxWidth: 680, fontSize: "1.15rem" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.35 }}
            >
              Dive into what your circle is spinning right now. Fresh albums, hot singles, and playlists tailored to your vibe.
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <MusicPlayerMini
          title="Illegal"
          artist="PinkPantheress"
          coverSrc={coverSrc}
        />
      </div>

      {/* Scroll cue */}
      <a href="#main" className="scroll-cue" aria-label="Scroll down">
        {/* down arrow */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </section>
  );
}