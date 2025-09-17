import { motion } from "framer-motion";
import buttonImg from "../assets/button.png";
import { useEffect, useState } from "react";
import BackgroundHero from "./BackgroundHero";

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
      {!prefersReduced && <span className={caretClass} aria-hidden></span>}
    </span>
  );
}

export default function HeroSection() {
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
      <BackgroundHero density={18} opacity={0.25} style={{ position: "absolute", inset: 0, zIndex: 0 }} />
      <style>{`
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
        .eq { display: flex; align-items: flex-end; gap: 6px; height: 36px; }
        .eq > span {
          width: 6px; border-radius: 3px; background: #FFE600; opacity: .9; height: 30%;
          animation: eq-bounce 1.1s ease-in-out infinite;
        }
        .eq > span:nth-child(2){ animation-delay: .1s }
        .eq > span:nth-child(3){ animation-delay: .2s }
        .eq > span:nth-child(4){ animation-delay: .3s }
        .eq > span:nth-child(5){ animation-delay: .4s }
        @keyframes eq-bounce { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }

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
          .eq > span{ animation: none; }
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
              style={{ fontSize: "clamp(2.2rem, 6vw, 3.6rem)", lineHeight: 1.05, margin: 0, fontWeight: 800 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.35 }}
            >
              <TypingHeading text="Share your music taste." className="gradient-text" />
            </motion.h1>
            <motion.p
              style={{ color: "#cfcfcf", margin: "0.6rem 0 1.2rem", maxWidth: 680 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.35 }}
            >
              Dive into what your circle is spinning right now. Fresh albums, hot singles, and playlists tailored to your vibe.
            </motion.p>
            <motion.a
              href="#main"
              className="cta"
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 6,
                background: "transparent",
                color: "#ffffff",
                fontWeight: 800,
                padding: 0,
                border: "none",
                textDecoration: "none",
                transition: "transform .2s ease",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <span>Start listening</span>
              <img src={buttonImg} alt="Start" width={65} height={24} style={{ display: "inline-block", marginTop: "0.35rem" }} />
            </motion.a>
          </div>
        </div>
      </motion.div>

      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.35 }}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            padding: "0.75rem 1rem", borderRadius: 12, background: "rgba(0,0,0,0.35)",
          }}
        >
          <div className="eq" aria-label="Now playing visualizer">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <small style={{ color: "#bcbcbc", marginTop: 8 }}>Now playing · Live</small>
        </motion.div>
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